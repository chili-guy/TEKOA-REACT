const { sendJson } = require("./_store");

module.exports = async (req, res) => {
  return sendJson(res, 200, { ok: true });
};
