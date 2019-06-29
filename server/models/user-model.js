const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const userSchema = new Schema({
    // document structure & rules defined here
    username: {
      type: String,
      required: true,
      minlength: 2
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^.+@.+\..+$/
    },
    encryptedPassword: { 
      type: String, 
      required: true 
    },
    Categories: [
      { 
        type: String
      }
    ],
    ActivitiesDone: [
      {
        Categorie: { 
          type: String, 
          required: true 
        },
        Activity: { 
          type: String, 
          required: true 
        },
        HumeurDebut: { 
          type: Number, 
          required: true 
        },
        HumeurFin: { 
          type: Number, 
          required: true 
        }            
      }
    ]
  },
  {
    // additional settings for the Schema class
    timestamps: true
  }
);

// "User" model -> "users" collection
const User = mongoose.model("User", userSchema);

module.exports = User;
