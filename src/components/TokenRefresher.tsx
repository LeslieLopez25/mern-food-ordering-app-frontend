import { useAuth0, GetTokenSilentlyOptions } from "@auth0/auth0-react";
import { useEffect } from "react";

const TokenRefresher = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  useEffect(() => {
    const refreshToken = async () => {
      if (isAuthenticated) {
        try {
          const options: GetTokenSilentlyOptions & {
            audience: string;
            scope: string;
          } = {
            audience: import.meta.env.VITE_AUTH0_AUDIENCE as string,
            scope: "openid profile email offline_access",
            cacheMode: "off",
          };
          const token = await getAccessTokenSilently(options);
          console.log("New Access Token:", token);
        } catch (error) {
          console.error("Token refresh failed:", error);
        }
      }
    };

    refreshToken();
  }, [isAuthenticated, getAccessTokenSilently]);

  return null;
};

export default TokenRefresher;
