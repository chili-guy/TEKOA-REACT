const bcrypt = require("bcryptjs");
const {
  getStore,
  readJsonBody,
  saveStore,
  sendJson,
  setAuthCookie,
  signToken,
  validateEmail,
} = require("./_store");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return sendJson(res, 405, { error: "Método não permitido." });
  }
  const { name, email, password } = await readJsonBody(req);
  if (!name || !email || !password) {
    return sendJson(res, 400, { error: "Preencha nome, e-mail e senha." });
  }
  if (!validateEmail(String(email))) {
    return sendJson(res, 400, { error: "Informe um e-mail válido." });
  }
  if (String(password).length < 6) {
    return sendJson(res, 400, { error: "A senha deve ter no mínimo 6 caracteres." });
  }
  const store = getStore();
  if (store.users.some((item) => item.email === email)) {
    return sendJson(res, 409, { error: "E-mail já cadastrado." });
  }
  const hash = await bcrypt.hash(String(password), 10);
  const user = {
    id: require("crypto").randomUUID(),
    name,
    email,
    password_hash: hash,
    created_at: new Date().toISOString(),
  };
  store.users.push(user);
  saveStore();
  const token = signToken({ userId: user.id });
  setAuthCookie(res, token);
  return sendJson(res, 200, { ok: true, userId: user.id });
};
