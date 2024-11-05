// components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../hooks/useAuthContext";

const Home = () => {
  const { user } = useAuthContext();

  const {
    isPending,
    error,
    data: workouts = [],
  } = useQuery({
    queryKey: ["workouts"],
    queryFn: async () =>
      await fetch("/api/workouts", {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      }).then((res) => res.json()),

    enabled: !!user,
  });

  return (
    <div className="home">
      <div className="workouts">
        {isPending && <div>Loading workouts...</div>}
        {error && <div>Error fetching workouts</div>}
        {!isPending && workouts.length === 0 && (
          <div>No workouts available</div>
        )}
        {user &&
          workouts &&
          workouts.map((workout) => (
            <WorkoutDetails workout={workout} key={workout._id} />
          ))}
      </div>

      <WorkoutForm />
    </div>
  );
};

export default Home;
