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

html_link = 'http://menu.dining.ucla.edu/Menus/Rendezvous/today'
#grabbing the page
uClient = uReq(html_link)
page_html = uClient.read()
uClient.close()

time_periods = ['lunch', 'dinner']
per_count = 0

#parsing page
page = soup(page_html, 'html.parser')
foodlist = page.find_all("li", class_="sect-item")

for food_block in foodlist:
    topic_list = food_block.text.splitlines()
    topic_list = [x for x in topic_list if x.strip()]
    main_title = topic_list[0].strip()
    col = db.collection(u'menu').document(u'Rendezvous').collection(time_periods[per_count]).document(main_title)
    if main_title == 'Boba':
        per_count = per_count+1
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
