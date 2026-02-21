import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import Button from "../../ui/Button";

const Home = () => {
  return (
    <main className={styles.home}>
      <div className={styles.content}>
        <h1 className={styles.title}> Welcome to Tea In </h1>
        <p className={styles.description}> Please login to continue </p>
        <Link to="/login">
          <Button> Login </Button>
        </Link>
      </div>
    </main>
  );
};

export default Home;
