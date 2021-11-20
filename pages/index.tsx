import React, { useEffect, useState } from "react";
import { supabase } from "utils/supabaseClient";

const Home: React.FC = ({}) => {
  const [session, setSession] = useState<null | object>(null);

  const data = supabase.from("user");
  console.log(data);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);
  return <>{!session ? "Sign In" : "Signed In"}</>;
};

export default Home;
