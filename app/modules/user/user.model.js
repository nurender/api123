/**
 * User model.
 */

var mongoose = require('mongoose');

// DeviceSchema = new mongoose.Schema({
//   os: {
//     type: String
//   },
//   token: {
//     type: String
//   },
//   latitude: {
//     type: String
//   },
//   longitude: {
//     type: String
//   }
// });

// mongoose.model('DeviceSchema', DeviceSchema);

UserSchema = new mongoose.Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  token: {
    type: String
  },
  image: {
    type: String
  },
  notesDetail: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Notes",
    required: true
  }]
},
  {
    timestamps: true
  });

module.exports = mongoose.model('Users', UserSchema);
