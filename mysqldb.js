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

module.exports = connection;