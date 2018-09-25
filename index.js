//导入模块
var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

//对象的两种使用方式
//第一种
var handle = {
	"/": requestHandlers.start,
	"/start": requestHandlers.start,
	"/upload": requestHandlers.upload,
	"/show": requestHandlers.show,
};
//第二种
// var handle = {};
// handle['/'] = requestHandlers.start;
// handle['/start'] = requestHandlers.start;
// handle['/upload'] = requestHandlers.upload;

server.start(router.route, handle);
