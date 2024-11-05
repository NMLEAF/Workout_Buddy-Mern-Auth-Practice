import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useAuthContext } from "./useAuthContext";

const useSignup = () => {
  const queryClient = useQueryClient();
  const { dispatch } = useAuthContext();

  const { mutate: signupUser, isPending } = useMutation({
    mutationFn: async (user) => {
      const response = await fetch("/api/user/signup", {
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

      localStorage.setItem("user", JSON.stringify(json));

      return json;
    },

    onSuccess: (data) => {
      toast.success("User successfully signed up");
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      const user = JSON.parse(localStorage.getItem("user"));
      dispatch({ type: "LOGIN", payload: user });
    },
  });

  return { signupUser, isPending };
};

export default useSignup;
