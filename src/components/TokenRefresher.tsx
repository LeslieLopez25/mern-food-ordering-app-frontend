import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

const TokenRefresher = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  useEffect(() => {
    const refreshToken = async () => {
      if (isAuthenticated) {
        try {
          const token = await getAccessTokenSilently({
            cacheMode: "off",
          });
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
