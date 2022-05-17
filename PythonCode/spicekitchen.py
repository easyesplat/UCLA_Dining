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

html_link = 'https://menu.dining.ucla.edu/Menus/FeastAtRieber/Today'
#grabbing the page
uClient = uReq(html_link)
page_html = uClient.read()
uClient.close()

page = soup(page_html, 'html.parser')
foodlist = page.find_all("li", class_="sect-item")

for food_items in foodlist:
    topic_list = food_items.text.splitlines()
    topic_list = [x for x in topic_list if x.strip()]
    count = 0
    col = db.collection(u'menu')
    current_food = ''
    dict = {}
    for items in topic_list:
        if count == 0:
            col = db.collection(u'menu').document(u'Spice Kitchen at Feast').collection('dinner').document(items.strip())
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