import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useAuthContext } from "./useAuthContext";

const useLogin = () => {
  const queryClient = useQueryClient();
  const { dispatch } = useAuthContext();

  const { mutate: loginUser, isPending } = useMutation({
    mutationFn: async (user) => {
      const response = await fetch("/api/user/login", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.error);
      }

      // save the user in localstorage
      localStorage.setItem("user", JSON.stringify(json));

      return json;
    },
    onSuccess: (data) => {
      toast.success("User successfully logged in!");
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      const user = JSON.parse(localStorage.getItem("user"));
      dispatch({ type: "LOGIN", payload: user });
    },
  });

  return { loginUser, isPending };
};

export default useLogin;
