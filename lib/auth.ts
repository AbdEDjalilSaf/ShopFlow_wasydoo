export function isAuthenticated(): boolean {
  // In a real app, this would check for a valid token
  // For demo purposes, we'll just check if there's any token
  if (typeof window !== "undefined") {
    return !!localStorage.getItem("token")
  }
  return false
}

export function isAdmin(): boolean {
  // In a real app, this would check if the user has admin role
  // For demo purposes, we'll just return true
  return true
}
