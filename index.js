// 先导入需要的模块
var express = require('express')
var multer = require('multer')
// multer模块,nodejs中间件,用于上传图片
var bodyParser = require('body-parser')
var path = require("path");
var web = express()

web.use(express.static('views'))
web.use(bodyParser.urlencoded({extended:false}))
web.set("view engine", "ejs");
web.set("views", path.resolve(__dirname, "views"));

var Dname; //檔名是 photo-DataNow

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'views/headers')
	},
	filename: function (req, file, cb) {
		Dname = Date.now();
		pname = file.fieldname + '-' + Dname + ".jpg"; //+jpg避免檔案讀不出來
		cb(null, pname);

		pname='';
	}

	
})


var upload = multer({storage:storage})


//取得header裡面的所有檔案名稱

var path = 'views/headers';
	var fs = require('fs');
	var fileArray ;

web.get('/getMyGallery',function(req,res){


	res.send(fileArray)
	console.log(fileArray[0])
//把header裡面的檔案名送出去 gallery頁面發get請求 在這裡

})

web.get("/viewGallery", function(request, response) {
	fs.readdir(path, function(err, files){
		if (err) {
			console.log(err);
			return;
		}
		fileArray = files;
		console.info(files);
	});
	response.render("gallery");
});



web.get("/", function(request, response) {
	response.render("index");
});

web.post('/upload',upload.single('photo'),function(req,res){
	res.send('')
	console.log('上傳成功')

})

web.get('/getMyHeader',function(req,res){
	res.send('headers/'+ "photo-"+  Dname +".jpg")
    //檔案的請求路徑
})

web.listen('8080',function(){
	console.log('開啟中..')
})