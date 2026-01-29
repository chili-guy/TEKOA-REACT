const { getAuthPayload, getStore, sendJson } = require("./_store");

module.exports = async (req, res) => {
  if (req.method !== "GET") {
    return sendJson(res, 405, { error: "Método não permitido." });
  }
  const payload = getAuthPayload(req);
  if (!payload?.userId) {
    return sendJson(res, 401, { authenticated: false });
  }
  const store = getStore();
  const user = store.users.find((item) => item.id === payload.userId);
  if (!user) return sendJson(res, 401, { authenticated: false });
  return sendJson(res, 200, {
    authenticated: true,
    user: { id: user.id, name: user.name, email: user.email, isAdmin: false },
  });
};
