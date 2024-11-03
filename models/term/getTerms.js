const Term = require("../define/Term.js");

const getTerms = async () => {
  const terms = await Term.findAll({
    attributes: ["term_id", "title", "content"],
  });

  return terms;
};

// getTerms().then((terms) => {
//   console.log(terms.map((term) => term.dataValues));
// });

module.exports = getTerms;
