import React, { useEffect } from "react";
import GoogleLogin from "react-google-login";

const GoogleAuth = ({ ...props }) => {
  const googleResponse = (e: any) => {
    e.tokenId ? console.log("Logged In with Google") : console.log(e);
  };
  return (
    <>
      <GoogleLogin
        clientId={process.env.NEXT_PUBLIC_CLIENT_ID}
        buttonText="Login"
        onSuccess={googleResponse}
        onFailure={googleResponse}
        cookiePolicy="single_host_origin"
        isSignedIn
        {...props}
      />
    </>
  );
};

export default GoogleAuth;
