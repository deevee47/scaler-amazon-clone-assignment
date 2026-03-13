export function getSessionId(): string {
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem("session-id");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("session-id", id);
  }
  return id;
}
