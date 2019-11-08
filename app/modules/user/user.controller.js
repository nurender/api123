const userService = require('./user.service');
const logger = require('../../core/logger');
const { formatSuccess } = require('../../middlewares/ResponseFormat')

// Create User Result
create = async (req, res, next) => {
  try {
    const { body } = req;
    const result = await userService.createUser(body);
    formatSuccess(res, result)
  } catch (err) {
    logger.error(err.message);
    next(err);
  }
};

// Login User Result
login = async (req, res, next) => {
  try {
    debugger
    const { body } = req;
    const result = await userService.loginUser(body);
    // res.send(result);
    formatSuccess(res, result)
  } catch (err) {
    debugger
    logger.error(err.message);
    next(err)
  }
};

// forgotPassword User Result
forgotPassword = async (req, res, next) => {
  try {
    debugger
    const { body } = req;
    const result = await userService.forgotPassword(body);
    // res.send(result);
    formatSuccess(res, result)
  } catch (err) {
    debugger
    logger.error(err.message);
    next(err)
  }
};

// edit profile User images
editProfile = async (req, res, next) => {
  try {
    console.log("okokokokokokokokokokok");

    const result = await userService.editProfile(req);
    console.log("lmklmklfmblkgfmbklmgf");

    console.log(result);
    formatSuccess(res, result)
  } catch (err) {
    logger.error(err.message);
    next(err)
  }
};

// edit profile User Details
editProfileDetails = async (req, res, next) => {
  try {
    const result = await userService.editProfileDetails(req);


    formatSuccess(res, result)
  } catch (err) {
    logger.error(err.message);
    next(err)
  }
};

// get profile User Result
getProfile = async (req, res, next) => {
  try {
    console.log("post", req.body);
    const result = await userService.getProfile(req);
    formatSuccess(res, result)
  } catch (err) {
    logger.error(err.message);
    next(err)
  }
};

// upload notes User Result
uploadNotes = async (req, res, next) => {
  try {
    const result = await userService.uploadNotes(req);
    formatSuccess(res, result)
  } catch (err) {
    logger.error(err.message);
    next(err)
  }
};

// upload notes image User Result
uploadNotesImages = async (req, res, next) => {
  try {
    const result = await userService.uploadNotesImages(req);
    formatSuccess(res, result)
  } catch (err) {
    logger.error(err.message);
    next(err)
  }
};


// getAllNotes User and notes Result
getAllNotes = async (req, res, next) => {
  try {
    const result = await userService.getAllNotes(req);
    formatSuccess(res, result)
  } catch (err) {
    logger.error(err.message);
    next(err)
  }
};

// change status notes active Result
notesStatusChange = async (req, res, next) => {
  try {
    const result = await userService.notesStatusChange(req);
    formatSuccess(res, result)
  } catch (err) {
    logger.error(err.message);
    next(err)
  }
};

// like notes 
likeNotes = async (req, res, next) => {
  try {
    const result = await userService.likeNotes(req);
    formatSuccess(res, result)
  } catch (err) {
    logger.error(err.message);
    next(err)
  }
};

// get like notes 
getLikeNotes = async (req, res, next) => {
  try {
    const result = await userService.getLikeNotes(req);
    formatSuccess(res, result)
  } catch (err) {
    logger.error(err.message);
    next(err)
  }
};

module.exports = {
  create, login,
  forgotPassword, editProfile,
  getProfile, editProfileDetails,
  uploadNotes, uploadNotesImages,
  getAllNotes, notesStatusChange,
  likeNotes, getLikeNotes
};
// validate = (type) => {
//   switch (type) {
//     case 'createUser':
//       return validationSchemas.createUserSchema;
//   }
// };

// module.exports = { create, validate };
