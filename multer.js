const express = require("express");
const multer = require("multer");
const app = express();

// Set up Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");           //destination where file stored
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);    //fileName after upload the file
  },
});

let upload = multer({
  storage: storage,
  limits: {
    fileSize: 3000000, //3 MB
  },
  fileFilter: function (req, file, cb) {
    if (file.fieldname === "myFile") {
        if (
            file.mimetype === "image/png" ||
            file.mimetype === "image/jpg" ||
            file.mimetype === "image/jpeg" ||
            file.mimetype === "image/gif"
          ) {
            cb(null, true);
          } else {
            cb("Invalid format of file");
          }
    } else {
      cb("Unexpected error");
    }
  }
});

module.exports = upload;