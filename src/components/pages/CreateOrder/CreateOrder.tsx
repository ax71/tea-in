import { useEffect, useState } from "react";
import type { ICart, IMenu } from "../../../types/order";
import styles from "./CreateOrder.module.css";
import { useSearchParams } from "react-router-dom";
import { getMenus } from "../../../services/menu.service";
import { filters } from "./CreateOrder.constanant";
import Button from "../../ui/Button";

const CreateOrder = () => {
  const [menus, setMenus] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [cart, setCart] = useState<ICart[]>([]);

  useEffect(() => {
    const fecthOrder = async () => {
      const result = await getMenus(searchParams.get("category") as string);

      setMenus(result.data);
    };
    fecthOrder();
  }, [searchParams.get("category")]);
  return (
    <main className={styles.create}>
      <div className={styles.menu}>
        <h1>Create Order</h1>
        <div className={styles.filter}>
          {filters.map((filter) => (
            <Button
              type="button"
              key={filter}
              color={
                (!searchParams.get("category") && filter === "ALL") ||
                filter === searchParams.get("category")
                  ? "primary"
                  : "secondary"
              }
              onClick={() =>
                setSearchParams(filter === "ALL" ? "" : { category: filter })
              }
            >
              {filter}
            </Button>
          ))}
        </div>
        <div className={styles.list}>
          {menus.map((item: IMenu) => (
            <div className={styles.item} key={item.id}>
              <img
                src={item.image_url}
                alt={item.name}
                className={styles.image}
              />
              <h2>{item.name}</h2>
              <div className={styles.bottom}>
                <p className={styles.price}>${item.price}</p>
                <Button onClick={() => {}}>Order</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default CreateOrder;
