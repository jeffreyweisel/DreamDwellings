import { Route, Routes } from "react-router-dom";
import { AuthorizedRoute } from "./auth/AuthorizedRoute";
import Login from "./auth/Login";
import Register from "./auth/Register";
import HomeList from "./tickets/HomeList";
import HomeDetails from "./tickets/HomeDetails";
import Home from "./tickets/Home";
import UserHomes from "./tickets/UserHomes";
import UserSavedHomes from "./tickets/UserSavedHomes";
import CreateNewHomeForm from "./tickets/CreateNewHome";

export default function ApplicationViews({ loggedInUser, setLoggedInUser }) {
  return (
    <Routes>
      <Route path="/">
        <Route
          index
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <Home />
            </AuthorizedRoute>
          }
        />
        <Route path="homes">
          <Route
            index
            element={
              <AuthorizedRoute loggedInUser={loggedInUser}>
                <HomeList />
              </AuthorizedRoute>
            }
          />
          <Route
            path=":id"
            element={
              <AuthorizedRoute loggedInUser={loggedInUser}>
                <HomeDetails />
              </AuthorizedRoute>
            }
          />
          <Route
            path="create"
            element={
              <AuthorizedRoute loggedInUser={loggedInUser}>
                <CreateNewHomeForm />
              </AuthorizedRoute>
            }
          />
        </Route>
        <Route
            path="userhomes"
            element={
              <AuthorizedRoute loggedInUser={loggedInUser}>
                <UserHomes loggedInUser={loggedInUser}/>
              </AuthorizedRoute>
            }
          />
          <Route
            path="usersaves"
            element={
              <AuthorizedRoute loggedInUser={loggedInUser}>
                <UserSavedHomes loggedInUser={loggedInUser}/>
              </AuthorizedRoute>
            }
          />
        <Route
          path="login"
          element={<Login setLoggedInUser={setLoggedInUser} />}
        />
        <Route
          path="register"
          element={<Register setLoggedInUser={setLoggedInUser} />}
        />
      </Route>
      <Route path="*" element={<p>Whoops, nothing here...</p>} />
    </Routes>
  );
}