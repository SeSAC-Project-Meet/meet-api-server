const DataTypes = require("sequelize").DataTypes;
const _area = require("./area");
const _badge = require("./badge");
const _chatroom = require("./chatroom");
const _inquiry = require("./inquiry");
const _mbti = require("./mbti");
const _meetroom = require("./meetroom");
const _message = require("./message");
const _message_user = require("./message_user");
const _spec = require("./spec");
const _tag = require("./tag");
const _term = require("./term");
const _user = require("./user");
const _user_badge = require("./user_badge");
const _user_blocked = require("./user_blocked");
const _user_chatroom = require("./user_chatroom");
const _user_meetroom = require("./user_meetroom");
const _user_spec = require("./user_spec");
const _user_tag = require("./user_tag");
const _user_term = require("./user_term");
const _user_token = require("./user_token");
const _user_usage_time = require("./user_usage_time");

function initModels(sequelize) {
  const area = _area(sequelize, DataTypes);
  const badge = _badge(sequelize, DataTypes);
  const chatroom = _chatroom(sequelize, DataTypes);
  const inquiry = _inquiry(sequelize, DataTypes);
  const mbti = _mbti(sequelize, DataTypes);
  const meetroom = _meetroom(sequelize, DataTypes);
  const message = _message(sequelize, DataTypes);
  const message_user = _message_user(sequelize, DataTypes);
  const spec = _spec(sequelize, DataTypes);
  const tag = _tag(sequelize, DataTypes);
  const term = _term(sequelize, DataTypes);
  const user = _user(sequelize, DataTypes);
  const user_badge = _user_badge(sequelize, DataTypes);
  const user_blocked = _user_blocked(sequelize, DataTypes);
  const user_chatroom = _user_chatroom(sequelize, DataTypes);
  const user_meetroom = _user_meetroom(sequelize, DataTypes);
  const user_spec = _user_spec(sequelize, DataTypes);
  const user_tag = _user_tag(sequelize, DataTypes);
  const user_term = _user_term(sequelize, DataTypes);
  const user_token = _user_token(sequelize, DataTypes);
  const user_usage_time = _user_usage_time(sequelize, DataTypes);

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
