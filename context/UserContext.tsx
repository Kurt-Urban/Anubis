import { useQuery } from "@apollo/client";
import axios from "axios";
import { createContext, useContext, useState } from "react";
import getUser from "../pages/api/queries/getUser";
import getUsers from "../pages/api/queries/getUsers";

interface User {
  id: string;
  googleID: string;
  servers: object[];
  firstName: string;
  lastName: string;
}

export const UserContext = createContext({
  googleUser: {},
  setGoogleUser: (googleUser: object) => {},
});

const UserProvider: React.FC = ({ children }) => {
  const [googleUser, setGoogleUser] = useState({});
  const [user, setUser] = useState({});

  const { error, data } = useQuery(getUsers);
  if (error) console.log(error);
  console.log(data);

  return (
    <UserContext.Provider
      value={{
        googleUser,
        setGoogleUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export function useAppContext() {
  return useContext(UserContext);
}

export default UserProvider;
