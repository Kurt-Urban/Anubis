import { useMutation, useQuery } from "@apollo/client";
import { createContext, useContext, useEffect, useState } from "react";
import { createUserMutation } from "@/mutations";
import { getUserQuery } from "@/queries";
import { supabase } from "utils/supabaseClient";

interface User {
  id: string;
  servers: object[];
  firstName: string;
  lastName: string;
  email: string;
}

export const UserContext = createContext<{
  user: User;
}>({
  user: {
    id: "",
    servers: [],
    firstName: "",
    lastName: "",
    email: "",
  },
});

const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState({
    id: "",
    servers: [],
    firstName: "",
    lastName: "",
    email: "",
  });

  const supaUser = supabase.auth.user();
  console.log(supaUser);

  const { error, data: getUserData } = useQuery(getUserQuery, {
    variables: { id: supaUser?.id },
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
                id: supaUser?.id,
                firstName: supaUser?.givenName,
                lastName: supaUser?.familyName,
                email: supaUser?.email,
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
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
