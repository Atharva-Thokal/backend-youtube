import mongoose, {Schema} from "mongoose";

const subcriptionSchema = new Schema({
    subscriber: {
        type: Schema.Types.ObjectId,// one who has subcribed
        ref: "User"
    },
    channel: {
        type: Schema.Types.ObjectId,//one whom subcriber is subcribing
        ref: "User"
    }
}, {timestamps: true})

export const Subscription = mongoose.model("Subscription", subcriptionSchema)