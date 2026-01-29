const crypto = require("crypto");
const fs = require("fs");

const COOKIE_NAME = "tc_auth";
const COOKIE_MAX_AGE = 7 * 24 * 60 * 60;
const TOKEN_SECRET = process.env.TOKEN_SECRET || "change-me";
const DATA_PATH = "/tmp/tekoa-db.json";

const defaultStore = () => ({
  users: [],
  packages: [],
  psychologists: [],
  appointments: [],
});

let memoryStore = null;

function sendJson(res, status, data) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(data));
}

function readJsonBody(req) {
  return new Promise((resolve) => {
    let raw = "";
    req.on("data", (chunk) => {
      raw += chunk;
    });
    req.on("end", () => {
      if (!raw) return resolve({});
      try {
        resolve(JSON.parse(raw));
      } catch {
        resolve({});
      }
    });
  });
}

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

function getAuthPayload(req) {
  const token = getAuthToken(req);
  return token ? verifyToken(token) : null;
}

function validateEmail(email) {
  return /^\S+@\S+\.\S+$/.test(email);
}

module.exports = {
  COOKIE_NAME,
  clearAuthCookie,
  getAuthPayload,
  getStore,
  readJsonBody,
  saveStore,
  sendJson,
  setAuthCookie,
  signToken,
  validateEmail,
};
