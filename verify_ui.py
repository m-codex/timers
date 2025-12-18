from playwright.sync_api import sync_playwright
import time

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("http://localhost:5173/")
    page.click('button:has-text("START")')
    page.wait_for_selector('button:has-text("RESET")')
    time.sleep(3)
    page.screenshot(path="screenshot.png")
    browser.close()
