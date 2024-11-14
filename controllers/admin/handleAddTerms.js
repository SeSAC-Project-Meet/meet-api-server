const Term = require("../../models/term.js");

const handleAddTerms = (req, res) => {
  const { title, content, is_required } = req.body;
  Term.create({ title, content, is_required })
    .then((term) => {
      return res.status(201).json(term.dataValues);
    })
    .catch((err) => {
      return res.status(400).json({ message: err.message });
    });
};

module.exports = handleAddTerms;
