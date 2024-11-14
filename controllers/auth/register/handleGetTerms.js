const getTerms = require("../../../repositories/term/getTerms");

const handleGetTerms = async (req, res) => {
  const terms = await getTerms();
  res.status(200).json(terms.map((term) => term.dataValues));
};

module.exports = handleGetTerms;
