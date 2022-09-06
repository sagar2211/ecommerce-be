const { User } = require("../model/userModel");
var _ = require('lodash');
const multer = require("multer");

var storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "public/upload_images/");
    },
    filename: (req, file, callback) => {
        const match = ["image/png", "image/jpeg"];
        if (match.indexOf(file.mimetype) === -1) {
            var message = `${file.originalname} is invalid. Only accept png/jpeg.`;
            return callback(message, null);
        }
        var filename = `${Date.now()}-${file.originalname}`;
        callback(null, filename);
    },
});
var uploadProfile = multer({ storage: storage }).single("profile-upload");


// create new user
exports.createNewUser = async (req, res) => {
    console.log(req.body)
    const newUser = new User(req.body);
    try {
        let isExist = await isUserAlreadyExist(req.body.email)
        if (_.isEmpty(isExist)) {
            const data = await newUser.save();
            let obj = {
                success: true,
                data: data,
                message: "User created successfully.."
            }
            res.send(obj);
        } else {
            let obj = {
                message: "User already Exists.",
                success: false
            }
            res.send(obj);
        }

    } catch (err) {
        res.send(err)
    }
}

// update user
// update user
exports.updateUser = async (req, res) => {
    var updateObject = req.body;
    try {
        let id = req.body._id;

        let data = await User.findByIdAndUpdate(id,
            {
                $set: {
                    "firstname": updateObject.firstname,
                    "lastname": updateObject.lastname,
                    "email": updateObject.email,
                    "phone": updateObject.phone,
                    "image": updateObject.image
                }
            },
            { new: true })
        res.status(200).send(data);
        console.log(data);
    } catch (error) {
        res.status(400).send(error);
        console.log(error);
    }
}

// delete user
exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        let responseObj = {
            error: false,
            message: "data deleted successfully...!!!"
        }
        res.send(responseObj);
    } catch (error) {
        res.send(error)
    }
}

// get all user
exports.getAllUser = async (req, res) => {
    try {
        const data = await User.find();
        console.log('data', data);
        res.send(data);
    } catch (err) {
        res.send(err);
    }
}

// get user info
exports.getUser = async (req, res) => {
    try {
        const data = await User.findById(req.params.id);
        console.log('data', data);
        res.send(data);
    } catch (err) {
        res.send(err);
    }
}

async function isUserAlreadyExist(email) {
    try {
        const data = await User.find({ email: email });
        console.log('data', data);
        return data
    } catch (err) {
        console.log(err);
    }
}

exports.uploadProfilePic = (req, res) => {
    uploadProfile(req, res, async (err) => {
        var files_obj = req.file;
        console.log(files_obj);
        res.send(files_obj);
    });
};