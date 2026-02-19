import { useEffect, useMemo, useState } from "react";
import { getOrders, updateOrder } from "../../../services/order.service";
import styles from "./ListOrder.module.css";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import type { IOrder } from "../../../types/order";
import { removeLocalStorage } from "../../../utils/storage";
import Input from "../../ui/Input";

const ListOrder = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refetchOrder, setRefetchOrder] = useState(true);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleSearchOrder = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value;
    setSearch(search);
  };

  const filteredOrders = useMemo(() => {
    return orders.filter((order: IOrder) =>
      order.customer_name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search, orders]);

  useEffect(() => {
    if (refetchOrder) {
      const fecthOrder = async () => {
        setIsLoading(true);
        try {
          const result = await getOrders();
          setOrders(result.data);
        } catch (error) {
          console.log("Error get orders", error);
        } finally {
          setRefetchOrder(false);
          setIsLoading(false);
        }
      };
      fecthOrder();
    }
  }, [refetchOrder]);

  const handleCompletedOrder = async (id: string) => {
    await updateOrder(id, { status: "COMPLETED" }).then(() => {
      setRefetchOrder(true);
    });
  };

  const handleLogout = () => {
    removeLocalStorage("auth");
    return navigate("/login");
  };

  return (
    <main className={styles.orders}>
      <section className={styles.header}>
        <h1 className={styles.title}>Order List</h1>
      </section>
      <div className={styles.search}>
        <div className={styles.input}>
          <Input
            id="search"
            name="search"
            placeholder="Insert Costumer name ..."
            required
            onChange={handleSearchOrder}
          />
        </div>
        <div className={styles.button}>
          <Link to="/create">
            <Button>Create Order</Button>
          </Link>
          <Button color="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
      <section>
        <table
          border={1}
          className={styles.table}
          cellPadding={0}
          cellSpacing={0}
        >
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>No</th>
              <th>Customer Name</th>
              <th>Table Number</th>
              <th>Total</th>
              <th>Status</th>
              <th style={{ textAlign: "center" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  Loading...
                </td>
              </tr>
            ) : filteredOrders.length > 0 ? (
              filteredOrders.map((order: IOrder, index: number) => (
                <tr key={order.id}>
                  <td style={{ textAlign: "center" }}>{index + 1}</td>
                  <td>{order.customer_name}</td>
                  <td>{order.table_number}</td>
                  <td>{order.total}</td>
                  <td>{order.status}</td>
                  <td className={styles.action}>
                    <Link to={`/orders/${order.id}`}>
                      <Button>Detail</Button>
                    </Link>
                    {order.status === "PROCESSING" && (
                      <Button onClick={() => handleCompletedOrder(order.id)}>
                        Completed
                      </Button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  Data tidak ditemukan
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </main>
  );
};

export default ListOrder;
