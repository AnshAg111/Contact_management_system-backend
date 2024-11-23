const mongoose = require("mongoose");
const Joi = require("joi");
// const { type } = require("server/reply");

const ContactSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: [true, "name is required."],
  },
  last_name: {
    type: String,
    required: [true, "lastname is required."],
  },
  email: {
    type: String,
    required: [true, "email is required."],
  },
  phone: {
    type: Number,
    required: [true, "phone number is required."],
  },
  company: {
    type: String,
    required:[true, "company name required."],
  },
  job_title:{
    type: String,
    required:[true, "what is your job title?"],
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Contact = new mongoose.model("Contact", ContactSchema);

const validateContact = (data) => {
  const schema = Joi.object({
    // name: Joi.string().min(4).max(50).required(),
    // address: Joi.string().min(4).max(100).required(),
    email: Joi.string().email().required(),
    phone: Joi.number().min(7).max(10000000000).required(),
    company: Joi.string(),
    first_name: Joi.string(),
    job_title: Joi.string(),
    last_name: Joi.string(),
  });

  return schema.validate(data);
};

module.exports = {
  validateContact,
  Contact,
};