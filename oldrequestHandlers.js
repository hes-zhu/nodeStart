//请求处理程序

//从请求处理程序中获取返回值
// function start() {
// 	// console.log("Request handler 'start' was called.");
// 	console.log("请求处理程序'start'被调用。");
// 	//睡眠函数-->阻塞操作
// 	// function sleep(time) {
// 	// 	var startTime = new Date().getTime();
// 	// 	while(new Date().getTime() < startTime + time);
// 	// }
// 	// sleep(10000);
// 	return "Hello start";
// };

//直接传递response对象
var exec = require("child_process").exec;

function start(response) {
	console.log("请求处理程序'start'被调用。");
	//stdout是空的
	exec("ls -lah", {timeout:10000,maxbuffer:20000*1024}, 
		function(error, stdout, stderr) {
		response.writeHead(200, {'Content-Type': 'text/plain'});
		console.log("这是" + stdout);
		response.write(stdout);
		response.end();
	});
}

// ===============错误使用非阻塞操作示例start=================
// var exec = require("child_process").exec;

// function start() {
// 	console.log("请求处理程序'start'被调用。");
// 	var content = "empty";
//	获取当前目录下所有的文件（“ls -lah”）
// 	exec("ls-lah", function(error, stdout, stderr) {
// 		content = stdout;
// 	});
// 	return content;
// }
// ===============错误使用非阻塞操作示例end=================

//从请求处理程序中获取返回值
// function upload() {
// 	console.log("请求处理程序'upload'被调用。");
// 	return "Hello upload";
// }

//直接传递response对象
function upload(response) {
	console.log("请求处理程序'upload'被调用。");
	response.writeHead(200, {'Content-Type': 'text/plain'});
	response.write("Hello upload");
	response.end();	
}

exports.start = start;
exports.upload = upload;