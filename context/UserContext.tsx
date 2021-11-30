import { useMutation, useQuery } from "@apollo/client";
import { createContext, useContext, useEffect, useState } from "react";
import { createUserMutation } from "@/mutations";
import { getUserQuery } from "@/queries";
import { supabase } from "utils/supabaseClient";
import { useRouter } from "next/router";

interface User {
  id: string;
  servers?: object[];
  firstName: string;
  lastName: string;
  email: string;
  role: string;
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
    role: "",
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
    role: "",
  });

  const history = useRouter();
  const supaUser = supabase.auth.user();

  const { data: userData } = useQuery(getUserQuery, {
    variables: { id: supaUser?.id },
    skip: !supaUser,
    onError: (error) => console.error(error),
  });

  const [createUser, { data: createUserData }] = useMutation(
    createUserMutation,
    {
      onError: () => console.log("Failed to create user"),
    }
  );

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
            role: "user",
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

  useEffect(() => {
    if (userData) {
      setUser(userData?.getUser);
    }
    if (createUserData) {
      setUser(createUserData?.createUser);
      history.push(`/profile/${createUserData?.createUser?.id}`);
    }
  }, [userData, createUserData]);

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
