#!/usr/bin/python3

from bs4 import BeautifulSoup as soup
from urllib.request import urlopen as uReq

from numpy import equal

html_link = 'https://menu.dining.ucla.edu/Menus/Epicuria'

#grabbing the page
uClient = uReq(html_link)
page_html = uClient.read()
uClient.close()

#parsing page
page = soup(page_html, 'html.parser')
#with open("randomfile.txt", "a") as o:
 #   o.write(page.prettify())
title = page.h2.text

#finding each specific dining hall location
foodlist = page.find_all("li", class_="sect-item")
capri_list = foodlist[0].text.splitlines()
capri_list = [x for x in capri_list if x.strip()]

#initializing with title of dining hall location
spec_list = []

#basically call me a genius for making this work
count = 0
for items in capri_list:
    if count == 0:
        spec_list.append(items.strip())
        count+=1
    else:
        if items.find('\xa0') != -1:
            spec_list[count-1]['option'].append(items.strip())
        else:
            dict = {}
            spec_list.append(dict)
            spec_list[count]['name'] = items.strip(' ')
            spec_list[count]['option'] = []
            count+=1

print(spec_list[2]['option'])


