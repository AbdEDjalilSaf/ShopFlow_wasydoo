// Alternative: More robust cookie utility functions
export const cookieUtils = {
  // Set a cookie
  set: (name: string, value: string, days = 7) => {
    if (typeof window === "undefined") return

    const expires = new Date()
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)

    document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/; secure; samesite=strict`
  },

  // Get a cookie by name
  get: (name: string): string | null => {
    if (typeof window === "undefined") return null

    const nameEQ = name + "="
    const cookies = document.cookie.split(";")

    for (let cookie of cookies) {
      cookie = cookie.trim()
      if (cookie.indexOf(nameEQ) === 0) {
        return cookie.substring(nameEQ.length)
      }
    }

    return null
  },

  // Remove a cookie
  remove: (name: string) => {
    if (typeof window === "undefined") return

    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
  },

  // Get all cookies as an object
  getAll: (): Record<string, string> => {
    if (typeof window === "undefined") return {}

    const cookies: Record<string, string> = {}

    document.cookie.split(";").forEach((cookie) => {
      const [name, value] = cookie.trim().split("=")
      if (name && value) {
        cookies[name] = value
      }
    })

    return cookies
  },
}
