const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({
  street: String,
  place: String
});
const UserSchema = new mongoose.Schema({
  name: String,
  age: {
    type: Number,
    min: 1,
    max: 100,
    validate: {
      validator: v => v % 2 === 0,
      message: props => `${props.value} is not an even number`
    }
  },
  email: {
    type: String,
    required: true,
    minlength: 8,
    lowercase: true
  },
  createdAt: {
    type: Date,
    default: () => new Date(),
    immutable: true
  },
  updatedAt: {
    type: Date,
    default: () => new Date()
  },
  bestFriend: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User" // specify the colletion name where id belongs to
  },
  hobbies: [String],
  address: AddressSchema
});

module.exports = mongoose.model("User", UserSchema);
