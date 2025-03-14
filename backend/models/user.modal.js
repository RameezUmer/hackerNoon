import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    passwordResetOtp: {
        type: String,
      },
      passwordResetExpiry: {
        type: Date,
      },
    }, {
      timestamps: true,
    }
);


export default mongoose.model("UserModal", userSchema);
