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
db.collection('menu').document('Spice Kitchen').delete()

html_link = 'https://menu.dining.ucla.edu/Menus/FeastAtRieber/Today'
#grabbing the page
uClient = uReq(html_link)
page_html = uClient.read()
uClient.close()

page = soup(page_html, 'html.parser')
foodlist = page.find_all("li", class_="sect-item")

for food_block in foodlist:
    col = db.collection(u'menu').document(u'Spice Kitchen at Feast').collection('dinner').document('Spice Kitchen')
    dict = {}
    menu_items = food_block.find_all("li", class_="menu-item")
    for item in menu_items:
        current_food = item.a.text
        dict[current_food] = []
        diet_needs = item.find_all("div", class_="tt-prodwebcode")
        for i in diet_needs:
            dict[current_food].append(i.text)
    col.set({
        'food':dict
    })