var mysql = require('mysql');
var fileSystem = require('fs');

var sqlServer = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'user_db'
}); 

// User database
// 0: Connect to server
function  mysqlConnectServer(){
	sqlServer.connect(function(err){
		if(err){
			LOG('Unable to connect server!');
			throw err;
		}else{

			/////////////////////////////////////
			// Step 1: Create database if no database
			/////////////////////////////////////

			// Step 2: Create table
			var tableCreate = 'user_info (fullname VARCHAR(255), address VARCHAR(255))';
			//mysqlCreateTable(table);
			
			// Step 3: Insert Into *
			var tableInfo = 'user_info';
			var userInfo = ' (fullname, address) VALUES("Hoang Duy", "186 BD")';
			//mysqlInsertInto(target + userInfo);

			// Step 4: Select From *
			// var tableSelect
			//mysqlSelectFrom(tableSelect);

			// Step 5: Where(table, where, content)
			// tableWhere
			// var where = 'fullname';
			// var content = 'Nguyen Hoang Duy';
			// mysqlWhere(tableWhere, where, content);

			// Step 6:  Skip, because no need for now

			// Step 7: Delete key value
			// var tableDelete
			// var address = 'address';
			// var keyDelete = '186 HIGHLAND';
			//mysqlDeleteFrom(tableDelete, address, keyDelete);

			// Step 8.1: Drop the table
			var tableDrop = 'user_info';
			// mysqlDropTable(tableDrop);
			// Step 8.2: Drop the table if exists.
			//mysqlDropTableExists(tableDrop);

			// Step 9:
			var tableUPD = 'user_info';
			var addressUPD = 'address';
			var old = '', newUPD = '';
			mysqlUpdate(tableUPD, addressUPD, old, newUPD);
		}	
	});
}


// **Note: If created database you must add database for server connection(database: 'data_base')
// 1: Create databasse
function mysqlCreateDB(database){
	var createDB = 'CREATE DATABASE ' + database;
	sqlServer.query(createDB, function(err, result){
		if(err) {
			LOG('Unable to create database: ' + database);
			throw err;
		}
	});
}

// 2: Create table
function mysqlCreateTable(table){

	var createTB = 'CREATE TABLE ' + table;
	sqlServer.query(createTB, function(err, result){
		if(err) LOG('Unable to create table: ' + table);
		else {
			LOG('3:: Created ' + table);
			return true;
		}
	});
}

// 3: Insert info
function mysqlInsertInto(info){
	var insertInfo = 'INSERT INTO ' + info;
	sqlServer.query(insertInfo, function(err, result){
		if(err) {
			LOG('Unable to insert: ' + info);
			throw err;
		}
		LOG('4:: Inserted: ' + info);
	});
}

// 4: Select form
function mysqlSelectFrom(from) {
	var startSELECT = 'SELECT * FROM ' + from;
	sqlServer.query(startSELECT, function(err, result, fields) {
		if(err) {
			LOG('Unable select from: ' + from);
			throw err;
		}
		LOG(result);
	});
}

// Step 5: Where
function mysqlWhere(table, where, content) {
	var fullname = 'Nguyen Hoang Duy';
	var address = '123 TCV';
	var sql = 'SELECT * FROM user_info WHERE fullname = ? OR address = ?';	
	sqlServer.query(sql, [fullname, address], function(err, result) {
		if(err) {
			LOG('Error: mysqlWhere fail!');
			throw err;
		}
		LOG(result);
	});
}

// Step 6: Order By
// function mysqlOderBy() {
// 	sqlServer.query("SELECT * FROM customers ORDER BY name", function() {
// 		if(err) {
// 			LOG("Error: Oder By function from server!");
// 			throw err;
// 		}
// 	});
// }

// Step 7: Delete
function mysqlDeleteFrom(table, address, keyDelete) {
	var del = 'DELETE FROM ' + table;
	var from = ' WHERE ' + address;
	var sqlDelete = 'DELETE FROM user_info WHERE address = "186 HIGHLAND"';
	sqlServer.query(sqlDelete, function(err, result) {
		if(err) {
			LOG('Error: Server can\"t delete!');
			throw err;
		}
		LOG("Deleted: " + result.affectedRows);
	});
}

// Step 8.1: Drop table:
function mysqlDropTable(table) {
	var sqlDrop = 'DROP TABLE user_info';
	sqlServer.query(sqlDrop, function(err, result) {
		if(err) {
			LOG('Error: Server can"t drop ' + table);
			throw err;
		}
		LOG('Drop: ' + table);
	});
}
// Step 8.2: Drop the table if it exists:
function mysqlDropTableExists(table){
	var sqlDrop = 'DROP TABLE IF EXISTS user_info'; // + table
	sqlServer.query(sqlDrop, function(err, result) {
		if(err) throw err;
		LOG('DROPED: ' + table);
	});
}

// Step 9: Update
function mysqlUpdate(tableUPD, addressUPD, old, newUPD) {
	var sqlUpdate = 'UPDATE user_info SET address = "123 TCV" WHERE address = "186 BD"';
	sqlServer.query(sqlUpdate, function(err, result) {
		if(err) throw err;
		LOG(result.affectedRows + ' record(s) updated');
	});
}
// Step 10: Limit
function mysqlLimit() {
	
}

// Step 11: Join

// ============================================================
 
// Main function user
function UserDataInit(){
	mysqlConnectServer();
}
/////////////////////////////////////////////////////////////////

UserDataInit();

/////////////////////////////////////////////////////////////////
function LOG(log) { console.log(log); }

function appendError(filename, content){
	fileSystem.appendFile(filename, content, function(err){
		if(err) throw err;
		console.log('Saved file: ' + filename);
	});
}