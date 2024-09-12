const multer = require("multer");
const path = require("path");

// กำหนดที่เก็บไฟล์และการตั้งชื่อไฟล์
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // กำหนดโฟลเดอร์ที่เก็บไฟล์
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

// ฟิลเตอร์ไฟล์เพื่อตรวจสอบรูปภาพเท่านั้น
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only JPEG, JPG, and PNG are allowed."));
  }
};

// ตั้งค่า Multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // จำกัดขนาดไฟล์ที่ 5MB
  },
});

module.exports = upload;
