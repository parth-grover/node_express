var mysql = require('mysql');

var dbConfig = {
	host     : 'localhost',
	user     : 'root',
	password : ''
};

var connection = mysql.createPool(dbConfig);

connection.getConnection(function(err){
    if (err) {
        console.log("*** Cannot establish a connection with the database. ***");
        connection = reconnect(connection);
	}
	else {
        console.log("*** New connection established with the database. ***")
    }
});

function reconnect(connection){
    console.log("New connection tentative...");
    connection = mysql.createPool(dbConfig);
    connection.getConnection(function(err) {
        if (err) {
            setTimeout(reconnect, 2000,connection);
		}
		else {
            console.log("*** New connection established with the database. ***")
            return connection;
        }
    });
}

connection.on('error', function(err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {    
        console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
        return reconnect(connection);
    }
    else if (err.code === "PROTOCOL_ENQUEUE_AFTER_QUIT") {
        console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
        return reconnect(connection);
    }
    else if (err.code === "PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR") {
        console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
        return reconnect(connection);
    }
    else if (err.code === "PROTOCOL_ENQUEUE_HANDSHAKE_TWICE") {
        console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
    }
    else{
        console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
        return reconnect(connection);
    }
});

module.exports = connection;