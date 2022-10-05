const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: 'Username is required',
      trim: true,
    },
    email: {
      type: String,
      required: 'Enter email in valid format',
      unique: true,
      validate: {
        validator: (email) => {
          return new RegExp(
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
          ).test(email);
        },
      },
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought',
        },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Count friends 
userSchema.virtual('friendCount').get(function () {
  return this.friends && this.friends.length ? this.friends.length : 0;
});

const User = model('User', userSchema);

module.exports = User;