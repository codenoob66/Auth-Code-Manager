import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import * as Chakra from "@chakra-ui/react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = Chakra.useToast();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: "Login Successful",
        description: "Welcome back!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/dashboard");
    } catch (err) {
      toast({
        title: "Login Failed horribly",
        description:
          "Please check your email or password and try again you dumb fuck",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }

    setLoading(false);
  };

  return (
    <div className={styles.formHolder}>
      <div className={styles.innerFormHolder}>
        <h2>Secret Productive App</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleLogin} className={styles.classColumn}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.input}
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.input}
          />
          <br />
          <button type="submit" disabled={loading} className={styles.loginBtn}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
