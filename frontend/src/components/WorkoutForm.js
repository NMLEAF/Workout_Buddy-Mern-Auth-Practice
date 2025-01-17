import { useState } from "react";
import useCreateWorkout from "../hooks/useCreateWorkout";
import { useAuthContext } from "../hooks/useAuthContext";

const WorkoutForm = () => {
  // const { dispatch } = useWorkoutsContext();

  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const { user } = useAuthContext();

  const { createWorkout, isLoading } = useCreateWorkout();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must logged in");
      return;
    }

    const workout = { title, load, reps };

    // console.log(workout);

    createWorkout(workout, {
      onSuccess: () => {
        setTitle("");
        setLoad("");
        setReps("");
        setError(null);
        setEmptyFields([]);
      },
      onError: (err) => {
        const errorData = JSON.parse(err.message);
        setError(errorData.error);
        setEmptyFields(errorData.emptyFields);
      },
    });

    // const response = await fetch('/api/workouts', {
    //   method: 'POST',
    //   body: JSON.stringify(workout),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // })
    // const json = await response.json()

    // if (!response.ok) {
    //   setError(json.error)
    //   setEmptyFields(json.emptyFields)
    // }
    // if (response.ok) {
    //   setTitle('')
    //   setLoad('')
    //   setReps('')
    //   setError(null)
    //   setEmptyFields([])
    //   console.log('new workout added', json)
    //   dispatch({type: 'CREATE_WORKOUT', payload: json})
    // }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>

      <label>Excersize Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes("title") ? "error" : ""}
      />

      <label>Load (in kg):</label>
      <input
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        className={emptyFields.includes("load") ? "error" : ""}
      />

      <label>Reps:</label>
      <input
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        className={emptyFields.includes("reps") ? "error" : ""}
      />

      <button disabled={isLoading}>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
