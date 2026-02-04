import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import Button from "../../ui/Button";

const Home = () => {
  return (
    <main className={styles.home}>
      <h1> Welcome to Tea In </h1>
      <Link to="/login">
        <Button> Login </Button>
      </Link>
    </main>
  );
};

export default Home;
