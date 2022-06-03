import schedule
import subprocess
import time

def job():
    subprocess.call(['python', 'density_levels.py'])
    print('Completed Density Level Analysis')

def menu_fill():
    subprocess.call(['python', 'bcafe.py'])
    subprocess.call(['python', 'bruinplate.py'])
    subprocess.call(['python', 'deneve.py'])
    subprocess.call(['python', 'drey.py'])
    subprocess.call(['python', 'epicuria.py'])
    subprocess.call(['python', 'hours_scrape.py'])
    subprocess.call(['python', 'rendezvous.py'])
    subprocess.call(['python', 'spicekitchen.py'])
    print('Complete menu fill for every dining hall')

schedule.every(5).minutes.do(job)
schedule.every().day.at("00:00:30").do(menu_fill)

while True:
    schedule.run_pending()
    time.sleep(1)