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

//In mongoose we can't use arrow function
// add instance method
UserSchema.methods.sayHi = function () {
  console.log(`Hi My name is ${this.name}  `);
};

//static method => overall model method
UserSchema.statics.findByName = function (name) {
  //where can also take syntax as find ..
  return this.where({ name: new RegExp(name, "i") });
  //or return this.find({ name: new RegExp(name, "i") });
};

UserSchema.query.byName = function (name) {
  return this.where({ name: new RegExp(name, "i") });
};

//virtual is custom property for user schema but it actuall won't be there in database
UserSchema.virtual("namedEmail").get(function () {
  return `${this.name} <${this.email}>`;
});
module.exports = mongoose.model("User", UserSchema);
