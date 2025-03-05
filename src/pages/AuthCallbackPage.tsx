import { useCreateMyUser } from "@/api/MyUserApi";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallbackPage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth0();
  const { createUser } = useCreateMyUser();
  const hasCreatedUser = useRef(false);

  useEffect(() => {
    if (
      isAuthenticated &&
      user?.sub &&
      user?.email &&
      !hasCreatedUser.current
    ) {
      createUser({ auth0Id: user.sub, email: user.email });
      hasCreatedUser.current = true;
    }

    if (isAuthenticated) {
      setTimeout(() => navigate("/"), 1000);
    }
  }, [createUser, navigate, user, isAuthenticated]);

  return <>Loading...</>;
};

export default AuthCallbackPage;
