const mongoose = require("mongoose");
const { Schema } = mongoose;
const { MONGO_URL } = require("../database");

const connection = mongoose.createConnection(MONGO_URL);

const userSchema = new Schema({
  username: String,
  password: String,
  admin: Boolean,
});

const showreelSchema = new Schema({
  vimeoLink: String,
});

const videoSchema = new Schema({
  thumbnail: String,
  videoTitle: String,
  videoDescription: String,
  videoLink: String,
  positionId: Number,
});

const categorySchema = new Schema({
  positionId: Number,
  name: String,
});

const productionSchema = new Schema({
  categoryName: String,
  name: String,
  company: String,
  details: Array,
  positionId: Number,
});

const cvSchema = new Schema({
  uniqueFileName: String,
  url: String,
});

const iconSchema = new Schema({
  name: String,
  url: String,
});

const contactDetailsSchema = new Schema({
  type: String,
  name: String,
  description: String,
  positionId: Number,
  icon: Boolean,
});

const socialMediaSchema = new Schema({
  name: String,
  link: String,
  positionId: Number,
  icon: Boolean,
});

connection.model("users", userSchema);
connection.model("showreels", showreelSchema);
connection.model("videos", videoSchema);
connection.model("categories", categorySchema);
connection.model("productions", productionSchema);
connection.model("cvs", cvSchema);
connection.model("icons", iconSchema);
connection.model("contactDetails", contactDetailsSchema);
connection.model("socialMedia", socialMediaSchema);

module.exports = connection;
