const cloudinary = require("../../helpers/cloudinary");
const multer = require("multer");
//const sharp = require("sharp");

const filter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(
      new Error("The uploaded file is not an image. Please upload only images"),
      false
    );
  }
};

// 1- Create the Storage object
const multerstorage = multer.diskStorage({});

// 2- Create the upload instance
const upload = multer({
  storage: multerstorage,
  fileFilter: filter,
});

exports.uploadImage = upload.single("photo");

exports.cloudinaryUpload = async (files, folderName) => {
  try {
    const image = await cloudinary.uploader.upload(files, {
      folder: folderName,
    });

    return image ? image : null;
  } catch (err) {
    console.log(err);
  }
};
