/**
 * serverConfig.js
 * Author: Mattias Sundling, masu1402@student.miun.se
 * Latest update: 2017-05-17
 * 
 * This file holds many configurations used within the server.js main file.
 * 
 * Created as a proof of concept during the final independent project in Computer Science.
 */

var serverConfig = {
    // mongodb connection settings ================= mongodb connection settings
    database: {
        host:   "localhost",
        port: "27017",
        db: "bor",
        options:{
            user: "bor-cloud",
            pass: "auroraaustralis"   
        }
    },
    // runtime configurations =========================== runtime configurations
    server: {
        host: "0.0.0.0",
        port: "8080"
    },
    // digest configurations ============================= digest configurations
    digest: {
        realm: "api",
        file: __dirname + "/.htdigest"
    }
};
module.exports = serverConfig;

// other quick to copy commands ================================================

// * authenticate user
// mongo -u "sudo" -p "bor" --authenticationDatabase "admin”
// * check file sizes in cloud9
// du-c9 | sort -h

/* create user
db.createUser({
    user: "bor-cloud",
    pwd: "auroraaustralis",
    roles: [ { 
      role: "readWrite",
      db: "bor"
    } ]
});
*/

// sudo rm -rf /home/ubuntu/workspace/api/doc
// sudo apidoc -i /home/ubuntu/workspace/ -o /home/ubuntu/workspace/api/doc -e /home/ubuntu/workspace/node_modules/ -e /home/ubuntu/workspace/data/ -e /home/ubuntu/workspace/.c9/
