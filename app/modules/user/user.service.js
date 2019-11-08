const mongoose = require('mongoose');
// require model
const Users = mongoose.model('Users');
const Notes = mongoose.model('Notes');
var { generateToken, decodeToken } = require('../../middlewares/jwtToken');
// Error messages 
var { MESSAGES } = require('../../constants/index')
// email
const {transporter ,emailsenddata} = require('../../middlewares/email')
// var bcrypt = require('bcrypt');
// const saltRounds = 10;

// Creating a new user.
createUser = async (body) => {
  // var Passworddata=await bcrypt.hash(body.Password, saltRounds)
  newbody = {
    "firstName": body.fName.trim(),
    "lastName": body.lName.trim(),
    "email": body.email.trim(),
    "password": body.password.trim(),
  }
  let newUser = new Users(newbody);
  newUser = await newUser.save();
  return newUser;
};

// Login User
loginUser = async (body) => {
  debugger
  let findvalue = await Users.findOne({ email: body.email });
  if (findvalue.password == body.password && findvalue.email == body.email) {
    const token = generateToken({ email: body.email, id: findvalue._id });
    let result = await Users.findOneAndUpdate({ _id: findvalue._id }, { token: token }, { new: true })
    return result;
  } else {
    throw "Enter valid email and password"
  }
};

// forgotPassword User
forgotPassword = async (body) => {
  debugger
  let findvalue = await Users.findOne({ email: body.email });
  if (findvalue != null) {
    // console.log("return",emailSend(body.email));
    var mailOptions = emailsenddata(body.email);
    transporter.sendMail(mailOptions, function (err, info) {
      if (err)
        console.log('Email is not sended',err)
      else
        console.log("Email Send TO ", info);
    });
    
    //  console.log(findvalue);
  }else{
   throw 'Email is not valid'
  }
  

};


// edit profile. images
editProfile = async (req) => {
  var tokenValue = decodeToken(req.headers.authorization);
  debugger;
  // var findData = await Users.findById({ _id: tokenValue.id })

  newbody = {
    "image": req.file.path
  }
  var data = await Users.findOneAndUpdate({ _id: tokenValue.id }, newbody, { new: true });

  return data;

};

// edit profile. detail
editProfileDetails = async (req) => {
  var tokenValue = decodeToken(req.headers.authorization);
  var findData = await Users.findById({ _id: tokenValue.id })
  // console.log(findData);

  // newbody = {
  //       "image": req.file.path
  //     }
  // console.log(req.body);

  // if (findData.password == req.body.oldpassword) {


  if (req.body.newpassword == "") {

    newbody = {
      "firstName": req.body.fName,
      "lastName": req.body.lname,
    }


  } else {
    if (findData.password == req.body.oldpassword) {
      newbody = {
        "firstName": req.body.fname,
        "lastName": req.body.lname,
        "password": req.body.newpassword,
      }
    } else {
      throw "Please Enter You Old Pasword correct"
    }
  }

  var data = await Users.findOneAndUpdate({ _id: tokenValue.id }, newbody, { new: true });
  return data
  // } else {
  //   throw "Please Enter You Old Pasword correct"
  // }

};

// getProfile 
getProfile = async (req) => {
  debugger
  var tokenValue = decodeToken(req.headers.authorization);
  let findvalue = await Users.findOne({ _id: tokenValue.id });
  return findvalue;
};



// upload noders
uploadNotes = async (req) => {
  debugger
  console.log("body vlknfdlkvmfd", JSON.parse(req.body.model).title);
  var tokenValue = decodeToken(req.headers.authorization);
  newbody = {
    title: JSON.parse(req.body.model).title,
    subTitle: JSON.parse(req.body.model).subTitle,
    description: JSON.parse(req.body.model).description,
    file: req.file.path,
    userDetail: tokenValue.id
  }
  let notesModel = new Notes(newbody);
  notesModelData = await notesModel.save();
  var findData = await Users.findById({ _id: tokenValue.id })
  findData.notesDetail.push(notesModelData._id);
  let result = await findData.save();

  return notesModelData

};

// upload noders
uploadNotesImages = async (req) => {
  var tokenValue = decodeToken(req.headers.authorization);
  debugger;
  // var findData = await Notes.findById({ _id: req.body.id })
  console.log(req.body.model);

  console.log(JSON.parse(req.body.model));

  newbody = {
    "image": req.file.path
  }
  var data = await Notes.findOneAndUpdate({ _id: JSON.parse(req.body.model) }, newbody, { new: true });
  return data

};


// getAllNotes 
getAllNotes = async (req) => {
  var tokenValue = decodeToken(req.headers.authorization);
  let findvalue = await Notes.find();
  var newJsonData = [];
  for (var item in findvalue) {
    var findLikeNote = await Notes.find(
      { '_id': findvalue[item]._id },
      { likeNotes: { $elemMatch: { userId: tokenValue.id } } }
    )
    newJsonData.push(
      {
        '_id': findvalue[item]._id, 'isActive': findvalue[item].isActive,
        'title': findvalue[item].title, 'subTitle': findvalue[item].subTitle,
        'file': findvalue[item].file, 'image': findvalue[item].image,
        'description': findvalue[item].description, 'likeNotes': findvalue[item].likeNotes.length,
        'notesUserLike': findLikeNote[0].likeNotes[0], 'userDetail': findvalue[item].userDetail
      }
    )
  }
  return newJsonData;
};

// change status
notesStatusChange = async (req) => {
  let findvalue = await Notes.findOneAndUpdate({ _id: req.body.id }, { isActive: req.body.isActive }, { new: true });
  return findvalue;
};


// like Notes status
likeNotes = async (req) => {
  var tokenValue = decodeToken(req.headers.authorization);
  var findvalue = await Notes.find({ _id: req.body.noteId });
  var findLikeNote = findvalue[0].likeNotes.findIndex(x => x.userId === tokenValue.id);
  if (findLikeNote == -1) {
    var returnValue = await Notes.updateOne({ _id: req.body.noteId }, { $push: { likeNotes: { userId: tokenValue.id, isActive: req.body.isActive } } }, { new: true });
  } else {
    // var returnValue = await Notes.findOneAndUpdate({'likeNotes._id' :findvalue[0].likeNotes[findLikeNote].id},{$set:{isActive:req.body.isActive}},{new:true});
    // console.log(findvalue);

    var returnValue = await Notes.updateOne(
      { _id: req.body.noteId, 'likeNotes._id': findvalue[0].likeNotes[findLikeNote].id },
      { $set: { "likeNotes.$.isActive": req.body.isActive } }
    )
    //    db.students.updateOne(
    //     { _id: 4, "grades.grade": 85 },
    //     { $set: { "grades.$.std" : 6 } }
    //  )
  }

  return returnValue;
};


// get like notes 
getLikeNotes = async (req) => {
  debugger
  var tokenValue = decodeToken(req.headers.authorization);
  console.log(tokenValue);

  let findvalue = await Notes.find();
  for (var item in findvalue) {
    console.log(findvalue[item].likeNotes)
  }
  newReturnData = {
    likeNotes: findvalue.length
  }
  console.log(newReturnData);

  return findvalue;
};


module.exports = {
  createUser, loginUser,
  forgotPassword, editProfile,
  getProfile, editProfileDetails,
  uploadNotes, uploadNotesImages,
  getAllNotes, notesStatusChange,
  likeNotes, getLikeNotes
};
