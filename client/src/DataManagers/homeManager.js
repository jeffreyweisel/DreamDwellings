const apiUrl = "/api/home";

// Get homes
export const getHomes = () => {
  return fetch(apiUrl).then((r) => r.json());
};

// Get home by Id
export const getHome = (id) => {
  return fetch(`${apiUrl}/${id}`).then((r) => r.json());
};

// Add new home to the system
export const addHome = (home) => {
  return fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(home),
  }).then((res) => res.json());
};