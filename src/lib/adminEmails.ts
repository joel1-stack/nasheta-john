const DEFAULT_ADMIN = "salvagekyalo@gmail.com"

export function getAllowedAdminEmails(): string[] {
  const raw = process.env.ADMIN_EMAILS || DEFAULT_ADMIN
  return [...new Set(raw.split(",").map((s) => s.trim().toLowerCase()).filter(Boolean))]
}

export function isAllowedAdmin(email: string): boolean {
  return getAllowedAdminEmails().includes(email.trim().toLowerCase())
}
