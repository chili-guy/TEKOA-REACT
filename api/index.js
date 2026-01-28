const crypto = require("crypto");
const fs = require("fs");
const express = require("express");
const bcrypt = require("bcryptjs");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const COOKIE_NAME = "tc_auth";
const COOKIE_MAX_AGE = 7 * 24 * 60 * 60; // 7 days in seconds
const TOKEN_SECRET = process.env.TOKEN_SECRET || "change-me";
const DATA_PATH = "/tmp/tekoa-db.json";

const defaultStore = () => ({
  users: [],
  packages: [],
  psychologists: [],
  appointments: [],
});

let memoryStore = null;

function getStore() {
  if (memoryStore) return memoryStore;
  if (!fs.existsSync(DATA_PATH)) {
    memoryStore = defaultStore();
    seedStore(memoryStore);
    saveStore();
    return memoryStore;
  }
  try {
    const raw = fs.readFileSync(DATA_PATH, "utf-8");
    memoryStore = { ...defaultStore(), ...JSON.parse(raw) };
  } catch {
    memoryStore = defaultStore();
    seedStore(memoryStore);
  }
  return memoryStore;
}

function saveStore() {
  if (!memoryStore) return;
  fs.writeFileSync(DATA_PATH, JSON.stringify(memoryStore, null, 2));
}

function seedStore(store) {
  if (!store.packages.length) {
    store.packages = [
      { code: "single", sessions: 1, price_cents: 9000, discount_cents: 0 },
      { code: "trio", sessions: 3, price_cents: 24000, discount_cents: 3000 },
      { code: "premium", sessions: 8, price_cents: 56000, discount_cents: 8000 },
    ];
  }
  if (!store.psychologists.length) {
    store.psychologists = [
      {
        id: crypto.randomUUID(),
        name: "Dra. Ana Silva",
        title: "Psicóloga intercultural",
        price_cents: 9000,
        rating: 4.9,
        bio: "Atendimento humanizado para imigrantes.",
        tags: ["Ansiedade", "Adaptação cultural"],
        image_url: null,
      },
      {
        id: crypto.randomUUID(),
        name: "Dr. Miguel Costa",
        title: "Psicólogo clínico",
        price_cents: 8500,
        rating: 4.8,
        bio: "Foco em estresse e integração.",
        tags: ["Estresse", "Família"],
        image_url: null,
      },
    ];
  }
}

function signToken(payload) {
  const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString(
    "base64url"
  );
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const data = `${header}.${body}`;
  const signature = crypto.createHmac("sha256", TOKEN_SECRET).update(data).digest("base64url");
  return `${data}.${signature}`;
}

function verifyToken(token) {
  const [header, body, signature] = token.split(".");
  if (!header || !body || !signature) return null;
  const data = `${header}.${body}`;
  const expected = crypto.createHmac("sha256", TOKEN_SECRET).update(data).digest("base64url");
  if (expected !== signature) return null;
  try {
    return JSON.parse(Buffer.from(body, "base64url").toString("utf-8"));
  } catch {
    return null;
  }
}

function getAuthToken(req) {
  const cookie = req.headers.cookie || "";
  const match = cookie.match(new RegExp(`${COOKIE_NAME}=([^;]+)`));
  return match ? match[1] : null;
}

function setAuthCookie(res, token) {
  const secure = process.env.NODE_ENV === "production" ? " Secure;" : "";
  res.setHeader(
    "Set-Cookie",
    `${COOKIE_NAME}=${token}; Path=/; Max-Age=${COOKIE_MAX_AGE}; HttpOnly; SameSite=Lax;${secure}`
  );
}

function clearAuthCookie(res) {
  res.setHeader("Set-Cookie", `${COOKIE_NAME}=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax`);
}

function requireAuth(req, res, next) {
  const token = getAuthToken(req);
  const payload = token ? verifyToken(token) : null;
  if (!payload?.userId) {
    return res.status(401).json({ error: "Faça login para continuar." });
  }
  req.userId = payload.userId;
  return next();
}

app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

app.post("/api/register", async (req, res) => {
  const { name, email, password } = req.body || {};
  if (!name || !email || !password) {
    return res.status(400).json({ error: "Preencha nome, e-mail e senha." });
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ error: "Informe um e-mail válido." });
  }
  if (String(password).length < 6) {
    return res.status(400).json({ error: "A senha deve ter no mínimo 6 caracteres." });
  }
  const store = getStore();
  if (store.users.some((item) => item.email === email)) {
    return res.status(409).json({ error: "E-mail já cadastrado." });
  }
  const hash = await bcrypt.hash(password, 10);
  const user = {
    id: crypto.randomUUID(),
    name,
    email,
    password_hash: hash,
    created_at: new Date().toISOString(),
  };
  store.users.push(user);
  saveStore();
  const token = signToken({ userId: user.id });
  setAuthCookie(res, token);
  return res.json({ ok: true, userId: user.id });
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ error: "Informe e-mail e senha." });
  }
  const store = getStore();
  const user = store.users.find((item) => item.email === email);
  if (!user) return res.status(401).json({ error: "Credenciais inválidas." });
  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) return res.status(401).json({ error: "Credenciais inválidas." });
  const token = signToken({ userId: user.id });
  setAuthCookie(res, token);
  return res.json({ ok: true, userId: user.id });
});

app.post("/api/logout", (req, res) => {
  clearAuthCookie(res);
  res.json({ ok: true });
});

app.get("/api/me", (req, res) => {
  const token = getAuthToken(req);
  const payload = token ? verifyToken(token) : null;
  if (!payload?.userId) {
    return res.status(401).json({ authenticated: false });
  }
  const store = getStore();
  const user = store.users.find((item) => item.id === payload.userId);
  if (!user) return res.status(401).json({ authenticated: false });
  return res.json({
    authenticated: true,
    user: { id: user.id, name: user.name, email: user.email, isAdmin: false },
  });
});

app.get("/api/packages", (req, res) => {
  const store = getStore();
  res.json(store.packages);
});

app.get("/api/psychologists", (req, res) => {
  const store = getStore();
  res.json(store.psychologists);
});

app.get("/api/appointments", requireAuth, (req, res) => {
  const store = getStore();
  const items = store.appointments.filter((item) => item.user_id === req.userId);
  res.json(items);
});

app.post("/api/appointments", requireAuth, (req, res) => {
  const { psychologistId, scheduledAt, packageCode } = req.body || {};
  if (!psychologistId || !scheduledAt || !packageCode) {
    return res
      .status(400)
      .json({ error: "Informe psicólogo, data e pacote para agendar." });
  }
  const scheduledDate = new Date(scheduledAt);
  if (Number.isNaN(scheduledDate.getTime())) {
    return res.status(400).json({ error: "Data de agendamento inválida." });
  }
  const store = getStore();
  const psychologist = store.psychologists.find((item) => item.id === psychologistId);
  if (!psychologist) return res.status(404).json({ error: "Psicólogo não encontrado." });
  const pack = store.packages.find((item) => item.code === packageCode);
  if (!pack) return res.status(404).json({ error: "Pacote não encontrado." });
  const appointment = {
    id: crypto.randomUUID(),
    user_id: req.userId,
    psychologist_id: psychologistId,
    scheduled_at: scheduledDate.toISOString(),
    duration_minutes: 50,
    status: "scheduled",
    package_code: packageCode,
    created_at: new Date().toISOString(),
  };
  store.appointments.push(appointment);
  saveStore();
  res.json({ ok: true, appointmentId: appointment.id });
});

module.exports = app;
