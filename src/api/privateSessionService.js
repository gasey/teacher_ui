import api from "./apiClient";

/**
 * Private Session API Service — Teacher UI
 * Uses shared authenticated api client.
 */

/* Teacher session lists */
export async function getSessions() {
  const res = await api.get("/private-sessions/teacher/sessions/");
  return res.data;
}

export async function getRequests() {
  const res = await api.get("/private-sessions/teacher/requests/");
  return res.data;
}

export async function getHistory() {
  const res = await api.get("/private-sessions/teacher/history/");
  return res.data;
}

/* Session detail */
export async function getSessionDetail(sessionId) {
  const res = await api.get(`/private-sessions/${sessionId}/`);
  return res.data;
}

/* Teacher actions on requests */
export async function acceptRequest(sessionId, data = {}) {
  const res = await api.post(`/private-sessions/${sessionId}/accept/`, data);
  return res.data;
}

export async function declineRequest(sessionId, reason = "") {
  const res = await api.post(`/private-sessions/${sessionId}/decline/`, { reason });
  return res.data;
}

export async function rescheduleRequest(sessionId, data) {
  const res = await api.post(`/private-sessions/${sessionId}/reschedule/`, data);
  return res.data;
}

/* Session lifecycle */
export async function startSession(sessionId) {
  const res = await api.post(`/private-sessions/${sessionId}/start/`);
  return res.data;
}

export async function endSession(sessionId) {
  const res = await api.post(`/private-sessions/${sessionId}/end/`);
  return res.data;
}

export async function cancelSession(sessionId, reason = "") {
  const res = await api.post(`/private-sessions/${sessionId}/cancel/`, { reason });
  return res.data;
}

/* LiveKit */
export async function getLiveKitToken(sessionId) {
  const res = await api.post(`/private-sessions/${sessionId}/join/`);
  return res.data;
}

/* Availability */
export async function getAvailability() {
  try {
    const res = await api.get("/private-sessions/teacher/availability/");
    return res.data;
  } catch {
    return {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
      sunday: [],
    };
  }
}

export async function saveAvailability(availability) {
  try {
    const res = await api.post("/private-sessions/teacher/availability/", availability);
    return res.data;
  } catch {
    console.warn("Availability endpoint not available yet.");
    return availability;
  }
}

export default {
  getSessions,
  getRequests,
  getHistory,
  getSessionDetail,
  acceptRequest,
  declineRequest,
  rescheduleRequest,
  startSession,
  endSession,
  cancelSession,
  getLiveKitToken,
  getAvailability,
  saveAvailability,
};