var http = require("http");
var user = require("./User/user");  // #4: Module exports

// $5: File system module
/* ===================================================== */
// var fs = require('fs');

// //Read file.
// var index = "index.html";
// fs.readFile(index, function(err, data){
// 	LOG(data.toString());
// });

// // Append -> If file not exists, the file will be created.
// // This method will append content to the end of the file.
// var file = "append.txt";
// var content = "Write content";
// fs.appendFile(file, content, function(err){
// 	if(err) throw err;
// 	LOG("appendFile Saved");
// });

// // Replace the content of the file:
// fs.writeFile(file, content, function(err){
// 	if(err) throw err;
// 	LOG("writeFile Saved");
// })

// //If file dosen't exist, an epmty file is created.
// fs.open(file, 'w', function(err, FILE){
// 	if(err) throw err;
// 	LOG("File opened");
// });

// // Delete the specified file
// fs.unlink(file, function(err){
// 	if(err) throw err;
// 	LOG("File Deleted!");
// });

// fs.rename(file, 'newfile.txt', function(err){
// 	if(err) throw err;
// 	LOG("File renamed");
// });

// #6: Url Module
/* ===================================================== */
// var url = require("url");
// 	var address = "http://localhost:8080/default.html?year=2019&month=august";
// 	var object = url.parse(address, true);
// 	var data = object.query;

	////////////////////////
	// LOG(object.host);
	// LOG(object.pathname);
	// LOG(object.search);

	// LOG(data.year);
	// LOG(data.month);

// #7: skip spm
/* ===================================================== */

// #8: Events
/* ===================================================== */
// var events = require("events");
// var eventEmitter = new events.EventEmitter();

// var createEvent = function(){
// 	LOG("Created event!");;
// }

// eventEmitter.on("newEvent", createEvent);
// eventEmitter.emit("newEvent");

// #9: Upload Files
/* ===================================================== */


// #LOG
/* ===================================================== */
function LOG(message){ console.log(message); }

// http.createServer(function(reqest, response){
// 	response.writeHead(200, {"Content-Type": "text/html"});
// 	var s = url.parse(reqest.url, true).search;
// 	response.end(s);
// }).listen(8080);




