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
        db: "",
        options:{
            user: "",
            pass: ""
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