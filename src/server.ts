export const API_BASE_URL  = import.meta.env.VITE_API_BASE_URL
function apiUrl(path: string): string {
  return `${API_BASE_URL}${path}`;
}
export { apiUrl };