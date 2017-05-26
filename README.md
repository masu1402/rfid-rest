# Setting up your environment in Cloud 9
For the Bergeforsen Obstacle Race prototype Cloud9 was used. Setting up the Node.js server in the cloud based environment is even easier than setting up the Raspberry Pi environment.
# Node.js
Usually in Cloud9 a version of Node is already installed. Run node -v to check which. If you need a newer installation of Node, run:
`curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
sudo apt-get install -y nodejs`
## Node Modules
Download the project from GitHub: https://github.com/masu1402/rfid-rest.git. You can use the git-clone function or Cloud9’s own clone function.
When downloaded and inside the main directory for the project, just run npm install and all node modules needed will be installed. You can now use node server.js to run the server, but are still missing some major parts needed to be configured.
## Install MongoDB database
To install latest MongoDB on Ubuntu(which is the virtual OS that you receive in Cloud9) you can follow the instructions in https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/
When you’ve installed the database, create a script by running commands:
`mkdir data
echo ‘mongod --nojournal --bind_ip=localhost --dbpath=/home/ubuntu/workspace/database/’ > mongod
chmod a+x mongod`
## Security
MongoDB doesn’t come with any authentication upon start and you need to create user accounts yourself to make your database safer. Follow this guide to create a superuser. Then activate the authentication by default by configuring (case 1) the mongodb.conf file or (case 2) the mongod file you created during. All you need to do is follow these steps (case 2):
Open a terminal and run the mongod script by entering ./mongod
Open a new terminal window and enter mongodb by entering mongo
Change database to admin by entering use admin and follow with the command in snippet 1.
### Snippet 1
```javascript
db.createUser({
	user: "superuser",
	pwd: "anypwd",
	roles: [ { role: "root", db: "admin" } ]
});
```
### Snippet 2
```javascript
use bor;
db.createUser({
	user: "node",
	pwd: "anypwd",
	roles: [ { role: "readWrite", db: "bor" } ]
});
```

Now, close MongoDB in this terminal by entering Ctrl + C
Now, I change the script file created under “Install MongoDB database”. Just add --auth as option parameter.
Rerun the first terminal opened by exiting (Ctrl + C) and then starting it again with ./mongod
In the second terminal you can now log on as superuser by entering mongo -u "superuser" -p "anypwd" --authenticationDatabase "admin”
You can now as a superuser create a database for the project (I named it bor) and to it create users with defined roles on what they are allowed to do, see an example in snippet 2. Your database will first show up when you created your first document which will happen through the API and connection to the database will be written in the code, see the next chapter.

## Configure Mongoose connection (Node.js → MongoDB)
Mongoose is the connection between Node.js and MongoDB used in this project for easier object modeling. It’s usually a small part of the code in the server. In this project, you find the settings for the connection between Mongoose and the database in the file configServer.js. If there are any other changes to be made in the connection here that isn’t the username or password for the authentication, see http://mongoosejs.com/docs/guide.html.
## Running the server
To run the server you usually need two terminal windows.
1. Open a terminal and run the ./mongod script to start the database
2. Open a terminal and run node server.js to start the Node.js server