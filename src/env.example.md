As .env files are git ignored, this file is about how to create the .env file in your environment in order to run the program.

first, create a file named .env in the root folder.

next, put this line into it. The BASE_URL is where the back-end is being deployed at.

all variables must starts with `REACT_APP` 
```
# set REACT_APP_BACKEND_BASE_URL
REACT_APP_BACKEND_BASE_URL = 'http://127.0.0.1:1000'
# if debug mode is off, most console logs on axios will be removed.
REACT_APP_DEBUG = 'OFF'
```
