import { useMutation, useQuery } from "@apollo/client";
import { createContext, useContext, useEffect, useState } from "react";
import { createUser } from "../pages/api/mutations";
import { getUser } from "../pages/api/queries";

interface User {
  id: string;
  googleID: string;
  servers: object[];
  firstName: string;
  lastName: string;
  email: string;
}

export const UserContext = createContext<{
  user: User;
  googleUser: object;
  setGoogleUser: (googleUser: object) => void;
}>({
  user: {
    id: "",
    googleID: "",
    servers: [],
    firstName: "",
    lastName: "",
    email: "",
  },
  googleUser: {},
  setGoogleUser: (googleUser: object) => {},
});

const UserProvider: React.FC = ({ children }) => {
  const [googleUser, setGoogleUser] = useState({});
  const [user, setUser] = useState({
    id: "",
    googleID: "",
    servers: [],
    firstName: "",
    lastName: "",
    email: "",
  });

  const { error, data: getUserData } = useQuery(getUser, {
    variables: { id: googleUser?.profileObj?.googleId },
  });

  const [createUserMutation, { data: createUserData }] = useMutation(
    createUser,
    {
      onCompleted: () => console.log("User Created"),
      onError: () => console.log("Failed to create user"),
    }
  );

  useEffect(() => {
    if (getUserData) {
      setUser(getUserData?.getUser);
      console.log("Signed In");
    }
    if (createUserData) {
      setUser(createUserData?.createUser);
      console.log("Signed In");
    }
  }, [getUserData, createUserData]);

  const newUser = async () => {
    if (error) {
      console.log("Not Signed In");
      if (error.message.includes('type "User"')) {
        try {
          await createUserMutation({
            variables: {
              data: {
                googleID: googleUser?.profileObj?.googleId,
                firstName: googleUser?.profileObj?.givenName,
                lastName: googleUser?.profileObj?.familyName,
                email: googleUser?.profileObj?.email,
              },
            },
          });
        } catch (e) {
          console.error(e);
        }
      }
    }
  };

  useEffect(() => {
    if (error) newUser();
  }, [error]);

  return (
    <UserContext.Provider
      value={{
        user,
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
