const sessions = new Map();

export const getSession = (id: string) => {
  if (!sessions.has(id)) sessions.set(id, {});
  return sessions.get(id);
};

export const updateSession = (id: string, data: any) => {
  const s = getSession(id);
  sessions.set(id, { ...s, ...data });
};