#!/usr/bin/python3

from bs4 import BeautifulSoup as soup
from urllib.request import urlopen as uReq
from numpy import equal
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

#initializing firebase
cred = credentials.Certificate("./serviceAccountKey.json")
firebase_admin.initialize_app(cred, {
  'projectId': "ucla-dining",
})
db = firestore.client()
db.collection('menu').document('Bruin Plate').delete()

html_link = 'https://menu.dining.ucla.edu/Menus/BruinPlate/Today'
#grabbing the page
uClient = uReq(html_link)
page_html = uClient.read()
uClient.close()

#parsing page
page = soup(page_html, 'html.parser')
foodlist = page.find_all("li", class_="sect-item")

time_periods = ['breakfast', 'lunch', 'dinner']
per_count = 0

for food_block in foodlist:
    capri_list = food_block.text.splitlines()
    capri_list = [x for x in capri_list if x.strip()]
    count = 0
    col = db.collection(u'menu')
    current_food = ''
    dict = {}
    for items in capri_list:
        if count == 0:
            col = db.collection(u'menu').document(u'Bruin Plate').collection(time_periods[per_count]).document(items.strip())
            if items.strip()=='Beverage Special':
                per_count = per_count+1
            count+=1
        else:
            if items.find('\xa0') != -1:
                dict[current_food].append(items.strip())
            elif items.strip() == '(Prepared with Alcohol)':
                dict[current_food].append('Prepared with Alcohol')
            else:
                current_food = items.strip(' ')
                if current_food == 'w/' or current_food == '&':
                    continue
                dict[current_food] = []
                count+=1
    col.set({
        'food':dict
    })


