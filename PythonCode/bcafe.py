#!/usr/bin/python3

from bs4 import BeautifulSoup as soup
from urllib.request import urlopen as uReq
from click import launch
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
db.collection('menu').document('Bruin Café').delete()

html_link = 'http://menu.dining.ucla.edu/Menus/BruinCafe'
#grabbing the page
uClient = uReq(html_link)
page_html = uClient.read()
uClient.close()

page = soup(page_html, 'html.parser')
foodlist = page.find_all("div", class_="swiper-slide")

#lunch
col = db.collection(u'menu').document('Bruin Café').set({'name':'Bruin Café'})
lunch = foodlist[0].find_all("div", class_="menu-block")
del lunch[0]
for food_items in lunch:
    titles = food_items.find_all("h2")
    infos = food_items.find_all("div", class_="style-entree")
    i = 0 
    for title in titles:
        col1 = db.collection(u'menu').document(u'Bruin Café').collection('lunch').document(title.text)
        col2 = db.collection(u'menu').document(u'Bruin Café').collection('dinner').document(title.text)
        info = infos[i].find_all("div", class_="menu-item")
        dict = {}
        for inform in info:
            if inform.find('a', class_='recipelink'):
                food = inform.find('a', class_='recipelink').text
                link = inform.find('a', class_='recipelink')['href']
                dict[food] = []
                dict[food].append(link)
                if inform.find('span', class_='menu-item-description'):
                    description = inform.find('span', class_='menu-item-description').text
                    dict[food].append(description.strip())
                else:
                    dict[food].append('')
            col1.set({
                'food': dict
            })
            col2.set({
                'food': dict
            })
        i = i+1
        
# dinner
dinner = foodlist[1].find_all("div", class_="menu-block")
for food_items in dinner:
    titles = food_items.find_all("h2")
    infos = food_items.find_all("div", class_="style-entree")
    i = 0 
    for title in titles:
        col = db.collection(u'menu').document(u'Bruin Café').collection('late_night').document(title.text)
        info = infos[i].find_all("div", class_="menu-item")
        dict = {}
        for inform in info:
            if inform.find('a', class_='recipelink'):
                food = inform.find('a', class_='recipelink').text
                link = inform.find('a', class_='recipelink')['href']
                dict[food] = []
                dict[food].append(link)
                if inform.find('span', class_='menu-item-description'):
                    description = inform.find('span', class_='menu-item-description').text
                    dict[food].append(description.strip())
                else:
                    dict[food].append('')
            col.set({
                'food': dict
            })
        i = i+1
col = db.collection(u'menu').document(u'Bruin Café').collection('late_night').document('Pastries')
pastries = foodlist[1].find('div', class_='style-2flow')
pastries_info = pastries.find_all('a', class_='recipelink')
dict = {}
for i in pastries_info:
    food = i.text
    link = i['href']
    dict[food] = []
    dict[food].append(link)
    dict[food].append('')
col.set({
    'food': dict
})
