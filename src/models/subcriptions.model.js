import mongoose, {Schema} from "mongoose";

const subcriptionSchema = new Schema({
    subcriber: {
        type: Schema.Types.ObjectId,// one who has subcribed
        ref: "User"
    },
    channal: {
        type: Schema.Types.ObjectId,//one whom subcriber is subcribing
        ref: "User"
    }
}, {timestamps: true})

export const Subcription = mongoose.model("Subcription", subcriptionSchema)