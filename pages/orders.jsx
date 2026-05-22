import { useDispatch, useSelector } from "react-redux";
import "./orders.css";
import { useEffect, useState } from "react";
import { DeleteOrder, LoadOrders, LoadRestaraunts } from "../components/store/orderSlice";

export default function Orders() {
    const {orders, loading, restaraunts} = useSelector((state) => state.orders)
    const [filteredRestaraunt, setFilteredRestaraunt] = useState({});
    const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, orderId: null });
    const patch = useDispatch();
    useEffect(() => {
        patch(LoadOrders());
        patch(LoadRestaraunts());
    }, [patch]);
    return (
        <div className="orders-page">
            <h1>Orders</h1>
            <p>This is where you can view and manage your orders.</p>
                
                   {filteredRestaraunt && Object.keys(filteredRestaraunt).length > 0 ? (
                    <>
                    <button onClick={() => {setFilteredRestaraunt({});}}>Back</button>
                        <h2 className="restaraunt-title">{filteredRestaraunt.name}</h2>
                        {contextMenu.visible && (
                            <div className="context-menu" style={{ position: "absolute", top: contextMenu.y, left: contextMenu.x }}>
                                <button onClick={() => {
                                    patch(DeleteOrder({ id: contextMenu.orderId }))
                                    setContextMenu({ visible: false, x: 0, y: 0, orderId: null });
                                }}>Delete</button>
                                <button>Mark as Completed</button>
                                <button onClick={() => setContextMenu({ visible: false, x: 0, y: 0, orderId: null })}>Close</button>
                            </div>
                        )}
                       <div className="order-list">
                            {orders.filter(order => order.restaraunt === filteredRestaraunt.id).map((order) => {
                                setInterval(() => {
                                    const orderElement = document.getElementById(order.id);
                                    let waitingTime = order.waitingTime;
                                    if (orderElement) {
                                        waitingTime += 1;
                                        console.log("Updating waiting time for order:", order.id, "Current waiting time:", waitingTime);
                                        orderElement.style.backgroundColor = `rgba(255, 0, 0, ${waitingTime / 60})`;
                                    }
                                }, 1000)
                                return (
                                <div onContextMenu={(e) => {
                                    e.preventDefault()
                                    setContextMenu({ visible: true, x: e.clientX, y: e.clientY, orderId: order.id })
                                }} className="order-card" id={order.id} style={{backgroundColor: `rgba(255, 0, 0, ${order.waitingTime / 60})`}}>
                                    <h2 className="order-number">Order #{order.orderNum}</h2>
                                    <h3 className="order-item">{order.menuItem}</h3>
                                    <p>Quantity: {order.quantity}</p>
                                    <p>Waiting Time: {order.waitingTime} mins</p>
                                </div>
                            )})}
                        </div>
                    </>
                   ) : (<>
                   <div className="restaraunt-list">
                   {restaraunts.map((restaraunt, index) => {
                    return (
                        
                        <div className="restaraunt-card" key={index} onClick={() => {
                            setFilteredRestaraunt(restaraunts[index])
                            console.log("Selected restaraunt:", restaraunts[index].name);
                            console.log(orders);
                        }}>
                            <h2>{restaraunt.name}</h2>
                        </div>
                    )})}
                    </div>
                   </>)}
        </div>   
    )
}