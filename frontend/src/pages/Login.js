import { useState } from "react";
import useLogin from "../hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(null);

  const { loginUser, isPending: isLoginIn } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = { email, password };

    loginUser(user, {
      onSuccess: (data) => {
        setEmail("");
        setPassword("");
        setLoginError(null);
      },
      onError: (err) => {
        setLoginError(err.message);
        console.error(err);
      },
    });
  };

  return (
    <>
      <form className="login" onSubmit={handleSubmit}>
        <h3>Log in</h3>

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

        {loginError && <div className="error">{loginError}</div>}
        <button disabled={isLoginIn}>
          {isLoginIn ? "Logging in..." : "Log in"}
        </button>
      </form>
    </>
  );
};

export default Login;
