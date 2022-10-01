const { thought, user } = require('../models');

const thoughtController = {
  // Get All thoughts
  getAllThought(req, res) {
    thought.find({})
      .then((thoughtData) => {
        res.json(thoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  //   Get Thought by ID
  getThoughtByID({ params }, res) {
    thought.findById({ _id: params.id }).then((thoughtData) => {
      if (!thoughtData) {
        res
          .status(400)
          .json({ message: `No thought found with the ${params.id}` });
        return;
      }
      res.status(200).json(thoughtData);
    });
  },

  //   Create a Thought
  createThough({ params, body }, res) {
    thought.create(body)
      .then(({ _id }) => {
        return user.findOneAndUpdate(
          { _id: params.userid },
          // using the $push method to add the thought's _id to the specific user
          { $push: { thoughts: _id } },
          { new: true } //Returns the updated value of user
        );
      })
      .then((userData) => {
        if (!userData) {
          res.status(404).json({
            message: `No Thought found with this id = ${params.userid}!`,
          });
          return;
        }
        res.json(userData);
      })
      .catch((err) => res.json(err));
  },

  //  Update a Thought
  updateThought({ params, body }, res) {
    thought.findOneAndUpdate({ _id: params.id }, body, {
      //return the updated value
      new: true,
    }).then((thoughtData) => {
      if (!thoughtData) {
        res.json({
          message: `No thought found with the associated  id = ${params.id}`,
        });
      }
      res.status(200).json(thoughtData);
    });
  },

  // Delete a Thought
  deleteThought({ params }, res) {
    thought.findByIdAndDelete({ _id: params.id }).then((thoughtData) => {
      if (!thoughtData) {
        res.status(404).json({
          message: `No Thought found with this id = ${params.id}!`,
        });
        return;
      }
      return user.findByIdAndUpdate(
        { _id: params.userid },
        { $pull: { thoughts: params.id } },
        { new: true }
      ).then((userData) => {
        if (!userData) {
          res.status(404).json({
            message: `No User found with this id = ${params.userid}!`,
          });
          return;
        }
        res.status(200).json(userData);
      });
    });
  },
};

module.exports = thoughtController;