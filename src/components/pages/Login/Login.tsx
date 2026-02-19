import type { FormEvent } from "react";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import styles from "./Login.module.css";
import { login } from "../../../services/auth.service";
import { setLocalStorage } from "../../../utils/storage";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;

    const payload = {
      email: form.email.value,
      password: form.password.value,
    };

    const result = await login(payload);
    setLocalStorage("auth", result.token);
    navigate("/orders");
  };

  return (
    <main className={styles.container}>
      <div className={styles.left}>
        <div className={styles.card}>
          <h2 className={styles.title}>Sign In</h2>
          <form onSubmit={handleLogin} className={styles.form}>
            <Input
              label="Email"
              name="email"
              id="email"
              type="email"
              placeholder="Insert your email"
              required
            />

            <Input
              label="Password"
              name="password"
              id="password"
              type="password"
              placeholder="Insert your password"
              required
            />

            <Button color="secondary" type="submit">
              Login
            </Button>
          </form>
        </div>
      </div>

      <div className={styles.right}></div>
    </main>
  );
};

export default Login;
