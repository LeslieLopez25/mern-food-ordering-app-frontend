import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { useGetArchivedOrders } from "@/api/OrderApi";
import UsernameMenu from "./UsernameMenu";

const MainNav = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const { archivedOrders, isLoading } = useGetArchivedOrders();

  return (
    <span className="flex space-x-2 items-center">
      {isAuthenticated ? (
        <>
          <Link to="/order-status" className="font-bold hover:text-orange-500">
            Order Status
          </Link>
          <span className="text-orange-500">|</span>

          {!isLoading && archivedOrders && archivedOrders.length > 0 && (
            <>
              <Link
                to="/archived-orders"
                className="font-bold hover:text-orange-500"
              >
                Archived Orders
              </Link>
              <span className="text-orange-500">|</span>
            </>
          )}

          <UsernameMenu />
        </>
      ) : (
        <button
          className="font-bold hover:text-orange-500 hover:bg-white"
          onClick={async () =>
            await loginWithRedirect({
              authorizationParams: {
                prompt: "login",
              },
            })
          }
        >
          Log In
        </button>
      )}
    </span>
  );
};

export default MainNav;
