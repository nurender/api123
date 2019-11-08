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

UserNotestSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    subTitle: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    file: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    userDetail: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    image: {
        type: String,
    },
    isActive: {
        type: Boolean,
        default: false
    },
    likeNotes: [
        {
            userId: {
                type: String
            },
            isActive: {
                type: Boolean,
                default: false
            }
        }
    ]
}, {
        timestamps: true
    }
);

module.exports = mongoose.model('Notes', UserNotestSchema);
