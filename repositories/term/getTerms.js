const { Term } = require("../../models/index");

const getTerms = async () => {
  const terms = await Term.findAll({
    attributes: ["term_id", "title", "content", "is_required"],
  });

  return terms;
};

// getTerms().then((terms) => {
//   logger.info(terms.map((term) => term.dataValues));
// });

module.exports = getTerms;
