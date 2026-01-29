const {
  getAuthPayload,
  getStore,
  readJsonBody,
  saveStore,
  sendJson,
} = require("./_store");

function requireAuth(req) {
  const payload = getAuthPayload(req);
  if (!payload?.userId) return null;
  return payload;
}

module.exports = async (req, res) => {
  const payload = requireAuth(req);
  if (!payload) {
    return sendJson(res, 401, { error: "Faça login para continuar." });
  }
  const store = getStore();

  if (req.method === "GET") {
    const items = store.appointments.filter((item) => item.user_id === payload.userId);
    return sendJson(res, 200, items);
  }

  if (req.method === "POST") {
    const { psychologistId, scheduledAt, packageCode } = await readJsonBody(req);
    if (!psychologistId || !scheduledAt || !packageCode) {
      return sendJson(res, 400, {
        error: "Informe psicólogo, data e pacote para agendar.",
      });
    }
    const scheduledDate = new Date(scheduledAt);
    if (Number.isNaN(scheduledDate.getTime())) {
      return sendJson(res, 400, { error: "Data de agendamento inválida." });
    }
    const psychologist = store.psychologists.find((item) => item.id === psychologistId);
    if (!psychologist) {
      return sendJson(res, 404, { error: "Psicólogo não encontrado." });
    }
    const pack = store.packages.find((item) => item.code === packageCode);
    if (!pack) {
      return sendJson(res, 404, { error: "Pacote não encontrado." });
    }
    const appointment = {
      id: require("crypto").randomUUID(),
      user_id: payload.userId,
      psychologist_id: psychologistId,
      scheduled_at: scheduledDate.toISOString(),
      duration_minutes: 50,
      status: "scheduled",
      package_code: packageCode,
      created_at: new Date().toISOString(),
    };
    store.appointments.push(appointment);
    saveStore();
    return sendJson(res, 200, { ok: true, appointmentId: appointment.id });
  }

  return sendJson(res, 405, { error: "Método não permitido." });
};
