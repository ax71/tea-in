import { useEffect, useState } from "react";
import { getOrders } from "../../../services/order.service";
import styles from "./ListOrder.module.css";
import { Link } from "react-router-dom";
import Button from "../../ui/Button";
import type { IOrder } from "../../../types/order";

const ListOrder = () => {
  const [orders, setOrders] = useState([]);
  const [refetchOrder, setRefetchOrder] = useState(true);

  useEffect(() => {
    if (refetchOrder) {
      const fecthOrder = async () => {
        const result = await getOrders();

        setOrders(result.data);
      };
      fecthOrder();
      setRefetchOrder(false);
    }
  }, [refetchOrder]);

  return (
    <main className={styles.orders}>
      <section className={styles.header}>
        <h1 className={styles.title}>Order List</h1>
        <div className={styles.button}>
          <Link to="/create">
            <Button>Create Order</Button>
          </Link>
          <Button color="secondary">Logout</Button>
        </div>
      </section>
      <section>
        <table
          border={1}
          className={styles.table}
          cellPadding={0}
          cellSpacing={0}
        >
          <thead>
            <tr>
              <th>No</th>
              <th>Customer Name</th>
              <th>Table Number</th>
              <th>Total</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order: IOrder, index: number) => (
              <tr key={order.id}>
                <td>{index + 1}</td>
                <td>{order.customer_name}</td>
                <td>{order.table_number}</td>
                <td>{order.total}</td>
                <td>{order.status}</td>
                <td className={styles.action}>
                  <Link to={`/orders/${order.id}`}>
                    <Button>Detail</Button>
                  </Link>
                  {order.status === "PROCESSING" && (
                    <Button onClick={() => {}}>Completed</Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
};

export default ListOrder;
