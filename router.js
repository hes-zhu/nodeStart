//路由
function route(handle, pathname, response, request) {
	console.log("即将提出的请求:" + " " + pathname + " ");
	//此处的对象中的属性只能用[],不能用"."
	if(typeof handle[pathname] === 'function') {
		handle[pathname](response, request);
	} else {
		console.log("没有发现任何请求处理程序" + " " + pathname + " ");
		//将内容传递给服务器的方式
		// return "404 Not Found!";

		//将服务器“传递”给内容的方式
		response.writeHead(404, {'Content-Type': 'text/plain'});
		response.write("404 Not Found!");
		response.end();
	}
}

exports.route = route;