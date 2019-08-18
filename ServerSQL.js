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
			var table = 'user_action (buy_item VARCHAR(255))';
			mysqlCreateTable(table);

			var target = 'user_info';
			var userInfo = '(fullname, address) VALUES("Hoang Duy", "186 HIGHLAND")';
			// Step 3: Insert Into *
			//mysqlInsertInto(target + ' ' + userInfo);

			// Step 4: Select From *
			mysqlSelectFrom(target);

			// Step 5: Where(table, where, content)
			var where = 'fullname';
			var content = 'Nguyen Hoang Duy';
			mysqlWhere(target, where, content);
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
		if(err) LOG('Unable to insert: ' + info);
		else {
			LOG('4:: Inserted info!');
			return true;
		}
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
	var address = '598 TCV';
	var sql = 'SELECT * FROM user_info WHERE fullname = ? OR address = ?';	
	sqlServer.query(sql, [fullname, address], function(err, result) {
		if(err) {
			LOG('Error: mysqlWhere fail!');
			throw err;
		}
		LOG(result);
	});
}

// Defined end
 
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