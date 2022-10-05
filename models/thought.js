const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const reactionSchema = new Schema(
  {
    // replies to thoughts requirements 
    reactionID: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      require: true,
      min: 1,
      max: 250,
    },
    username: {
      type: String,
      required: true,
    },
    created: {
      type: Date,
      default: Date.now(),
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
  },
  {
    toJSON: {},
  }
);

const thoughtSchema = new Schema(
  {
    // requirments for thoughts
    thoughtText: {
      type: String,
      required: true,
      min: 1,
      max: 280,
    },
    created: {
      type: Date,
      default: Date.now(),
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
    username: {
      type: String,
      required: true,
    },
    // replies and thoughts linked
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// Count number of replies per thought with virtual
thoughtSchema.virtual('reactionCount ').get(function () {
  return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;