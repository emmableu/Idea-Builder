As .env files are git ignored, this file is about how to create the .env file in your environment in order to run the program.

first, create a file named .env in the root folder.

next, put this line into it. The BASE_URL is where the back-end is being deployed at. 
```
# set REACT_APP_BACKEND_BASE_URL
REACT_APP_BACKEND_BASE_URL = 'http://127.0.0.1:1000'
```
