import { useMutation, useQuery } from "@apollo/client";
import { createContext, useContext, useEffect, useState } from "react";
import { createUserMutation } from "@/mutations";
import { getUserQuery } from "@/queries";

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

  const { error, data: getUserData } = useQuery(getUserQuery, {
    variables: { id: googleUser?.profileObj?.googleId },
  });

  const [createUser, { data: createUserData }] = useMutation(
    createUserMutation,
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
      if (error.message.includes('type "User"')) {
        try {
          await createUser({
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

export default UserProvider;
