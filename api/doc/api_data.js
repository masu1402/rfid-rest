define({ "api": [
  {
    "type": "get",
    "url": "../api/competitors/:_id",
    "title": "Read a single competitor",
    "name": "GetCompetitor",
    "group": "Competitors",
    "permission": [
      {
        "name": "Digest authentication"
      }
    ],
    "description": "<p>Returns a single competitor</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Schema.Types.ObjectId",
            "optional": false,
            "field": "_id",
            "description": "<p>Looks for a single competitor with unique identifier from database.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"_id\": \"591a50f4e08aa61f8b6dafd6\",\n  \"rfid\": \"d5:1f:ae:75\",\n  \"name\": \"Martin Karttunen\",\n  \"nickname\": \"Martkart\",\n  \"company\": \"Mittuniversitetet\",\n  \"__v\": 0,\n  \"readings\": [\n    {\n      \"time\": \"2017-06-12T08:00:00.363Z\",\n      \"node\": 1,\n      \"race\": \"591a5133e08aa61f8b6dafd9\"\n    },\n    {\n      \"time\": \"2017-06-12T08:15:13.363Z\",\n      \"node\": 2,\n      \"race\": \"591a5133e08aa61f8b6dafd9\"\n    }\n  ],\n  \"races\": [\n    \"591a5133e08aa61f8b6dafd9\"\n  ],\n  \"sponsors\": [\n    \"Grönborg på Hörnet\",\n    \"Miun Innovation\"\n  ],\n  \"created\": \"2017-05-16T01:08:04.925Z\"\n}",
          "type": "JSON"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Schema.Types.ObjectId",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique identifier of database object.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "created",
            "description": "<p>Date of creation of Competitor.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "size": "..50",
            "optional": false,
            "field": "rfid",
            "description": "<p>Unique identifier from assigned RFID-device</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "size": "..70",
            "optional": false,
            "field": "name",
            "description": "<p>Fullname of Competitor.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "size": "..50",
            "optional": false,
            "field": "nickname",
            "description": "<p>Nickname of Competitor.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "size": "..50",
            "optional": false,
            "field": "company",
            "description": "<p>Competitors company.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "size": "..50",
            "optional": false,
            "field": "sponsors",
            "description": "<p>Competitors sponsors.</p>"
          },
          {
            "group": "Success 200",
            "type": "JSON-array",
            "optional": false,
            "field": "races",
            "description": "<p>An array of MongoDB ObjectID references to races that user is signed up to.</p>"
          },
          {
            "group": "Success 200",
            "type": "JSON-array",
            "optional": false,
            "field": "readings",
            "description": "<p>An array of readings, posted to database to record time (Date), node (physical identifier) and race (reference). Can only be posted to if user is signed onto race. See ../api/races/:_id/competitors route</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "404 Not Found": [
          {
            "group": "404 Not Found",
            "type": "text/plain",
            "optional": false,
            "field": "NotFound",
            "description": "<p>A competitor with <code>_id</code> was not found.</p>"
          }
        ],
        "500 Internal Server Error": [
          {
            "group": "500 Internal Server Error",
            "type": "JSON",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>The server was unable to process the request by some reason. Returns the error if possible.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Not found:",
          "content": "HTTP/1.1 404 Not Found\n{\n     Not Found\n}",
          "type": "JSON"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "/home/ubuntu/workspace/api/routes/competitors/competitors.js",
    "groupTitle": "Competitors"
  },
  {
    "type": "get",
    "url": "../api/competitors/",
    "title": "Read a list of competitors",
    "name": "GetCompetitors",
    "group": "Competitors",
    "permission": [
      {
        "name": "Digest authentication"
      }
    ],
    "description": "<p>Returns a JSON-Array with competitors</p>",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n  {\n    \"_id\": \"591a50f4e08aa61f8b6dafd6\",\n    \"rfid\": \"d5:1f:ae:75\",\n    \"name\": \"Martin Karttunen\",\n    \"nickname\": \"Martkart\",\n    \"company\": \"Mittuniversitetet\",\n    \"__v\": 0,\n    \"readings\": [\n      {\n        \"time\": \"2017-06-12T08:00:00.363Z\",\n        \"node\": 1,\n        \"race\": \"591a5133e08aa61f8b6dafd9\"\n      },\n      {\n        \"time\": \"2017-06-12T08:15:13.363Z\",\n        \"node\": 2,\n        \"race\": \"591a5133e08aa61f8b6dafd9\"\n      }\n    ],\n    \"races\": [\n      \"591a5133e08aa61f8b6dafd9\"\n    ],\n    \"sponsors\": [\n      \"Grönborg på Hörnet\",\n      \"Miun Innovation\"\n    ],\n    \"created\": \"2017-05-16T01:08:04.925Z\"\n  },\n  {\n    \"_id\": \"591a50fae08aa61f8b6dafd7\",\n    \"name\": \"Mats Sundhagen\",\n    \"company\": \"Mittuniversitetet\",\n    \"__v\": 0,\n    \"readings\": [],\n    \"races\": [],\n    \"sponsors\": [\n      \"Grönborg på Hörnet\",\n      \"Miun Innovation\"\n    ],\n    \"created\": \"2017-05-16T01:08:10.954Z\"\n  },\n  {\n    \"_id\": \"591a5103e08aa61f8b6dafd8\",\n    \"rfid\": \"80:9b:6f:85\",\n    \"name\": \"Jonathan Ellström\",\n    \"__v\": 0,\n    \"readings\": [],\n    \"races\": [],\n    \"sponsors\": [],\n    \"created\": \"2017-05-16T01:08:19.434Z\"\n  }\n]",
          "type": "JSON-array"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Schema.Types.ObjectId",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique identifier of database object.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "created",
            "description": "<p>Date of creation of Competitor.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "size": "..50",
            "optional": false,
            "field": "rfid",
            "description": "<p>Unique identifier from assigned RFID-device</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "size": "..70",
            "optional": false,
            "field": "name",
            "description": "<p>Fullname of Competitor.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "size": "..50",
            "optional": false,
            "field": "nickname",
            "description": "<p>Nickname of Competitor.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "size": "..50",
            "optional": false,
            "field": "company",
            "description": "<p>Competitors company.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "size": "..50",
            "optional": false,
            "field": "sponsors",
            "description": "<p>Competitors sponsors.</p>"
          },
          {
            "group": "Success 200",
            "type": "JSON-array",
            "optional": false,
            "field": "races",
            "description": "<p>An array of MongoDB ObjectID references to races that user is signed up to.</p>"
          },
          {
            "group": "Success 200",
            "type": "JSON-array",
            "optional": false,
            "field": "readings",
            "description": "<p>An array of readings, posted to database to record time (Date), node (physical identifier) and race (reference). Can only be posted to if user is signed onto race. See ../api/races/:_id/competitors route</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "500 Internal Server Error": [
          {
            "group": "500 Internal Server Error",
            "type": "JSON",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>The server was unable to process the request by some reason. Returns the error if possible.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "/home/ubuntu/workspace/api/routes/competitors/competitors.js",
    "groupTitle": "Competitors"
  },
  {
    "type": "post",
    "url": "../api/competitors/",
    "title": "Create a new competitor",
    "name": "PostCompetitor",
    "group": "Competitors",
    "permission": [
      {
        "name": "Digest authentication"
      }
    ],
    "description": "<p>Creates a new competitor</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "size": "..50",
            "optional": true,
            "field": "rfid",
            "description": "<p>Competitors unique identifier from RFID-device</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "..70",
            "optional": false,
            "field": "name",
            "description": "<p>Fullname of Competitor.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "..50",
            "optional": true,
            "field": "nickname",
            "description": "<p>Nickname of Competitor.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "..50",
            "optional": true,
            "field": "company",
            "description": "<p>Competitors company.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "..50",
            "optional": true,
            "field": "sponsors",
            "description": "<p>Competitors sponsors.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "201 Created": [
          {
            "group": "201 Created",
            "type": "text/plain",
            "optional": false,
            "field": "Created",
            "description": "<p>A new competitor was created. A redirections header is sent back so that the client can find it.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 Created\nCreated. Redirecting to /api/competitors/591a50fae08aa61f8b6dafd7",
          "type": "text/plain"
        }
      ]
    },
    "error": {
      "fields": {
        "409 Conflict": [
          {
            "group": "409 Conflict",
            "type": "JSON",
            "optional": false,
            "field": "Conflict",
            "description": "<p>A competitor with <code>rfid</code> already exists. Remove rfid from existing user or use another identifier.</p>"
          }
        ],
        "500 Internal Server Error": [
          {
            "group": "500 Internal Server Error",
            "type": "JSON",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>The server was unable to process the request by some reason. Returns the error if possible.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 409 Conflict\n{\n  \"code\": 11000,\n  \"index\": 0,\n  \"errmsg\": \"E11000 duplicate key error collection: bor.competitors index: rfid_1 dup key: { : \\\"d5:1f:ae:75\\\" }\",\n  \"op\": {\n    \"rfid\": \"d5:1f:ae:75\",\n    \"name\": \"Martin Karttunen\",\n    \"nickname\": \"Martkart\",\n    \"company\": \"Mittuniversitetet\",\n    \"_id\": \"591a5cd77a120126f46ba83f\",\n    \"readings\": [],\n    \"races\": [],\n    \"sponsors\": [\n      \"Grönborg på Hörnet\",\n      \"Miun Innovation\"\n    ],\n    \"created\": \"2017-05-16T01:58:47.789Z\",\n    \"__v\": 0\n  }\n}",
          "type": "JSON"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "/home/ubuntu/workspace/api/routes/competitors/competitors.js",
    "groupTitle": "Competitors"
  },
  {
    "type": "delete",
    "url": "../api/races/:_id/competitors/:cid",
    "title": "Removes a competitor from a specified race",
    "name": "DeleteCompetitorFromRace",
    "group": "Competitors_in_Race",
    "permission": [
      {
        "name": "Digest authentication"
      }
    ],
    "description": "<p>Removes a competitor from a races competitors reference and competitors race references</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Schema.Types.ObjectId",
            "optional": false,
            "field": "_id",
            "description": "<p>Looks for a single race with unique identifier from database.</p>"
          },
          {
            "group": "Parameter",
            "type": "Schema.Types.ObjectId",
            "optional": false,
            "field": "cid",
            "description": "<p>Looks for a single competitor with unique identifier from database. Corresponds to a competitors _id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success:",
          "content": "HTTP/1.1 200 OK\n{\n     OK\n}",
          "type": "text/plain"
        }
      ]
    },
    "error": {
      "fields": {
        "404 Not Found": [
          {
            "group": "404 Not Found",
            "type": "text/plain",
            "optional": false,
            "field": "RaceNotFound",
            "description": "<p>A race with <code>_id</code> and signed up competitor was not found.</p>"
          },
          {
            "group": "404 Not Found",
            "type": "text/plain",
            "optional": false,
            "field": "CompetitorNotFound",
            "description": "<p>A competitor with <code>cid</code> was not found.</p>"
          }
        ],
        "500 Internal Server Error": [
          {
            "group": "500 Internal Server Error",
            "type": "JSON",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>The server was unable to process the request by some reason. Returns the error if possible.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Race Not found:",
          "content": "HTTP/1.1 404 Not Found\n{\n     Race Not Found\n}",
          "type": "JSON"
        },
        {
          "title": "Competitor Not found:",
          "content": "HTTP/1.1 404 Not Found\n{\n     Competitor Not Found\n}",
          "type": "JSON"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "/home/ubuntu/workspace/api/routes/races/competitors.js",
    "groupTitle": "Competitors_in_Race"
  },
  {
    "type": "get",
    "url": "../api/races/:_id/competitors/:cid",
    "title": "Read a single competitor that is in a specified race",
    "name": "GetCompetitorFromRace",
    "group": "Competitors_in_Race",
    "permission": [
      {
        "name": "Digest authentication"
      }
    ],
    "description": "<p>Returns a single competitor from a specified race</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Schema.Types.ObjectId",
            "optional": false,
            "field": "_id",
            "description": "<p>Looks for a single race with unique identifier from database.</p>"
          },
          {
            "group": "Parameter",
            "type": "Schema.Types.ObjectId",
            "optional": false,
            "field": "cid",
            "description": "<p>Looks for a single competitor with unique identifier from database. Corresponds to a competitors _id.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success:",
          "content": "HTTP/1.1 200 OK\n{\n  \"_id\": \"591a50f4e08aa61f8b6dafd6\",\n  \"rfid\": \"d5:1f:ae:75\",\n  \"name\": \"Martin Karttunen\",\n  \"nickname\": \"Martkart\",\n  \"company\": \"Mittuniversitetet\",\n  \"__v\": 0,\n  \"readings\": [\n    {\n      \"time\": \"2017-06-12T08:00:00.363Z\",\n      \"node\": 1,\n      \"race\": \"591a5133e08aa61f8b6dafd9\"\n    },\n    {\n      \"time\": \"2017-06-12T08:15:13.363Z\",\n      \"node\": 2,\n      \"race\": \"591a5133e08aa61f8b6dafd9\"\n    }\n  ],\n  \"races\": [\n    \"591a5133e08aa61f8b6dafd9\"\n  ],\n  \"sponsors\": [\n    \"Grönborg på Hörnet\",\n    \"Miun Innovation\"\n  ],\n  \"created\": \"2017-05-16T01:08:04.925Z\"\n}",
          "type": "JSON"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Schema.Types.ObjectId",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique identifier of database object.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "created",
            "description": "<p>Date of creation of Competitor.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "size": "..50",
            "optional": false,
            "field": "rfid",
            "description": "<p>Unique identifier from assigned RFID-device</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "size": "..70",
            "optional": false,
            "field": "name",
            "description": "<p>Fullname of Competitor.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "size": "..50",
            "optional": false,
            "field": "nickname",
            "description": "<p>Nickname of Competitor.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "size": "..50",
            "optional": false,
            "field": "company",
            "description": "<p>Competitors company.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "size": "..50",
            "optional": false,
            "field": "sponsors",
            "description": "<p>Competitors sponsors.</p>"
          },
          {
            "group": "Success 200",
            "type": "JSON-array",
            "optional": false,
            "field": "races",
            "description": "<p>An array of MongoDB ObjectID references to races that user is signed up to.</p>"
          },
          {
            "group": "Success 200",
            "type": "JSON-array",
            "optional": false,
            "field": "readings",
            "description": "<p>An array of readings, posted to database to record time (Date), node (physical identifier) and race (reference). Can only be posted to if user is signed onto race. See ../api/races/:_id/competitors route</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "404 Not Found": [
          {
            "group": "404 Not Found",
            "type": "text/plain",
            "optional": false,
            "field": "RaceNotFound",
            "description": "<p>A race with <code>_id</code> and signed up competitor was not found.</p>"
          },
          {
            "group": "404 Not Found",
            "type": "text/plain",
            "optional": false,
            "field": "CompetitorNotFound",
            "description": "<p>A competitor with <code>cid</code> was not found.</p>"
          }
        ],
        "500 Internal Server Error": [
          {
            "group": "500 Internal Server Error",
            "type": "JSON",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>The server was unable to process the request by some reason. Returns the error if possible.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Race Not found:",
          "content": "HTTP/1.1 404 Not Found\n{\n     Race (with competitor) Not Found\n}",
          "type": "JSON"
        },
        {
          "title": "Competitor Not found:",
          "content": "HTTP/1.1 404 Not Found\n{\n     Competitor Not Found\n}",
          "type": "JSON"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "/home/ubuntu/workspace/api/routes/races/competitors.js",
    "groupTitle": "Competitors_in_Race"
  },
  {
    "type": "get",
    "url": "../api/races/:_id/competitors/",
    "title": "Read a list of competitors from a specified race",
    "name": "GetCompetitorsFromRace",
    "group": "Competitors_in_Race",
    "permission": [
      {
        "name": "Digest authentication"
      }
    ],
    "description": "<p>Returns a JSON-Array with competitors that are signed up in specified race</p>",
    "success": {
      "examples": [
        {
          "title": "Success:",
          "content": "HTTP/1.1 200 OK\n[\n  {\n    \"_id\": \"591a50f4e08aa61f8b6dafd6\",\n    \"rfid\": \"d5:1f:ae:75\",\n    \"name\": \"Martin Karttunen\",\n    \"nickname\": \"Martkart\",\n    \"company\": \"Mittuniversitetet\",\n    \"__v\": 0,\n    \"readings\": [\n      {\n        \"time\": \"2017-06-12T08:00:00.363Z\",\n        \"node\": 1,\n        \"race\": \"591a5133e08aa61f8b6dafd9\"\n      },\n      {\n        \"time\": \"2017-06-12T08:15:13.363Z\",\n        \"node\": 2,\n        \"race\": \"591a5133e08aa61f8b6dafd9\"\n      }\n    ],\n    \"races\": [\n      \"591a5133e08aa61f8b6dafd9\"\n    ],\n    \"sponsors\": [\n      \"Grönborg på Hörnet\",\n      \"Miun Innovation\"\n    ],\n    \"created\": \"2017-05-16T01:08:04.925Z\"\n  },\n  {\n    \"_id\": \"591a5103e08aa61f8b6dafd8\",\n    \"rfid\": \"80:9b:6f:85\",\n    \"name\": \"Jonathan Ellström\",\n    \"__v\": 0,\n    \"readings\": [],\n    \"races\": [\n      \"591a5133e08aa61f8b6dafd9\"\n    ],\n    \"sponsors\": [],\n    \"created\": \"2017-05-16T01:08:19.434Z\"\n  }\n]",
          "type": "JSON-array"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Schema.Types.ObjectId",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique identifier of database object.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "created",
            "description": "<p>Date of creation of Competitor.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "size": "..50",
            "optional": false,
            "field": "rfid",
            "description": "<p>Unique identifier from assigned RFID-device</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "size": "..70",
            "optional": false,
            "field": "name",
            "description": "<p>Fullname of Competitor.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "size": "..50",
            "optional": false,
            "field": "nickname",
            "description": "<p>Nickname of Competitor.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "size": "..50",
            "optional": false,
            "field": "company",
            "description": "<p>Competitors company.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "size": "..50",
            "optional": false,
            "field": "sponsors",
            "description": "<p>Competitors sponsors.</p>"
          },
          {
            "group": "Success 200",
            "type": "JSON-array",
            "optional": false,
            "field": "races",
            "description": "<p>An array of MongoDB ObjectID references to races that user is signed up to.</p>"
          },
          {
            "group": "Success 200",
            "type": "JSON-array",
            "optional": false,
            "field": "readings",
            "description": "<p>An array of readings, posted to database to record time (Date), node (physical identifier) and race (reference). Can only be posted to if user is signed onto race. See ../api/races/:_id/competitors route</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "404 Not Found": [
          {
            "group": "404 Not Found",
            "type": "text/plain",
            "optional": false,
            "field": "RaceNotFound",
            "description": "<p>A race with <code>_id</code> was not found.</p>"
          }
        ],
        "500 Internal Server Error": [
          {
            "group": "500 Internal Server Error",
            "type": "JSON",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>The server was unable to process the request by some reason. Returns the error if possible.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Race Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n     Race Not Found\n}",
          "type": "JSON"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "/home/ubuntu/workspace/api/routes/races/competitors.js",
    "groupTitle": "Competitors_in_Race"
  },
  {
    "type": "post",
    "url": "../api/races/:_id/competitors/:cid",
    "title": "Add a competitor to a specified race",
    "name": "PostCompetitorToRace",
    "group": "Competitors_in_Race",
    "permission": [
      {
        "name": "Digest authentication"
      }
    ],
    "description": "<p>Adds a competitor to a races competitors reference and competitors race references</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Schema.Types.ObjectId",
            "optional": false,
            "field": "_id",
            "description": "<p>Looks for a single race with unique identifier from database.</p>"
          },
          {
            "group": "Parameter",
            "type": "Schema.Types.ObjectId",
            "optional": false,
            "field": "cid",
            "description": "<p>Looks for a single competitor with unique identifier from database. Corresponds to a competitors _id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success:",
          "content": "HTTP/1.1 200 OK\n{\n     OK\n}",
          "type": "text/plain"
        }
      ]
    },
    "error": {
      "fields": {
        "404 Not Found": [
          {
            "group": "404 Not Found",
            "type": "text/plain",
            "optional": false,
            "field": "RaceNotFound",
            "description": "<p>A race with <code>_id</code> and signed up competitor was not found.</p>"
          },
          {
            "group": "404 Not Found",
            "type": "text/plain",
            "optional": false,
            "field": "CompetitorNotFound",
            "description": "<p>A competitor with <code>cid</code> was not found.</p>"
          }
        ],
        "500 Internal Server Error": [
          {
            "group": "500 Internal Server Error",
            "type": "JSON",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>The server was unable to process the request by some reason. Returns the error if possible.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Race Not found:",
          "content": "HTTP/1.1 404 Not Found\n{\n     Race Not Found\n}",
          "type": "JSON"
        },
        {
          "title": "Competitor Not found:",
          "content": "HTTP/1.1 404 Not Found\n{\n     Competitor Not Found\n}",
          "type": "JSON"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "/home/ubuntu/workspace/api/routes/races/competitors.js",
    "groupTitle": "Competitors_in_Race"
  },
  {
    "type": "delete",
    "url": "../api/competitors/:_id",
    "title": "Delete an existing competitor",
    "name": "deleteCompetitor",
    "group": "Competitors",
    "permission": [
      {
        "name": "Digest authentication"
      }
    ],
    "description": "<p>Deletes an exisiting Competitor</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "_id",
            "description": "<p>The competitors unique identifier</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200 Success": [
          {
            "group": "200 Success",
            "type": "text/plain",
            "optional": false,
            "field": "Success",
            "description": "<p>Competitor with <code>_id</code> was deleted.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success:",
          "content": "HTTP/1.1 200 Success",
          "type": "String"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "type": "text/plain",
            "optional": false,
            "field": "NotFound",
            "description": "<p>The competitor with <code>_id</code> was not found.</p>"
          }
        ],
        "500 Internal Server Error": [
          {
            "group": "500 Internal Server Error",
            "type": "JSON",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>The server was unable to process the request by some reason. Returns the error if possible.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found",
          "type": "text/plain"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "/home/ubuntu/workspace/api/routes/competitors/competitors.js",
    "groupTitle": "Competitors"
  },
  {
    "type": "patch",
    "url": "../api/competitors/:_id",
    "title": "Modify an existing competitor",
    "name": "patchCompetitor",
    "group": "Competitors",
    "permission": [
      {
        "name": "Digest authentication"
      }
    ],
    "description": "<p>Modifies an exisiting Competitor</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "size": "..50",
            "optional": true,
            "field": "rfid",
            "description": "<p>Competitors unique identifier from RFID-device</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "..70",
            "optional": false,
            "field": "name",
            "description": "<p>Name of Competitor.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "..50",
            "optional": true,
            "field": "nickname",
            "description": "<p>Nickname of Competitor.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "..50",
            "optional": true,
            "field": "company",
            "description": "<p>Competitor's company.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "..50",
            "optional": true,
            "field": "sponsors",
            "description": "<p>Competitor's sponsors.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "204 No Content": [
          {
            "group": "204 No Content",
            "type": "String",
            "optional": false,
            "field": "NoContent",
            "description": "<p>Competitor with <code>_id</code> was updated.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "No Content:",
          "content": "HTTP/1.1 204 No Content",
          "type": "text/plain"
        }
      ]
    },
    "error": {
      "fields": {
        "404 Not Found": [
          {
            "group": "404 Not Found",
            "type": "text/plain",
            "optional": false,
            "field": "NotFound",
            "description": "<p>The Competitor with <code>_id</code> was not found.</p>"
          }
        ],
        "500 Internal Server Error": [
          {
            "group": "500 Internal Server Error",
            "type": "JSON",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>The server was unable to process the request by some reason. Returns the error if possible.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "404 Not Found:",
          "content": "HTTP/1.1 404 Not Found",
          "type": "text/plain"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "/home/ubuntu/workspace/api/routes/competitors/competitors.js",
    "groupTitle": "Competitors"
  },
  {
    "type": "put",
    "url": "../api/competitors/:_id",
    "title": "Update existing or Create a new competitor",
    "name": "putCompetitor",
    "group": "Competitors",
    "permission": [
      {
        "name": "Digest authentication"
      }
    ],
    "description": "<p>Updates an exisiting competitor. Creates one if none is found.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "size": "..50",
            "optional": true,
            "field": "rfid",
            "description": "<p>Competitors unique identifier from RFID-device</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "..70",
            "optional": false,
            "field": "name",
            "description": "<p>Fullname of Competitor.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "..50",
            "optional": true,
            "field": "nickname",
            "description": "<p>Nickname of Competitor.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "..50",
            "optional": true,
            "field": "company",
            "description": "<p>Competitors company.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "..50",
            "optional": true,
            "field": "sponsors",
            "description": "<p>Competitors sponsors.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "201 Created": [
          {
            "group": "201 Created",
            "type": "text/plain",
            "optional": false,
            "field": "Created",
            "description": "<p>A new competitor was created. A redirections header is sent back so that the client can find it.</p>"
          }
        ],
        "204 No Content": [
          {
            "group": "204 No Content",
            "type": "text/plain",
            "optional": false,
            "field": "NoContent",
            "description": "<p>A competitor with <code>_id</code> was updated.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 Created\nCreated. Redirecting to /api/competitors/591a50fae08aa61f8b6dafd7",
          "type": "text/plain"
        },
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 204 No Content",
          "type": "String"
        }
      ]
    },
    "error": {
      "fields": {
        "500 Internal Server Error": [
          {
            "group": "500 Internal Server Error",
            "type": "JSON",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>The server was unable to process the request by some reason. Returns the error if possible.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "/home/ubuntu/workspace/api/routes/competitors/competitors.js",
    "groupTitle": "Competitors"
  },
  {
    "type": "delete",
    "url": "../api/races/:_id",
    "title": "Delete an existing race",
    "name": "DeleteRace",
    "group": "Races",
    "permission": [
      {
        "name": "Digest authentication"
      }
    ],
    "description": "<p>Deletes an exisiting race</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "_id",
            "description": "<p>The races unique identifier.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200 Success": [
          {
            "group": "200 Success",
            "type": "text/plain",
            "optional": false,
            "field": "Success",
            "description": "<p>Race with <code>_id</code> was deleted.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success:",
          "content": "HTTP/1.1 200 Success",
          "type": "String"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "type": "text/plain",
            "optional": false,
            "field": "NotFound",
            "description": "<p>The race with <code>_id</code> was not found.</p>"
          }
        ],
        "500 Internal Server Error": [
          {
            "group": "500 Internal Server Error",
            "type": "JSON",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>The server was unable to process the request by some reason. Returns the error if possible.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found",
          "type": "text/plain"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "/home/ubuntu/workspace/api/routes/races/races.js",
    "groupTitle": "Races"
  },
  {
    "type": "get",
    "url": "../api/races/:_id",
    "title": "Read a single race",
    "name": "GetRace",
    "group": "Races",
    "permission": [
      {
        "name": "Digest authentication"
      }
    ],
    "description": "<p>Returns a JSON object with specified race</p>",
    "success": {
      "examples": [
        {
          "title": "Successful response:",
          "content": "HTTP/1.1 200 OK\n  {\n    \"_id\": \"591a5133e08aa61f8b6dafd9\",\n    \"name\": \"Bergeforsen Obstacle Race\",\n    \"length\": 5,\n    \"start\": \"2017-06-12T08:00:00.363Z\",\n    \"__v\": 0,\n    \"competitors\": [\n      \"591a50f4e08aa61f8b6dafd6\"\n    ],\n    \"created\": \"2017-05-16T01:09:07.557Z\"\n  }",
          "type": "JSON-array"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Schema.Types.ObjectId",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique identifier of database object.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "created",
            "description": "<p>Date of creation of Race.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "size": "..70",
            "optional": false,
            "field": "name",
            "description": "<p>The name of the Race.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "date",
            "description": "<p>The date of the Race.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "length",
            "description": "<p>The length of the race in nodes.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "start",
            "description": "<p>The time the race starts.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "finish",
            "description": "<p>The time the race ends.</p>"
          },
          {
            "group": "Success 200",
            "type": "JSON-array",
            "optional": false,
            "field": "competitors",
            "description": "<p>A list of ObjectId references to competitors that are signed up to the race.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "404 Not Found": [
          {
            "group": "404 Not Found",
            "type": "text/plain",
            "optional": false,
            "field": "NotFound",
            "description": "<p>A race with <code>_id</code> was not found.</p>"
          }
        ],
        "500 Internal Server Error": [
          {
            "group": "500 Internal Server Error",
            "type": "JSON",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>The server was unable to process the request by some reason. Returns the error if possible.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Not found:",
          "content": "HTTP/1.1 404 Not Found\n{\n     Not Found\n}",
          "type": "JSON"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "/home/ubuntu/workspace/api/routes/races/races.js",
    "groupTitle": "Races"
  },
  {
    "type": "get",
    "url": "../api/races/",
    "title": "Read a list of races",
    "name": "GetRaces",
    "group": "Races",
    "permission": [
      {
        "name": "Digest authentication"
      }
    ],
    "description": "<p>Returns a JSON-Array with races</p>",
    "success": {
      "examples": [
        {
          "title": "Successful response:",
          "content": "HTTP/1.1 200 OK\n[\n  {\n    \"_id\": \"591a5133e08aa61f8b6dafd9\",\n    \"name\": \"Bergeforsen Obstacle Race\",\n    \"length\": 5,\n    \"start\": \"2017-06-12T08:00:00.363Z\",\n    \"__v\": 0,\n    \"competitors\": [\n      \"591a50f4e08aa61f8b6dafd6\"\n    ],\n    \"created\": \"2017-05-16T01:09:07.557Z\"\n  },\n  {\n    \"_id\": \"591a5137e08aa61f8b6dafda\",\n    \"name\": \"Kravallen\",\n    \"length\": 3,\n    \"start\": \"2017-05-09T12:13:00.811Z\",\n    \"__v\": 0,\n    \"competitors\": [],\n    \"created\": \"2017-05-16T01:09:11.193Z\"\n  }\n]",
          "type": "JSON-array"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Schema.Types.ObjectId",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique identifier of database object.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "created",
            "description": "<p>Date of creation of Race.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "size": "..70",
            "optional": false,
            "field": "name",
            "description": "<p>The name of the Race.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "date",
            "description": "<p>The date of the Race.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "length",
            "description": "<p>The length of the race in nodes.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "start",
            "description": "<p>The time the race starts.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "finish",
            "description": "<p>The time the race ends.</p>"
          },
          {
            "group": "Success 200",
            "type": "JSON-array",
            "optional": false,
            "field": "competitors",
            "description": "<p>A list of ObjectId references to competitors that are signed up to the race.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "500 Internal Server Error": [
          {
            "group": "500 Internal Server Error",
            "type": "JSON",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>The server was unable to process the request by some reason. Returns the error if possible.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "/home/ubuntu/workspace/api/routes/races/races.js",
    "groupTitle": "Races"
  },
  {
    "type": "patch",
    "url": "../api/races/:_id",
    "title": "Modify an existing competitor",
    "name": "PatchRace",
    "group": "Races",
    "permission": [
      {
        "name": "Digest authentication"
      }
    ],
    "description": "<p>Modifies an exisiting race</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "size": "..70",
            "optional": false,
            "field": "name",
            "description": "<p>The name of the race.</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": true,
            "field": "date",
            "description": "<p>The date of the race.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "length",
            "description": "<p>The length of the race in nodes.</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "start",
            "description": "<p>The time the race starts.</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": true,
            "field": "finish",
            "description": "<p>The time the race ends.</p>"
          },
          {
            "group": "Parameter",
            "type": "JSON-array",
            "optional": true,
            "field": "competitors",
            "description": "<p>A list of ObjectId references to competitors that are signed up to the race.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "204 No Content": [
          {
            "group": "204 No Content",
            "type": "String",
            "optional": false,
            "field": "NoContent",
            "description": "<p>The race with <code>_id</code> was updated.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "No Content:",
          "content": "HTTP/1.1 204 No Content",
          "type": "text/plain"
        }
      ]
    },
    "error": {
      "fields": {
        "404 Not Found": [
          {
            "group": "404 Not Found",
            "type": "text/plain",
            "optional": false,
            "field": "NotFound",
            "description": "<p>The race with <code>_id</code> was not found.</p>"
          }
        ],
        "500 Internal Server Error": [
          {
            "group": "500 Internal Server Error",
            "type": "JSON",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>The server was unable to process the request by some reason. Returns the error if possible.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "404 Not Found:",
          "content": "HTTP/1.1 404 Not Found",
          "type": "text/plain"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "/home/ubuntu/workspace/api/routes/races/races.js",
    "groupTitle": "Races"
  },
  {
    "type": "post",
    "url": "../api/races/",
    "title": "Create a new race",
    "name": "PostRace",
    "group": "Races",
    "permission": [
      {
        "name": "Digest authentication"
      }
    ],
    "description": "<p>Creates a new race</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "size": "..70",
            "optional": false,
            "field": "name",
            "description": "<p>The name of the race.</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": true,
            "field": "date",
            "description": "<p>The date of the race.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "length",
            "description": "<p>The length of the race in nodes.</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "start",
            "description": "<p>The time the race starts.</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": true,
            "field": "finish",
            "description": "<p>The time the race ends.</p>"
          },
          {
            "group": "Parameter",
            "type": "JSON-array",
            "optional": true,
            "field": "competitors",
            "description": "<p>A list of ObjectId references to competitors that are signed up to the race.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "201 Created": [
          {
            "group": "201 Created",
            "type": "text/plain",
            "optional": false,
            "field": "Created",
            "description": "<p>A new race was created. A redirections header is sent back so that the client can find it.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Successful response:",
          "content": "HTTP/1.1 201 Created\nCreated. Redirecting to /api/races/591a50fae08aa61f8b6dafd7",
          "type": "text/plain"
        }
      ]
    },
    "error": {
      "fields": {
        "500 Internal Server Error": [
          {
            "group": "500 Internal Server Error",
            "type": "JSON",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>The server was unable to process the request by some reason. Returns the error if possible.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "/home/ubuntu/workspace/api/routes/races/races.js",
    "groupTitle": "Races"
  },
  {
    "type": "put",
    "url": "../api/races/:_id",
    "title": "Update existing or Create a new race",
    "name": "PutRace",
    "group": "Races",
    "permission": [
      {
        "name": "Digest authentication"
      }
    ],
    "description": "<p>Updates an exisiting race. Creates one if none is found.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "size": "..70",
            "optional": false,
            "field": "name",
            "description": "<p>The name of the race.</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": true,
            "field": "date",
            "description": "<p>The date of the race.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "length",
            "description": "<p>The length of the race in nodes.</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "start",
            "description": "<p>The time the race starts.</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": true,
            "field": "finish",
            "description": "<p>The time the race ends.</p>"
          },
          {
            "group": "Parameter",
            "type": "JSON-array",
            "optional": true,
            "field": "competitors",
            "description": "<p>A list of ObjectId references to competitors that are signed up to the race.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "201 Created": [
          {
            "group": "201 Created",
            "type": "text/plain",
            "optional": false,
            "field": "Created",
            "description": "<p>A new race was created. A redirections header is sent back so that the client can find it.</p>"
          }
        ],
        "204 No Content": [
          {
            "group": "204 No Content",
            "type": "text/plain",
            "optional": false,
            "field": "NoContent",
            "description": "<p>A competitor with <code>_id</code> was updated.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Created:",
          "content": "HTTP/1.1 201 Created\nCreated. Redirecting to /api/races/591a50fae08aa61f8b6dafd7",
          "type": "text/plain"
        },
        {
          "title": "No Content:",
          "content": "HTTP/1.1 204 No Content",
          "type": "String"
        }
      ]
    },
    "error": {
      "fields": {
        "500 Internal Server Error": [
          {
            "group": "500 Internal Server Error",
            "type": "JSON",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>The server was unable to process the request by some reason. Returns the error if possible.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "/home/ubuntu/workspace/api/routes/races/races.js",
    "groupTitle": "Races"
  },
  {
    "type": "delete",
    "url": "../api/races/:_id/competitors/:rfid/readings/",
    "title": "Remove all readings from specified competitor in specified race",
    "name": "DeleteReadingsFromCompetitorInRace",
    "group": "Readings",
    "permission": [
      {
        "name": "Digest authentication"
      }
    ],
    "description": "<p>Removes all existing readings from competitor that is specified by the race identifier</p>",
    "success": {
      "examples": [
        {
          "title": "Success:",
          "content": "HTTP/1.1 200 Success\n{\n    OK\n}",
          "type": "text/plain"
        }
      ]
    },
    "error": {
      "fields": {
        "404 Not Found": [
          {
            "group": "404 Not Found",
            "type": "text/plain",
            "optional": false,
            "field": "NotFound",
            "description": "<p>A competitor or race was not found.</p>"
          }
        ],
        "500 Internal Server Error": [
          {
            "group": "500 Internal Server Error",
            "type": "JSON",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>The server was unable to process the request by some reason. Returns the error if possible.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n     Not Found\n}",
          "type": "text/plain"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "/home/ubuntu/workspace/api/routes/races/readings.js",
    "groupTitle": "Readings"
  },
  {
    "type": "get",
    "url": "../api/races/:_id/competitors/:rfid/readings/:nid",
    "title": "Read a list of readings from a specified race and specified competitor with specified node identifier",
    "name": "GetReadingFromRaceFromCompetitor",
    "group": "Readings",
    "permission": [
      {
        "name": "Digest authentication"
      }
    ],
    "description": "<p>Returns a JSON-Array with readings with time, race reference and node identifiers.</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "node",
            "description": "<p>The node identifier.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "time",
            "description": "<p>The read time that user tagged onto node.</p>"
          },
          {
            "group": "Success 200",
            "type": "Schema.Types.ObjectId",
            "optional": false,
            "field": "race",
            "description": "<p>Reference to in what race the readings was done.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success:",
          "content": "HTTP/1.1 200 OK\n[\n  {\n    \"time\": \"2017-06-12T08:00:00.363Z\",\n    \"node\": 1,\n    \"race\": \"591a5133e08aa61f8b6dafd9\"\n  },\n  {\n    \"time\": \"2017-06-12T08:03:18.363Z\",\n    \"node\": 1,\n    \"race\": \"591a5133e08aa61f8b6dafd9\"\n  }\n]",
          "type": "JSON-array"
        }
      ]
    },
    "error": {
      "fields": {
        "404 Not Found": [
          {
            "group": "404 Not Found",
            "type": "text/plain",
            "optional": false,
            "field": "NotFound",
            "description": "<p>A competior or race was not found.</p>"
          }
        ],
        "500 Internal Server Error": [
          {
            "group": "500 Internal Server Error",
            "type": "JSON",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>The server was unable to process the request by some reason. Returns the error if possible.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n     Not Found\n}",
          "type": "JSON"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "/home/ubuntu/workspace/api/routes/races/readings.js",
    "groupTitle": "Readings"
  },
  {
    "type": "get",
    "url": "../api/races/:_id/competitors/:rfid/readings/",
    "title": "Read a list of readings from a specified race and specified competitor",
    "name": "GetReadingsFromRaceFromCompetitor",
    "group": "Readings",
    "permission": [
      {
        "name": "Digest authentication"
      }
    ],
    "description": "<p>Returns a JSON-Array with readings with time, race reference and node identifiers.</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "node",
            "description": "<p>The node identifier.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "time",
            "description": "<p>The read time that user tagged onto node.</p>"
          },
          {
            "group": "Success 200",
            "type": "Schema.Types.ObjectId",
            "optional": false,
            "field": "race",
            "description": "<p>Reference to in what race the readings was done.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success:",
          "content": "HTTP/1.1 200 OK\n[\n  {\n    \"time\": \"2017-06-12T08:00:00.363Z\",\n    \"node\": 1,\n    \"race\": \"591a5133e08aa61f8b6dafd9\"\n  },\n  {\n    \"time\": \"2017-06-12T08:03:18.363Z\",\n    \"node\": 2,\n    \"race\": \"591a5133e08aa61f8b6dafd9\"\n  }\n]",
          "type": "JSON-array"
        }
      ]
    },
    "error": {
      "fields": {
        "404 Not Found": [
          {
            "group": "404 Not Found",
            "type": "text/plain",
            "optional": false,
            "field": "NotFound",
            "description": "<p>A competitor or race was not found.</p>"
          }
        ],
        "500 Internal Server Error": [
          {
            "group": "500 Internal Server Error",
            "type": "JSON",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>The server was unable to process the request by some reason. Returns the error if possible.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n     Not Found\n}",
          "type": "text/plain"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "/home/ubuntu/workspace/api/routes/races/readings.js",
    "groupTitle": "Readings"
  },
  {
    "type": "post",
    "url": "../api/races/:_id/competitors/:rfid/readings/:nid",
    "title": "Add new reading to specified competitor in specified race",
    "name": "PostReadingsToCompetitorToRace",
    "group": "Readings",
    "permission": [
      {
        "name": "Digest authentication"
      }
    ],
    "description": "<p>Adds new reading with time, race reference and node identifier to competitor in race.</p>",
    "success": {
      "examples": [
        {
          "title": "Created:",
          "content": "HTTP/1.1 201 Created\n{\n    Created\n}",
          "type": "text/plain"
        }
      ]
    },
    "error": {
      "fields": {
        "404 Not Found": [
          {
            "group": "404 Not Found",
            "type": "text/plain",
            "optional": false,
            "field": "NotFound",
            "description": "<p>A competitor or race was not found.</p>"
          }
        ],
        "500 Internal Server Error": [
          {
            "group": "500 Internal Server Error",
            "type": "JSON",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>The server was unable to process the request by some reason. Returns the error if possible.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n     Not Found\n}",
          "type": "text/plain"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "/home/ubuntu/workspace/api/routes/races/readings.js",
    "groupTitle": "Readings"
  },
  {
    "type": "delete",
    "url": "../api/races/:_id/competitors/:rfid/readings/:nid",
    "title": "Remove all readings from specified competitor in specified race with specified node identifier",
    "name": "RemoveReadingsFromCompetitorInRaceAndNode",
    "group": "Readings",
    "permission": [
      {
        "name": "Digest authentication"
      }
    ],
    "description": "<p>Removes all existing readings from competitor with that is specified by the race and node identifier</p>",
    "success": {
      "examples": [
        {
          "title": "Success:",
          "content": "HTTP/1.1 200 Success\n{\n    OK\n}",
          "type": "text/plain"
        }
      ]
    },
    "error": {
      "fields": {
        "404 Not Found": [
          {
            "group": "404 Not Found",
            "type": "text/plain",
            "optional": false,
            "field": "NotFound",
            "description": "<p>A competitor or race was not found.</p>"
          }
        ],
        "500 Internal Server Error": [
          {
            "group": "500 Internal Server Error",
            "type": "JSON",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>The server was unable to process the request by some reason. Returns the error if possible.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n     Not Found\n}",
          "type": "text/plain"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "/home/ubuntu/workspace/api/routes/races/readings.js",
    "groupTitle": "Readings"
  }
] });
