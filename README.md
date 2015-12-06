# Configuration:
Make sure you have the following installed:
- NodeJs
- MongoDB 

# MongoDB Setup
- Save mongodb at c:/ (e.g. c:/mongodb/..)
- Create a folder named "data" (e.g. c:/data)
- create  a new folder "db" within data (e.g c:/data/db)
        
# Launch application:

Start mongodb by navigating to the folder c:/mongodb/bin and run:
```sh
$ mongod
```

Start the application by navigating to the applications folder location and run the following commands:
```sh
$ npm install
$ node server
```

You will see the following:
```sh
$ node listening on port 27018..
```


Now open a webrowser and vistit : localhost:27018


