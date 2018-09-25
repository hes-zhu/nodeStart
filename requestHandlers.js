//请求处理程序

//实际应用
var queryString = require('querystring');
var fs = require('fs');
var formidable = require('formidable');

function start(response) {
	console.log("请求处理程序'start'被调用。");
	var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html/> '+
    '<meta charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" enctype="multipart/form-data" method="post">'+
    '<input type="file" name="upload" rows="20" cols="60" style="margin-left: 35%"/>'+
    '</br></br>'+
    '<input type="submit" value="点击上传" style="background-color: #38f;color: white;width: 70px;height: 40px;margin-left: 45%;"/>'+
    '</form>'+
    '</body>'+
    '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function upload(response, request) {
	console.log("请求处理程序'upload'被调用。");

	var form = new formidable.IncomingForm();
	form.uploadDir ="tmp";
	console.log("关于解析");
	form.parse(request, function (error, fields, files) {
		console.log("解析完成");
		console.log("完成"+files.upload.path);
		fs.renameSync(files.upload.path, "tmp/test.png");
		console.log("完成"+files.upload.path);
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("接受图片:<br/>");
    response.write("<img src='/show' />");
    response.end();
	});
}

//硬编码将文件/tmp/test.png内容展示到浏览器中
function show(response) {
	console.log("请求处理程序的“show”被调用.");


	fs.readFile("./tmp/test.png", "binary", function(error, file) {
		if(error) {
			response.writeHead(500, {"Content-Type": "text/plain"});
      response.write("这些是错误:" + error + "\n");
      response.end();
		} else {
			response.writeHead(200, {"Content-Type": "image/png"});
      response.write(file, "binary");
      response.end();
		}
	})
}

exports.start = start;
exports.upload = upload;
exports.show = show;