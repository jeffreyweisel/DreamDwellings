const apiUrl = "/api/home";

// Get homes
export const getHomes = () => {
  return fetch(apiUrl).then((r) => r.json());
};

// Get home by Id
export const getHome = (id) => {
  return fetch(`${apiUrl}/${id}`).then((r) => r.json());
};

// Add new home to system
export const addHome = (home) => {
  return fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(home),
  }).then((res) => res.json());
};

// Add a user save to system
export const createUserSave = (homeId, userId) => {
  return fetch(`${apiUrl}/${homeId}/save?userId=${userId}`, {
    method: "POST",
  });
};

// Remove a user save
export const removeUserSave = (homeId, userId) => {
  return fetch(`${apiUrl}/${homeId}/unsave?userId=${userId}`, {
    method: "POST",
  });
};

// Purchase a home
export const purchaseHome = (homeId, userId) => {
  return fetch(`${apiUrl}/${homeId}/sold?userId=${userId}`, {
    method: "PUT",
  });
};

// List home that user owns for sale
export const listHome = (homeId) => {
  return fetch(`${apiUrl}/${homeId}/list`, {
    method: "PUT",
  });
};

// Edit the price of a home
export const editHome = (homeId, editedPrice) => {
  return fetch(`${apiUrl}/${homeId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ Id: homeId, Price: editedPrice }),
  });
};



// Delete home from database
export const deleteHome = (homeId) => {
  return fetch(`${apiUrl}/${homeId}`, {
    method: "DELETE",
  });
};