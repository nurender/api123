require('./user.model');
require('./usernotes.model');
const userController = require('./user.controller');
const router = require('express').Router();
const validator = require('./validations');
// images upload
const multer = require('multer');
// jwt token check 
const { guardJwt } = require('../../middlewares/checkjwttoke')



// Create User
router.post('/register',validator, (req, res, next) => {
  if (next instanceof Error) {
    next(next);
  }   
  userController.create(req, res, next);
});

// Login User
router.post('/login', (req, res, next) => {
  if (next instanceof Error) {
    next(next);
  }
  console.log('loginRoutert');
  userController.login(req, res, next);
});

// forgot-password User
router.post('/forgot_password',guardJwt, (req, res, next) => {
  if (next instanceof Error) {
    next(next);
  }
  userController.forgotPassword(req, res, next);
});

// images upload and storage images path
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      console.log("images");
      
       cb(null, './uploads/');
    } else {
      console.log("file");
       cb(null, './file/');
    }
   
  },
  filename: function(req, file, cb) {
    console.log(file);
    
    cb(null, file.originalname);
  }
});

// file filter and check images type
const fileFilter = (req, file, cb) => {
  // reject a file
  console.log("check");
  
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'application/pdf'  || file.mimetype === 'text/plain') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// upload file size (images size)
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

// edit profile
router.post('/editprofile',guardJwt,upload.single('image'), (req, res, next) => {
  if (next instanceof Error) {
    next(next);
  }
  userController.editProfile(req, res, next);
});

// get profile details
router.post('/editProfileDetails',guardJwt, (req, res, next) => {
  if (next instanceof Error) {
    next(next);
  }
  userController.editProfileDetails(req, res, next);
});

// get profile images
router.get('/geteditprofile',guardJwt, (req, res, next) => {
  if (next instanceof Error) {
    next(next);
  }
  userController.getProfile(req, res, next);
});

// upload notes
router.post('/upload',guardJwt,upload.single('file'),  (req, res, next) => {
  if (next instanceof Error) {
    next(next);
  }  
  console.log("post");
  
  userController.uploadNotes(req, res, next);
});



// images upload and storage images path
const storageNotes = multer.diskStorage({
  destination: function(req, file, cb) {
          cb(null, './NotesImages/');   
  },
  filename: function(req, file, cb) {
    console.log(file);
    
    cb(null, file.originalname);
  }
});
// upload file size (images size)
const notestUpload = multer({
  storage: storageNotes,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

// upload notes images
router.post('/uploadnodeimages',guardJwt,notestUpload.single('image'),  (req, res, next) => {
  if (next instanceof Error) {
    next(next);
  }    
  userController.uploadNotesImages(req, res, next);
});

// Get all notes images
router.get('/getAllNotes',guardJwt,  (req, res, next) => {
  if (next instanceof Error) {
    next(next);
  }    
  userController.getAllNotes(req, res, next);
});

// change status notes active
router.post('/notesStatusChange',guardJwt,  (req, res, next) => {
  if (next instanceof Error) {
    next(next);
  }    
  userController.notesStatusChange(req, res, next);
});

// change status notes active
router.post('/likeNotes',guardJwt,  (req, res, next) => {
  if (next instanceof Error) {
    next(next);
  }      
  userController.likeNotes(req, res, next);
});

// get like status notes active
router.get('/getLikeNotes',guardJwt,  (req, res, next) => {
  if (next instanceof Error) {
    next(next);
  }        
  userController.getLikeNotes(req, res, next);
});


// images upload and storage images path
// const storageNotes = multer.diskStorage({
//   destination: function(req, file, cb) {
//     cb(null, './file/');
//   },
//   filename: function(req, file, cb) {
//     console.log(file.originalname);
//         cb(null, file.originalname);
//   }
// });

// file filter and check images type
// const fileFilterNotes = (req, file, cb) => {
//   // reject a file
//   debugger
//   console.log(file.mimetype);
  
//   if (file.mimetype === 'application/pdf'  || file.mimetype === 'text/plain') {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

// upload file size (images size)
// const upload1 = multer({
//   storage: storageNotes,
//   limits: {
//     fileSize: 1024 * 1024 * 5
//   },
//   fileFilter: fileFilterNotes
// });




// TESTING ROUTER 
router.post('/test',guardJwt, (req, res, next) => {
  debugger
  if (next instanceof Error) {
    next(next);
  }
  console.log("OK");
  // userController.editProfile(req, res, next);
});


// router.post('/users', validator, (req, res, next) => {
//   if (next instanceof Error) {
//     next(next);
//   }
//   userController.create(req, res, next);
// });

// router.get('/users', (req, res, next) => {
//   userController.get(req, res, next);
// });

module.exports = router;
