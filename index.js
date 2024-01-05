const express = require('express');
const multer = require('multer');
const tesseract = require("node-tesseract-ocr");
const path = require('path');
const fs = require('fs'); // Require the 'fs' module for file system operations

const app = express();
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
app.set('view engine', 'ejs');
const uploadDirectory = path.join(__dirname, 'public/uploads');

// Check if the upload directory exists, create it if not
if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory, { recursive: true });
}

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads");
    },
    filename: function (req, file, cb) {
        cb(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
    },
});
const upload = multer({ storage: storage });

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.post('/extracttextfromimage', upload.single('file'), (req, res) => {
    console.log(req.file.path);
    // Add your logic for handling the uploaded file here
    const config = {
        lang: "eng",
        oem: 1,
        psm: 3,
        binary: '"C:\\Program Files\\Tesseract-OCR\\tesseract.exe"',
      };
      
      tesseract
        .recognize(req.file.path, config)
        .then((text) => {
          console.log("Result:", text);
          res.render('index.ejs',{text});
        })
        .catch((error) => {
          console.log(error.message);
        });
      
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});
