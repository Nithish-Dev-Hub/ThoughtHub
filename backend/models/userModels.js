import mongoose from 'mongoose';
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
    {
      name: {
          type: String,
          required: true,
      },
      phone: {
          type: Number,
          required: false,
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
    {
          timestamps: true,
    }
);

// Encrypt password using bcrypt before saving it in the db
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
      next();
    }
  
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;