import { useRouter } from "next/router";
import { supabase } from "utils/supabaseClient";

const usePrivateRoute = () => {
  const router = useRouter();
  if (router.query.userID && router.query.userID !== supabase.auth.user()?.id) {
    router.push("/");
  }
};

export default usePrivateRoute;
