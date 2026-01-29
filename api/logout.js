const { clearAuthCookie, sendJson } = require("./_store");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return sendJson(res, 405, { error: "Método não permitido." });
  }
  clearAuthCookie(res);
  return sendJson(res, 200, { ok: true });
};
