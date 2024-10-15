from selenium import webdriver # type: ignore
from selenium.webdriver.chrome.service import Service # type: ignore
from selenium.webdriver.common.by import By # type: ignore
from selenium.webdriver.support.ui import WebDriverWait # type: ignore
from selenium.webdriver.support import expected_conditions as EC # type: ignore
import time
import random

# Path to your ChromeDriver
service = Service("C:/Users/ASUS/Downloads/chromedriver-win64/chromedriver-win64/chromedriver.exe")  # Update to your path
driver = webdriver.Chrome(service=service)

try:
    driver.get("http://localhost:3000")

    # Wait for the "Add Task" button to be clickable (adjust if needed)
    create_task_button = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.CLASS_NAME, "create-task-button"))  # Use the submit button's class name
    )

    for i in range(100 , 1000):  # Loop to create 100 tasks
        # Assuming that the "Add Task" button triggers the form display
        create_task_button.click()  # Click to open the form, if necessary
        
        # Wait for the form elements to be present
        title_input = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CLASS_NAME, "task-title-input"))  # Use class name from TaskForm
        )
        
        # Fill out the form with unique task data
        title_input.send_keys(f"Test Task {i + 1}")  # Unique title
        description_input = driver.find_element(By.CLASS_NAME, "task-description-input")  # Use class name
        description_input.send_keys(f"This is a test task number {i + 1}.")  # Unique description

        # Select status using class name
        status_dropdown = driver.find_element(By.CLASS_NAME, "status-dropdown")  # Use class name
        status_dropdown.click()
        # Randomly choose status from the options
        statuses = ["To Do", "In Progress", "Done"]
        status_selection = random.choice(statuses)
        status_dropdown.find_element(By.XPATH, f".//option[text()='{status_selection}']").click()

        # Select priority using class name
        priority_dropdown = driver.find_element(By.CLASS_NAME, "priority-dropdown")  # Use class name
        priority_dropdown.click()
        # Randomly choose priority from the options
        priorities = ["Low", "Medium", "High"]
        priority_selection = random.choice(priorities)
        priority_dropdown.find_element(By.XPATH, f".//option[text()='{priority_selection}']").click()

        # Select assigned user using class name
        assigned_dropdown = driver.find_element(By.CLASS_NAME, "assigned-user-dropdown")  # Use class name
        assigned_dropdown.click()
        # Choose a random user if users are fetched
        users = ["Rohit", "Virsen"]  # Replace with actual user names
        assigned_user = random.choice(users)
        assigned_dropdown.find_element(By.XPATH, f".//option[text()='{assigned_user}']").click()

        # Submit the form
        submit_button = driver.find_element(By.CLASS_NAME, "submit-button")  # Use class name
        submit_button.click()

        # Short wait to ensure the task is added
        time.sleep(1)  # Adjust this delay if necessary

        # Re-fetch the "Add Task" button for the next iteration
        create_task_button = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.CLASS_NAME, "create-task-button"))  # Use class name
        )

finally:
    driver.quit()
