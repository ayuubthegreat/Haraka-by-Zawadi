import { useDispatch, useSelector } from "react-redux";
import "./orders.css";
import { useEffect } from "react";
import { LoadOrders } from "../components/store/slice";

export default function Orders() {
    const {orders, loading} = useSelector((state) => state.orders)
    const patch = useDispatch();
    useEffect(() => {
        patch(LoadOrders());
    }, [patch]);
    return (
        <div className="orders-page">
            <h1>Orders</h1>
            <p>This is where you can view and manage your orders.</p>
                <div className="orders-list">
                    {orders && orders.length > 0 ? (
                        <>
                            {orders.map((order) => (
                                <div key={order.id} className="order-item">
                                    <p style={{fontWeight: "bold", fontSize:70, padding: "10px"}}>{order.orderNum}</p>
                                    <p> {order.quantity} {order.menuItem}{order.quantity > 1 ? "s" : ""}</p>
                                    <p>Waiting Time: {Math.floor(order.waitingTime / 60)} hour{Math.floor(order.waitingTime / 60) !== 1 ? "s" : ""} and {order.waitingTime % 60} minutes</p>
                                </div>
                            ))}
                        </>
                    ) : (
                        <div className="no-orders-container">
                            <p>No orders found.</p>
                        </div>
                    )}
        </div>
        </div>
    )
}