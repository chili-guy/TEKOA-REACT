const bcrypt = require("bcryptjs");
const {
  getStore,
  readJsonBody,
  sendJson,
  setAuthCookie,
  signToken,
} = require("./_store");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return sendJson(res, 405, { error: "Método não permitido." });
  }
  const { email, password } = await readJsonBody(req);
  if (!email || !password) {
    return sendJson(res, 400, { error: "Informe e-mail e senha." });
  }
  const store = getStore();
  const user = store.users.find((item) => item.email === email);
  if (!user) return sendJson(res, 401, { error: "Credenciais inválidas." });
  const ok = await bcrypt.compare(String(password), user.password_hash);
  if (!ok) return sendJson(res, 401, { error: "Credenciais inválidas." });
  const token = signToken({ userId: user.id });
  setAuthCookie(res, token);
  return sendJson(res, 200, { ok: true, userId: user.id });
};
