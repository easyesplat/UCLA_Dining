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
db.collection('menu').document('Spice Kitchen at Feast').delete()

html_link = 'https://menu.dining.ucla.edu/Menus/FeastAtRieber/Today'
#grabbing the page
uClient = uReq(html_link)
page_html = uClient.read()
uClient.close()

page = soup(page_html, 'html.parser')
foodlist = page.find_all("li", class_="sect-item")

col = db.collection(u'menu').document('Spice Kitchen at Feast').set({'name':'Spice Kitchen at Feast'})
for food_block in foodlist:
    topic_list = food_block.text.splitlines()
    topic_list = [x for x in topic_list if x.strip()]
    main_title = topic_list[0].strip()
    col = db.collection(u'menu').document(u'Spice Kitchen at Feast').collection('dinner').document(main_title)
    dict = {}
    menu_items = food_block.find_all("li", class_="menu-item")
    for item in menu_items:
        current_food = item.a.text.strip()
        dict[current_food] = []
        diet_link = item.find("a", class_="recipelink")['href']
        description = ''
        if(item.find('div', class_="tt-description")):
            description = item.find('div', class_="tt-description").text.strip()
        dict[current_food].append(diet_link)
        diet_needs = item.find_all("div", class_="tt-prodwebcode")
        for i in diet_needs:
            dict[current_food].append(i.text)
        dict[current_food].append(description)
    col.set({
        'food':dict
    })