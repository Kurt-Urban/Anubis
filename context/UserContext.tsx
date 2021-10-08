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

  const { error, data } = useQuery(getUser, {
    variables: { id: googleUser?.profileObj?.googleId },
  });

  const [createUserMutation, { loading }] = useMutation(createUser, {
    onCompleted: () => console.log("Mutation complete"),
    onError: () => console.log("MutationFailed"),
  });

  if (error) {
    console.error(error);
    if (
      error.message.includes(
        'Could not find any entity of type "User" matching'
      )
    ) {
      try {
        createUserMutation({
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

  useEffect(() => {
    if (data) setUser(data?.getUser);
  }, [data]);

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
