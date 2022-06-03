#!/usr/bin/python3

from bs4 import BeautifulSoup as soup
from urllib.request import urlopen as uReq
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

#initializing firebase
cred = credentials.Certificate("./serviceAccountKey.json")
firebase_admin.initialize_app(cred, {
  'projectId': "ucla-dining",
})
db = firestore.client()

#grabbing the page
html_link = 'https://menu.dining.ucla.edu/hours/'
uClient = uReq(html_link)
page_html = uClient.read()
uClient.close()

#holding data to make it easy for front-end to access
breakfast_rep = []
lunch_rep = []
dinner_rep = []
late_night_rep = []

b_ref = db.collection(u'time').document(u'breakfast')
l_ref = db.collection(u'time').document(u'lunch')
d_ref = db.collection(u'time').document(u'dinner')
ld_ref = db.collection(u'time').document(u'late_night')

#scraping and pushing data to database 
whitespace = "\r\n\t"
page = soup(page_html, 'html.parser')
table = page.find("table", class_="hours-table")
elements = table.find_all("tr")[1:]

for elem in elements:
    hall_name = elem.find('span', class_='hours-location').text
    doc_ref = db.collection('time').document(hall_name)
    if (elem.find('td', class_='hours-open Breakfast')):
        breakfast_rep.append(hall_name)
        breakfast = elem.find('td', class_='hours-open Breakfast').find('span', class_='hours-range').text
        doc_ref.update({
            'breakfast': breakfast
        })
    else:
        doc_ref.update({
            'breakfast': 'CLOSED'
        })
    if (elem.find('td', class_='hours-open Lunch')):
        lunch_rep.append(hall_name)
        if('Trucks' in hall_name):
            lunch_arr = []
            lunch_ref = elem.find_all('span', class_='hours-additonal')
            for ref in lunch_ref:
                if (ref.text!=''):
                    lunch_arr.append(ref.text)
            doc_ref.update({
                'lunch': lunch_arr
            })
        else:
            lunch = elem.find('td', class_='hours-open Lunch').find('span', class_='hours-range').text
            doc_ref.update({
            'lunch': lunch
            })
    else:
        doc_ref.update({
            'lunch': 'CLOSED'
        })
    if (elem.find('td', class_='hours-open Dinner')):
        dinner_rep.append(hall_name)
        if('Trucks' in hall_name):
            dinner_arr = []
            dinner_ref = elem.find('td', class_='hours-open Dinner').find_all('span', class_='hours-additonal')
            for ref in dinner_ref:
                if (ref.text!=''):
                    dinner_arr.append(ref.text)
            doc_ref.update({
                'dinner': dinner_arr
            })
        else:
            dinner = elem.find('td', class_='hours-open Dinner').find('span', class_='hours-range').text
            doc_ref.update({
                'dinner': dinner
            })
    else:
        doc_ref.update({
            'dinner': 'CLOSED'
        })
    if (elem.find('td', class_='hours-open Extended Dinner')):
        late_night_rep.append(hall_name)
        if('Trucks' in hall_name):
            late_arr = []
            late_ref = elem.find('td', class_='hours-open Extended Dinner').find_all('span', class_='hours-additonal')
            for ref in late_ref:
                if (ref.text!=''):
                    late_arr.append(ref.text)
            doc_ref.update({
                'late_night': late_arr
            })
        else:
            late_night = elem.find('td', class_='hours-open Extended Dinner').find('span', class_='hours-range').text
            doc_ref.update({
                'late_night': late_night
            })
    else:
        doc_ref.update({
            'late_night': 'CLOSED'
        })

b_ref.set({'restaurants': breakfast_rep})
l_ref.set({'restaurants': lunch_rep})
d_ref.set({'restaurants': dinner_rep})
ld_ref.set({'restaurants': late_night_rep})