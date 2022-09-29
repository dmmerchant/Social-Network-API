const { Thought, User } = require('../models');

module.exports = {
    getThoughts(req, res) {
        Thought.find()
            .populate([
                'username',
                {
                    path: 'reactions',
                    populate: ['username']
                }
            ])
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },

    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .populate([
                'username',
                {
                    path: 'reactions',
                    populate: ['username']
                }
            ])
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body)
            const user = await User.findOneAndUpdate(
                { _id: req.body.username },
                { $addToSet: { thoughts: thought._id } },
                { new: true }
            );
            !user
                    ? res.status(404).json({
                        message: 'Thought created, but found no user with that ID',
                    })
                    : res.json({Thought: thought, User: user})
        }
        catch {
            (err) => {
                console.log(err);
                res.status(500).json(err);
            }
        }
    },

    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with this id!' })
                    : res.json(thought)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    async deleteThought(req, res) {
        try {
            var user
            const thought = await Thought.findOneAndRemove({ _id: req.params.thoughtId })
            !thought
                ? res.status(404).json({ message: 'No thought with this id!' })
                : user = await User.findOneAndUpdate(
                    { thoughts: req.params.thoughtId },
                    { $pull: { thoughts: req.params.thoughtId } },
                    { new: true }
                )
            !user
                ? res.status(404).json({
                    message: 'Thought deleted but no user with this id!',
                })
                : res.json({ message: 'Thought successfully deleted!' })
        }
        catch {
            (err) => {
                console.log(err);
                res.status(500).json(err);
            }
        }
    },

    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No reaction with this id!' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

    removeReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No reaction with this id!' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
};