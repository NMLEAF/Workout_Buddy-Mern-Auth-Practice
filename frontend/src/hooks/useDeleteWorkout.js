import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useAuthContext } from "./useAuthContext";

const useDeleteWorkout = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthContext();

  const { mutate: deleteWorkout, isLoading } = useMutation({
    mutationFn: async (id) => {
      await fetch(`/api/workouts/${id}`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      });
    },
    onSuccess: () => {
      toast.success("Workout successfully deleted!");

      queryClient.invalidateQueries({
        queryKey: ["workouts"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { deleteWorkout, isLoading };
};

export default useDeleteWorkout;
