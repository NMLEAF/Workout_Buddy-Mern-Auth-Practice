import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useAuthContext } from "./useAuthContext";

const useCreateWorkout = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthContext();

  const { mutate: createWorkout, isLoading } = useMutation({
    mutationFn: async (workout) => {
      const response = await fetch("/api/workouts", {
        method: "POST",
        body: JSON.stringify(workout),
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${user.token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData));
      }
    },
    onSuccess: () => {
      toast.success("New workout successfully created");
      queryClient.invalidateQueries({
        queryKey: ["workouts"],
      });
    },
  });

  return { createWorkout, isLoading };
};

export default useCreateWorkout;
