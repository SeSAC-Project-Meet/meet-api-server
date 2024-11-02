var DataTypes = require("sequelize").DataTypes;
var _area = require("./area");
var _badge = require("./badge");
var _chatroom = require("./chatroom");
var _inquiry = require("./inquiry");
var _mbti = require("./mbti");
var _meetroom = require("./meetroom");
var _message = require("./message");
var _message_user = require("./message_user");
var _spec = require("./spec");
var _tag = require("./tag");
var _term = require("./term");
var _user = require("./user");
var _user_badge = require("./user_badge");
var _user_blocked = require("./user_blocked");
var _user_chatroom = require("./user_chatroom");
var _user_meetroom = require("./user_meetroom");
var _user_spec = require("./user_spec");
var _user_tag = require("./user_tag");
var _user_term = require("./user_term");
var _user_token = require("./user_token");
var _user_usage_time = require("./user_usage_time");

function initModels(sequelize) {
  var area = _area(sequelize, DataTypes);
  var badge = _badge(sequelize, DataTypes);
  var chatroom = _chatroom(sequelize, DataTypes);
  var inquiry = _inquiry(sequelize, DataTypes);
  var mbti = _mbti(sequelize, DataTypes);
  var meetroom = _meetroom(sequelize, DataTypes);
  var message = _message(sequelize, DataTypes);
  var message_user = _message_user(sequelize, DataTypes);
  var spec = _spec(sequelize, DataTypes);
  var tag = _tag(sequelize, DataTypes);
  var term = _term(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);
  var user_badge = _user_badge(sequelize, DataTypes);
  var user_blocked = _user_blocked(sequelize, DataTypes);
  var user_chatroom = _user_chatroom(sequelize, DataTypes);
  var user_meetroom = _user_meetroom(sequelize, DataTypes);
  var user_spec = _user_spec(sequelize, DataTypes);
  var user_tag = _user_tag(sequelize, DataTypes);
  var user_term = _user_term(sequelize, DataTypes);
  var user_token = _user_token(sequelize, DataTypes);
  var user_usage_time = _user_usage_time(sequelize, DataTypes);

  user_badge.belongsTo(badge, { as: "badge", foreignKey: "badge_id"});
  badge.hasMany(user_badge, { as: "user_badges", foreignKey: "badge_id"});
  message.belongsTo(chatroom, { as: "chatroom", foreignKey: "chatroom_id"});
  chatroom.hasMany(message, { as: "messages", foreignKey: "chatroom_id"});
  user_chatroom.belongsTo(chatroom, { as: "chatroom", foreignKey: "chatroom_id"});
  chatroom.hasMany(user_chatroom, { as: "user_chatrooms", foreignKey: "chatroom_id"});
  user_meetroom.belongsTo(meetroom, { as: "meetroom", foreignKey: "meetroom_id"});
  meetroom.hasMany(user_meetroom, { as: "user_meetrooms", foreignKey: "meetroom_id"});
  message_user.belongsTo(message, { as: "message", foreignKey: "message_id"});
  message.hasMany(message_user, { as: "message_users", foreignKey: "message_id"});
  user_spec.belongsTo(spec, { as: "spec", foreignKey: "spec_id"});
  spec.hasMany(user_spec, { as: "user_specs", foreignKey: "spec_id"});
  user_tag.belongsTo(tag, { as: "tag", foreignKey: "tag_id"});
  tag.hasMany(user_tag, { as: "user_tags", foreignKey: "tag_id"});
  user_term.belongsTo(term, { as: "term", foreignKey: "term_id"});
  term.hasMany(user_term, { as: "user_terms", foreignKey: "term_id"});
  inquiry.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(inquiry, { as: "inquiries", foreignKey: "user_id"});
  message.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(message, { as: "messages", foreignKey: "user_id"});
  message_user.belongsTo(user, { as: "checked_user", foreignKey: "checked_user_id"});
  user.hasMany(message_user, { as: "message_users", foreignKey: "checked_user_id"});
  user_badge.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(user_badge, { as: "user_badges", foreignKey: "user_id"});
  user_blocked.belongsTo(user, { as: "opponent", foreignKey: "opponent_id"});
  user.hasMany(user_blocked, { as: "user_blockeds", foreignKey: "opponent_id"});
  user_blocked.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(user_blocked, { as: "user_user_blockeds", foreignKey: "user_id"});
  user_chatroom.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(user_chatroom, { as: "user_chatrooms", foreignKey: "user_id"});
  user_meetroom.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(user_meetroom, { as: "user_meetrooms", foreignKey: "user_id"});
  user_spec.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(user_spec, { as: "user_specs", foreignKey: "user_id"});
  user_tag.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(user_tag, { as: "user_tags", foreignKey: "user_id"});
  user_term.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(user_term, { as: "user_terms", foreignKey: "user_id"});
  user_token.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(user_token, { as: "user_tokens", foreignKey: "user_id"});
  user_usage_time.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(user_usage_time, { as: "user_usage_times", foreignKey: "user_id"});

  return {
    area,
    badge,
    chatroom,
    inquiry,
    mbti,
    meetroom,
    message,
    message_user,
    spec,
    tag,
    term,
    user,
    user_badge,
    user_blocked,
    user_chatroom,
    user_meetroom,
    user_spec,
    user_tag,
    user_term,
    user_token,
    user_usage_time,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
