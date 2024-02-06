// Imported Modules

let http = require("http");
let fs = require("fs");
let multer = require("multer");

// Multer storage configuration

let storage = multer.diskStorage({
    destination: function (req, file, callBack) {
        callBack(null, './uploads');
    },
    filename: function (req, file, callBack) {
        callBack(null, file.originalname);
    }
});

// Multer Initialization

let upload = multer({ storage: storage }).single("file");

// HTTP server

let server = http.createServer(function (req,res){

    if(req.url === "/" && req.method === 'POST'){
        res.end("This is Home Page");
    }

    else if(req.url === "/about" && req.method === 'POST'){
        res.end("This is About Page");
    }

    else if(req.url === "/contact" && req.method === 'POST'){
        res.end("This is Contact Page");
    }

    else if(req.url === "/file-write" && req.method === 'POST'){
        fs.writeFile("demo.txt", "Hello World", function (error){
            if(error){
                res.end("File Write Failed");
            }
            else{
                res.end("File Write Successful")
            }
        })
    }

    else if(req.url === "/upload" && req.method === 'POST'){
        upload(req, res, function (error){
            if(error){
                res.end("File Upload Failed")
            }
            else{
                res.end("File Upload Successful")
            }
        })
    }
});

// Listening on port 5500

server.listen(5500,function(){
    console.log("server is running")
});
