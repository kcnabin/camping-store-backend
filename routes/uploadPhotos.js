const uploadPhotos = require("express").Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const upload = multer({
  dest: path.join(__dirname + "/../products/"),
});

uploadPhotos.post("/", upload.array("photos"), async (req, res, next) => {
  let photos = [];
  const files = req.files;

  for (let i = 0; i < req.files.length; i++) {
    // getting extenstion
    const splitName = files[i].originalname.split(".");
    const ext = splitName[splitName.length - 1];

    const newName = files[i].filename + "." + ext;
    fs.renameSync(files[i].path, files[i].path + "." + ext);
    photos.push(newName);
  }

  res.json(photos);
});

module.exports = uploadPhotos;
