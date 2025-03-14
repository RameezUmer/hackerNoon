import mongoose from "mongoose";

const Schema = mongoose.Schema;

const activitySchema = new Schema({
    name: {
        type: String,
        required: true,
    },

    time: {
        type: String,
        required: true,
    }
});



export default mongoose.model("Activity", activitySchema);
