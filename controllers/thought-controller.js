const { Thought, User } = require('../models');

const thoughtController = {
  // Get all thoughts from database
  getAllThought(req, res) {
    Thought.find({})
      .sort({ _id: -1 })
      .then((thoughtData) => {
        res.json(thoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // Get thought by id
  getThoughtByID({ params }, res) {
    Thought.findById({ _id: params.id }).then((thoughtData) => {
      if (!thoughtData) {
        res
          .status(400)
          .json({ message: `No thought found with ID: ${params.id}` });
        return;
      }
      res.status(200).json(thoughtData);
    });
  },

  // Create new thought
  createThought({ params, body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: params.userid },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((userData) => {
        if (!userData) {
          res.status(404).json({
            message: `No Thought found with ID: ${params.userid}!`,
          });
          return;
        }
        res.json(userData);
      })
      .catch((err) => res.json(err));
  },

  //  Update thought by id
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    }).then((thoughtData) => {
      if (!thoughtData) {
        res.json({
          message: `No thought found with ID: ${params.id}`,
        });
      }
      res.status(200).json(thoughtData);
    });
  },

  // Delete Thought by ID
  deleteThought({ params }, res) {
    Thought.findByIdAndDelete({ _id: params.id }).then((thoughtData) => {
      if (!thoughtData) {
        res.status(404).json({
          message: `No Thought found with ID: ${params.id}!`,
        });
        return;
      }
      return User.findByIdAndUpdate(
        { _id: params.userid },
        { $pull: { thoughts: params.id } },
        { new: true }
      ).then((userData) => {
        if (!userData) {
          res.status(404).json({
            message: `No User found with id: ${params.userid}!`,
          });
          return;
        }
        res.status(200).json(userData);
      });
    });
  },

  // Create a reply
  createReply({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { 
        new: true, 
        runValidators: true 
      }
    )
      .then((thoughtData) => {
        if (!thoughtData) {
          res.status(404).json({
            message: `No Thought assoicated with ID: ${params.thoughtId}`,
          });
          return;
        }
        res.json(thoughtData);
      })
      .catch((err) => res.json(err));
  },

  // remove a reply
  deleteReply({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionID: params.id } } },
      { new: true }
    )
      .then((thoughtData) => res.json(thoughtData))
      .catch((err) => res.json(err));
  },
};

module.exports = thoughtController;