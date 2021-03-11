for /f "delims=[] tokens=2" %%a in ('ping -4 -n 1 %ComputerName% ^| findstr [') do set NetworkIP=%%a
json-server -w -d 2000 -H %NetworkIP% ./db.json

