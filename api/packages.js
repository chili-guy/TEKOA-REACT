const { getStore, sendJson } = require("./_store");

module.exports = async (req, res) => {
  if (req.method !== "GET") {
    return sendJson(res, 405, { error: "Método não permitido." });
  }
  const store = getStore();
  return sendJson(res, 200, store.packages);
};
