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
db.collection('menu').document('The Drey').delete()

html_link = 'http://menu.dining.ucla.edu/Menus/Drey'
#grabbing the page
uClient = uReq(html_link)
page_html = uClient.read()
uClient.close()

col = db.collection(u'menu').document('The Drey').set({'name':'The Drey'})
#parsing page
page = soup(page_html, 'html.parser')
foodlist = page.find_all("div", class_="menu-block style-entree")
for list in foodlist:
    col1 = db.collection(u'menu').document(u'The Drey').collection('lunch').document(list.h2.text)
    col2 = db.collection(u'menu').document(u'The Drey').collection('dinner').document(list.h2.text)
    food = list.find_all("div", class_="menu-item")
    dict = {}
    for info in food:
        if info.find('a', class_='recipelink'):
            food = info.find('a', class_='recipelink').text
            link = info.find('a', class_='recipelink')['href']
            dict[food] = []
            dict[food].append(link)
            if info.find('span', class_='menu-item-description'):
                description = info.find('span', class_='menu-item-description').text
                dict[food].append(description.strip().lstrip())
            else:
                dict[food].append('')
        col1.set({
            'food': dict
        })
        col2.set({
            'food': dict
        })
foodlist = page.find_all("div", class_="menu-block style-side")
for list in foodlist:
    col1 = db.collection(u'menu').document(u'The Drey').collection('lunch').document(list.h3.text)
    col2 = db.collection(u'menu').document(u'The Drey').collection('dinner').document(list.h3.text)
    food = list.find_all("div", class_="menu-item")
    dict = {}
    for info in food:
        if info.find('a', class_='recipelink'):
            food = info.find('a', class_='recipelink').text
            link = info.find('a', class_='recipelink')['href']
            dict[food] = []
            dict[food].append(link)
            if info.find('span', class_='menu-item-description'):
                description = info.find('span', class_='menu-item-description').text
                dict[food].append(description.strip())
            else:
                dict[food].append('')
        col1.set({
            'food': dict
        })
        col2.set({
            'food': dict
        })