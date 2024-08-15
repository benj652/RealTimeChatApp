import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // console.log('Saving file to uploads directory');
        // console.log('Current working directory:', process.cwd());
        cb(null, './frontend/uploads/');
    },
    filename: function (req, file, cb) {
        // console.log(`File name: ${Date.now()}-${file.originalname}`);
        cb(null, Date.now() + '-' + file.originalname);
    }
});

export const upload = multer({ storage: storage });