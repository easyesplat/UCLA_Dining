#!/usr/bin/python3

from bs4 import BeautifulSoup as soup
from urllib.request import urlopen as uReq

html_link = 'https://menu.dining.ucla.edu/hours/'

#grabbing the page
uClient = uReq(html_link)
page_html = uClient.read()
uClient.close()

whitespace = "\r\n\t"
page = soup(page_html, 'html.parser')
#print(page.h2.text)
table = page.find("table", class_="hours-table")
elem = table.find_all("tr")
for element in elem:
    indiv = element.find_all("td")
    iter = 0
    for i in indiv:
        if iter==0:
            print(i.text.strip(whitespace).partition('\n')[0])
        else:
            ref = ' '.join(i.text.split())
            ref = ref.strip(whitespace)
            print(ref)
        iter=iter+1