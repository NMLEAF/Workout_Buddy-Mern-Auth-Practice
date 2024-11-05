import { useQueryClient } from "@tanstack/react-query";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const queryClient = useQueryClient();

  const logout = () => {
    // remove user from client context
    dispatch({ type: "LOGOUT" });

    // remove user from local storage
    localStorage.removeItem("user");

    // clear the catches of react query
    queryClient.clear();
  };

  return { logout };
};
