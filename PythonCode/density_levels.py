from bs4 import BeautifulSoup as soup
from urllib.request import urlopen as uReq
from firebase import firebase
from numpy import less_equal

#not too busy, getting busy, very busy, do not come here, covid farm

links = ['http://menu.dining.ucla.edu/Menus/BruinCafe'
, 'http://menu.dining.ucla.edu/Menus/Rendezvous', 'http://menu.dining.ucla.edu/Menus/HedrickStudy',
'http://menu.dining.ucla.edu/Menus/Drey']
names = ['Bruin Café', 'Rendezvous', 'The Study at Hedrick', 'The Drey']

firebase = firebase.FirebaseApplication('https://ucla-dining-default-rtdb.firebaseio.com', None)

#grabbing the page
html_link = 'http://menu.dining.ucla.edu/Menus/Today'
uClient = uReq(html_link)
page_html = uClient.read()
page = soup(page_html, 'html.parser')
foodlist = page.find_all("div", class_="menu-block third-col")

def level_placer(dining_hall, percentage):
    level_line = ''
    if percentage < 30:
        level_line = 'Not too busy'
    elif percentage < 50:
        level_line = 'Getting busy'
    elif percentage < 70:
        level_line = 'Very busy'
    elif percentage < 90:
        level_line = 'Do not come here'
    else:
        level_line = 'COVID Farm'
    data = {'level': level_line,
            'percentage': percentage}
    firebase.delete('/density/'+dining_hall, None)
    firebase.post('/density/'+dining_hall, data)
    return 0

for i in foodlist:
    if i.find('span', class_="activity-level-wrapper"):
        dining_hall = i.h3.text
        percentage = int(i.p.text.split(' ')[-1][:-1])
        level_placer(dining_hall, percentage)

count = 0
for link in links:
    uClient = uReq(link)
    pageHTML = uClient.read()
    page = soup(pageHTML, 'html.parser')
    center_region = page.find('p', class_="center")
    if page.find('p', class_="center"):
        center_region = page.find('p', class_="center")
        if center_region.find('span', class_="activity-level-wrapper"):
            percentage = int(center_region.text.split(' ')[-1][:-1])
            level_placer(names[count], percentage)
        count = count+1
uClient.close()

