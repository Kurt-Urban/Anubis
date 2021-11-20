import { useMutation, useQuery } from "@apollo/client";
import { createContext, useContext, useEffect, useState } from "react";
import { createUserMutation } from "@/mutations";
import { getUserQuery } from "@/queries";
import { supabase } from "utils/supabaseClient";

interface User {
  id: string;
  servers?: object[];
  firstName: string;
  lastName: string;
  email: string;
}

export const UserContext = createContext<{
  user: User;
  signUp: (input: object) => void;
  signIn: (input: object) => void;
}>({
  user: {
    id: "",
    servers: [],
    firstName: "",
    lastName: "",
    email: "",
  },
  signUp: () => {},
  signIn: () => {},
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
  const { data: userData } = useQuery(getUserQuery, {
    variables: { id: supaUser?.id },
    skip: !supaUser,
    onError: (error) => console.error(error),
  });

  const [createUser, { data: createUserData }] = useMutation(
    createUserMutation,
    {
      onCompleted: () => console.log("User Created"),
      onError: () => console.log("Failed to create user"),
    }
  );

  useEffect(() => {
    if (userData) {
      setUser(userData?.getUser);
    }
    if (createUserData) {
      setUser(createUserData?.createUser);
    }
  }, [userData, createUserData]);

  const signUp = async (input: any) => {
    try {
      await supabase.auth.signUp({
        email: input.email,
        password: input.password,
      });
      const { email, id } = await supabase.auth.user();
      await createUser({
        variables: {
          input: {
            id,
            firstName: input.firstName,
            lastName: input.lastName,
            email,
          },
        },
      });
    } catch (e) {
      console.error(e);
    }
  };

  const signIn = async (input: any) => {
    try {
      await supabase.auth.signIn({
        email: input.email,
        password: input.password,
      });
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {}, []);

  return (
    <UserContext.Provider
      value={{
        user,
        signUp,
        signIn,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
