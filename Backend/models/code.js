constUserSchema = mongoose.Schema({
  uid: {
    type: String,
    required: true,
    index: true,
  },

  code: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const User = mongoose.model("Product", UserSchema);

export default User;
