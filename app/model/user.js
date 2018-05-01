'use strict'
// User has id, username,password,email,phone,role,createTime, updateTime
module.exports = app => {
    const mongoose = app.mongoose;
    const UserSchema = new mongoose.Schema({
        //uid: { type: Number, unique: true },
        username: { type: String, required: true},
        password: { type: String, required: true },
        email: { type: String },
        mobile: { type: String },
        role: { type: String, required: true }
    });
    
    return mongoose.model('User', UserSchema);

}