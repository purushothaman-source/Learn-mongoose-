const User = require("./model/User");
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb://localhost/learnmongoose",
  () => {
    console.log("connected");
  },
  e => {
    console.log(e);
  }
);

const run = async () => {
  try {
    let user = await User.create({
      name: "purushoth",
      email: "puvdcd@gmail.com"
    });

    console.log(user);
    //if we try to update createdAt it will just omit this because it is immutable property
    user.createdAt = 5;
    user.save();

    // model will run only when we use create and save method
    //while update it will skip validation
  } catch (error) {
    console.log(error.message);
  }
};
const update = async () => {
  // never use updateOne ,updateMany , findbyIdandupdate because it will skip validation
  //use findbyid or find({name:"purushoth"})
  try {
    let exist = await User.exists({
      name: "purushoth"
    });
    if (exist) {
      let user = await User.findOne({
        name: "purushoth"
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};
const deleteItem = async () => {
  try {
    let user = await User.deleteOne({
      name: "purushoth"
    });
    console.log(user);
  } catch (error) {
    console.log(error.message);
  }
};
const learnQuery = async () => {
  //If find method is confusing we can use query
  try {
    //it will return all values which has name purushoth
    const user = await User.where("name").equals("Purushoth").limit(1);
    user[0].bestFrienfd = "61f4e137aaff272f3c38ef50";
    await user.save();
    const filter1 = await User.where("age").gt(18);
    const filter2 = await User.where("age")
      .gt(18)
      .lt(60)
      .where("name")
      .equals("purushoth")
      .limit(2)
      .select("age"); // select will user to only select certain fields
    //when  you fetch the user it will only return id for bestfriend friend ..you have to use populate to get details of best friend
    //populate method is similar to join in sql
    const filter3 = await User.where("name")
      .equals("Purushoth")
      .populate("bestFriend")
      .limit(1);

    console.log(user);
  } catch (error) {}
};
// run();
// update();
//learnQuery();
