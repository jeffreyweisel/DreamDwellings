const apiUrl = "/api/hometype";

// Get home types
export const getHomeTypes = () => {
  return fetch(apiUrl).then((r) => r.json());
};
