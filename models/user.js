import mongoose from "mongoose";
var userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    cource: {
      type: String,
      required: true,
    },
    city: {
        type: String,
        required: true,
    },
  },

  {
    timestamps: true,
  }
);



const User = mongoose.model("User", userSchema);

export default User;
