#!/usr/bin/python3

from bs4 import BeautifulSoup as soup
from urllib.request import urlopen as uReq
#from firebase import Firebase

import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

cred = credentials.Certificate("./serviceAccountKey.json")
firebase_admin.initialize_app(cred, {
  'projectId': "ucla-dining",
})

db = firestore.client()

html_link = 'https://menu.dining.ucla.edu/hours/'

#grabbing the page
uClient = uReq(html_link)
page_html = uClient.read()
uClient.close()

whitespace = "\r\n\t"
page = soup(page_html, 'html.parser')
table = page.find("table", class_="hours-table")
elem = table.find_all("tr")
for element in elem:
    indiv = element.find_all("td")
    iter = 0
    for i in indiv:
        if iter==0:
            doc_ref = db.collection('time').document(i.text.strip(whitespace).partition('\n')[0])
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
            elif iter == 2:
                doc_ref.update({
                    'lunch': ref
                })
            elif iter == 3:
                doc_ref.update({
                    'dinner': ref
                })
            elif iter == 4:
                doc_ref.update({
                    'late_night': ref
                })
        iter=iter+1


# doc_ref = db.collection('time').document('kalyan')
# doc_ref.set({
#     'first': 'pussy',
#     'last': 'slayer',
#     'born': -350
# })