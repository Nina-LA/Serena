const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const activitesSchema = new Schema({
    // document structure & rules defined here
    categorie: [{
      type: String,
      required: true,
    }],
    titre: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    }
  },
  {
    // additional settings for the Schema class
    timestamps: true
  }
);

// "User" model -> "users" collection
const Activites = mongoose.model("Activites", activitesSchema);

module.exports = Activites;
