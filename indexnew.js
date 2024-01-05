const tesseract = require("node-tesseract-ocr");
const path = require("path");

const imagePath = path.resolve(__dirname, "image.png"); // Assuming the image is in the same directory as the script
const imagePath2 = path.resolve(__dirname, "image2.png");
const config = {
  lang: "eng",
  oem: 1,
  psm: 3,
  binary: '"C:\\Program Files\\Tesseract-OCR\\tesseract.exe"',
};

tesseract
  .recognize(imagePath, config)
  .then((text) => {
    console.log("Result:", text);
  })
  .catch((error) => {
    console.log(error.message);
  });
  tesseract
  .recognize(imagePath2, config)
  .then((text) => {
    console.log("Result:", text);
  })
  .catch((error) => {
    console.log(error.message);
  });
