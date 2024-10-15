import requests
import threading

url = "http://localhost:3000"  

def send_requests():
    while True:
        try:
            response = requests.get(url)
            print(f"Request sent: {response.status_code}")
        except requests.exceptions.RequestException as e:
            print(f"Error: {e}")

for i in range(100): 
    thread = threading.Thread(target=send_requests)
    thread.start()
