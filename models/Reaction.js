const { Schema, Types } = require('mongoose');
const { format_date, format_time } = require('../utils/helpers');

const reactionSchema = new Schema({
    reactionId: { type: Schema.Types.ObjectId, default:  () => new Types.ObjectId()},
    reactionBody: { 
        type: String, 
        required: true, 
        min: [1,'Thought must be a minimum of 1 character.'],
        max: [280, 'Character length cannot exceed 280 characters.']
    },
    username: {type: Schema.Types.ObjectId, ref: 'user'},
    createdAt: { 
        type: Date, 
        default: Date.now, 
        get: format_time,
        required: true}
  });

module.exports = reactionSchema;
