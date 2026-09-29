import os
import subprocess
import sys

def main():
    possible_browsers = [
        r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
        r"C:\Program Files\Microsoft\Edge\Application\msedge.exe",
        r"C:\Program Files\Google\Chrome\Application\chrome.exe",
        r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
        r"C:\Users\Asus\AppData\Local\Google\Chrome\Application\chrome.exe",
        r"C:\Users\Asus\AppData\Local\Microsoft\Edge\Application\msedge.exe"
    ]
    
    browser_path = None
    for path in possible_browsers:
        if os.path.exists(path):
            browser_path = path
            break
            
    if not browser_path:
        print("No headless browser found in standard paths.")
        sys.exit(1)
        
    print(f"Using browser: {browser_path}")
    
    html_path = os.path.abspath(r"c:\Users\Asus\Downloads\portfolio\public\resume.html")
    pdf_path = os.path.abspath(r"c:\Users\Asus\Downloads\portfolio\public\Charu_Sonker_Full_Stack_Developer_Resume.pdf")
    
    # Make sure output directory exists
    os.makedirs(os.path.dirname(pdf_path), exist_ok=True)
    
    cmd = [
        browser_path,
        "--headless=new",
        "--disable-gpu",
        "--no-pdf-header-footer",
        f"--print-to-pdf={pdf_path}",
        f"file:///{html_path.replace(os.sep, '/')}"
    ]
    
    print(f"Running command: {' '.join(cmd)}")
    result = subprocess.run(cmd, capture_output=True, text=True)
    print("Return code:", result.returncode)
    print("Stdout:", result.stdout)
    print("Stderr:", result.stderr)
    
    if os.path.exists(pdf_path):
        size = os.path.getsize(pdf_path)
        print(f"SUCCESS: Generated {pdf_path} (Size: {size} bytes)")
    else:
        print("ERROR: PDF was not generated.")
        sys.exit(1)

if __name__ == "__main__":
    main()
