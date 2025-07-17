 import mongoose from "mongoose";
 import bcrypt from "bcryptjs";



 const userSchema = new mongoose.Schema(
    {
      userName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
    },
    { timestamps: true } // ✅ This goes as the second argument
  );

// Hash the password before saving the user
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        } catch (error) {
        return next(error);
        }
    }
    next();
}
);
  const User=mongoose.model("User", userSchema);
  export default User;