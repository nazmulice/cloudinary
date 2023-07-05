const express = require("express");
const app = express();
const upload = require('./multer');
const cloudinary = require('./cloudinary');
const fs = require('fs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.get('/', (req, res) => {
  res.send("Home Page");
});


app.post("/register", upload.array("myFile"), async (req, res) => {
  const uploader = async (path) => await cloudinary.uploads(path, "MyFiles");
  if (req.method == "POST") {
    const urls = [];
    const files = req.files;

    for (const file of files) {
      const { path } = file;

      const newPath = await uploader(path);

      urls.push(newPath);

      fs.unlinkSync(path);
    }
    res.status(200).json({
      message: "File upload successfully",
      data: urls,
    });
  } else {
      res.status(405).json({
        err: "Image not uploaded",
      });
    }
});


// Start the server
app.listen(8000, () => {
  console.log("Server listening on port 8000");
});