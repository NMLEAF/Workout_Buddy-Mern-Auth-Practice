import { useState } from "react";
import useSignup from "../hooks/useSignup";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signupError, setSignupError] = useState(null);

  const { signupUser, isPending: isSigningUp } = useSignup();

  const handleSubmit = (e) => {
    e.preventDefault();

    // console.log(email, password);
    const user = { email, password };

    signupUser(user, {
      onSuccess: () => {
        setEmail("");
        setPassword("");
        setSignupError(null);
      },
      onError: (err) => {
        setSignupError(err.message);
        console.log(err);
      },
    });
  };

  return (
    <>
      <form className="signup" onSubmit={handleSubmit}>
        <h3>Sign up</h3>

        <label>Email:</label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <label>Password:</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        {signupError && <div className="error">{signupError}</div>}
        <button disabled={isSigningUp}>
          {isSigningUp ? "Signing up" : "Sign up"}
        </button>
      </form>
    </>
  );
};

export default Signup;
