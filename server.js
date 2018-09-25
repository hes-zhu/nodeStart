//http服务器模块,此处的require的HTTP模块是node自带的
var http = require('http');
var url = require('url');

//把服务器脚本放到一个start的函数里,并导出
function start(route, handle) {
	function onRequest(request, response) {
		var pathname = url.parse(request.url).pathname;
		var postData = "";
		console.log("请求处理:" + " " + pathname + " " + ",收到");

		// request.setEncoding("utf8");

		// request.addListener("data", function(postDataChunk) {
		// 	postData += postDataChunk;
		// 	console.log("接收后的数据块: " + postDataChunk + ".");
		// });

		// request.addListener("end", function() {
		// 	route(handle, pathname, response, postData);
		// });

		route(handle, pathname, response, request);

		//将内容传递给服务器的方式
		// response.writeHead(200, {'Content-Type': 'text/plain'});
		// var content = route(handle, pathname);
		// response.write(content);
		// response.end();
	}
	http.createServer(onRequest).listen(8888);
	console.log("Your server running at http://localhost:8888");
}
//导出这个函数
exports.start = start;


 // 将data和end事件的回调函数直接放在服务器中，在data事件回调中收集所有的POST数据，
 // 当接收到所有数据，触发end事件后，其回调函数调用请求路由，并将数据传递给它，
 // 然后，请求路由再将该数据传递给请求处理程序。