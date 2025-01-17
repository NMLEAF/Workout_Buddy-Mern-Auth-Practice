// import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import useDeleteWorkout from "../hooks/useDeleteWorkout";
import { useAuthContext } from "../hooks/useAuthContext";
import toast from "react-hot-toast";

const WorkoutDetails = ({ workout }) => {
  // const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();
  const { deleteWorkout } = useDeleteWorkout();

  const handleClick = (id) => {
    if (!user) {
      toast.error("You must logged in");
      return;
    }
    // const response = await fetch("/api/workouts/" + workout._id, {
    //   method: "DELETE",
    // });
    // const json = await response.json();
    // if (response.ok) {
    //   dispatch({ type: "DELETE_WORKOUT", payload: json });
    // }

    console.log("Workout deleted", id);

    deleteWorkout(id);
  };

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (kg): </strong>
        {workout.load}
      </p>
      <p>
        <strong>Reps: </strong>
        {workout.reps}
      </p>
      <p>
        {workout.createdAt
          ? formatDistanceToNow(new Date(workout.createdAt), {
              addSuffix: true,
            })
          : "Date not available"}
      </p>
      <span
        className="material-symbols-outlined"
        onClick={() => handleClick(workout._id)}
      >
        delete
      </span>
    </div>
  );
};

export default WorkoutDetails;
