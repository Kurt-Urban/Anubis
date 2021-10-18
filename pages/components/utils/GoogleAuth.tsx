import React from "react";
import GoogleLogin from "react-google-login";
import useUser from "../../../hooks/useUser";

const GoogleAuth: React.FC = ({ ...props }) => {
  const { setGoogleUser } = useUser();

  return (
    <>
      <GoogleLogin
        className="justify-content-center"
        clientId={process.env.NEXT_PUBLIC_CLIENT_ID}
        buttonText="Login"
        onSuccess={(e) => setGoogleUser(e)}
        onFailure={(e) => console.error(e)}
        cookiePolicy="single_host_origin"
        isSignedIn
        {...props}
      />
    </>
  );
};

export default GoogleAuth;
