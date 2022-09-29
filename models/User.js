const { Schema, model } = require('mongoose');

const validateEmail = (email) => {
  const re = /^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/;
  return re.test(email);
};

// Schema to create Post model
const userSchema = new Schema(
  {
    username: { type: String, unique: true, required: true, trim: true },
    email: { 
        type: String, 
        unique: true, 
        required: false, 
        validate: {
          validator: function(v) {
            return /^.+@(?:[\w-]+\.)+\w+$/.test(v);
          },
          message: props => `${props.value} is not a valid email`
        }
    },
    thoughts:  [{ type: Schema.Types.ObjectId, ref: 'thought' }],
    friends:  [{ type: Schema.Types.ObjectId, ref: 'user' }],
    lastAccessed: { type: Date, default: Date.now }
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);


userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

// Initialize our Post model
const User = model('user', userSchema);

module.exports = User;