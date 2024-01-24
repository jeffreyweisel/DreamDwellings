const _apiUrl = "/api/auth";

export const login = (email, password) => {
  return fetch(_apiUrl + "/login", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      Authorization: `Basic ${btoa(`${email}:${password}`)}`,
    },
  }).then((res) => {
    if (res.status !== 200) {
      return Promise.resolve(null);
    } else {
      return tryGetLoggedInUser();
    }
  });
};

export const logout = () => {
  return fetch(_apiUrl + "/logout")
    .then((res) => {
      if (!res.ok) {
        // Handle error response, log, or throw an error
        throw new Error(`Logout failed with status: ${res.status}`);
      }
    });
};


export const tryGetLoggedInUser = () => {
  return fetch(_apiUrl + "/me")
    .then((res) => {
      if (res.status === 401) {
        return null;  // User is not authenticated
      } else if (!res.ok) {
        throw new Error(`Error fetching logged-in user: ${res.status}`);
      }
      return res.json();
    });
};


export const register = (userProfile) => {
  userProfile.password = btoa(userProfile.password);
  return fetch(_apiUrl + "/register", {
    credentials: "same-origin",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userProfile),
  }).then(() => tryGetLoggedInUser());
};