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
breakfast = []
lunch = []
dinner = []
late_night = []

#scraping and pushing data to database 
whitespace = "\r\n\t"
page = soup(page_html, 'html.parser')
table = page.find("table", class_="hours-table")
elem = table.find_all("tr")

b_ref = db.collection(u'time').document(u'breakfast')
l_ref = db.collection(u'time').document(u'lunch')
d_ref = db.collection(u'time').document(u'dinner')
ld_ref = db.collection(u'time').document(u'late_dinner')

for element in elem:
    indiv = element.find_all("td")
    iter = 0
    rest_value = ''
    for i in indiv:
        if i=='UCLA Restaurants (Campus)':
            continue
        if iter==0:
            rest_value = i.text.strip(whitespace).partition('\n')[0]
            doc_ref = db.collection('time').document(rest_value)
            doc_ref.set({
                'breakfast': '',
                'lunch': '',
                'dinner': '',
                'late_night': ''
            })
        else:
            ref = ' '.join(i.text.split())
            ref = ref.strip(whitespace)
            if iter == 1:
                doc_ref.update({
                    'breakfast': ref
                })
                if ref!='CLOSED' and ref!='':
                    breakfast.append(rest_value)
            elif iter == 2:
                doc_ref.update({
                    'lunch': ref
                })
                if ref!='CLOSED' and ref!='':
                    lunch.append(rest_value)
            elif iter == 3:
                doc_ref.update({
                    'dinner': ref
                })
                if ref!='CLOSED' and ref!='':
                    dinner.append(rest_value)
            elif iter == 4:
                doc_ref.update({
                    'late_night': ref
                })
                if ref!='CLOSED' and ref!='':
                    late_night.append(rest_value)
        iter=iter+1
b_ref.set({'restaurants': breakfast})
l_ref.set({'restaurants': lunch})
d_ref.set({'restaurants': dinner})
ld_ref.set({'restaurants': late_night})