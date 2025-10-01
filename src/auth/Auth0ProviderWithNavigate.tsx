import { AppState, Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

// Wraps the app with Auth0 authentication, handling login, logout, and redirects
const Auth0ProviderWithNavigate = ({ children }: Props) => {
  const navigate = useNavigate();

  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL;
  const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

  if (!domain || !clientId || !redirectUri || !audience) {
    throw new Error("Unable to initialize auth");
  }

  // Redirects users after login to the original page or default route
  const onRedirectCallback = (appState?: AppState) => {
    navigate(appState?.returnTo || "/auth-callback");
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
        audience: audience,
        scope: "openid profile email", // Request user and email access
      }}
      onRedirectCallback={onRedirectCallback}
      cacheLocation="localstorage" // Store tokens in localstorage for persistence
      useRefreshTokens={true} // Use refresh tokens for session longevity
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithNavigate;
