import { useDispatch, useSelector } from "react-redux";
import "./orders.css";
import { useEffect, useState } from "react";
import { DeleteOrder, LoadOrders, LoadRestaraunts, UpdateOrder } from "../../components/store/orderSlice";
import { TranslatePrismaTimeToActualTime } from "../../components/store/funcs";
import { da } from "zod/locales";

export default function Orders() {
     const {user} = useSelector((state) => state.auth);
 
    const isSupaAdmin = user && user.role === "SUPA_ADMIN";
    const {orders, loading, restaraunts} = useSelector((state) => state.orders)
    const [filteredRestaraunt, setFilteredRestaraunt] = useState({adminIDs: []});
    const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, orderId: null });
    const isAdmin = user && (filteredRestaraunt.adminIDs.includes(user.id) || user.role === "SUPA_ADMIN");
    const patch = useDispatch();
    useEffect(() => {
        patch(LoadRestaraunts());
    }, [patch]);

    const markOrderAsCompleted = (orderId) => {
        const order = orders.find((o) => o.id === orderId);
        const updatedOrder = { ...order, readyToOrder: true };
        patch(UpdateOrder({ OrderData: updatedOrder }));
    };
    
    return (
        <div className="orders-page">
            <h1>Orders</h1>
                   {filteredRestaraunt && filteredRestaraunt.adminIDs.length > 0 ? (
                    <>
                    <button onClick={() => {setFilteredRestaraunt({adminIDs: []});}}>Back</button>
                        <h2 className="restaraunt-title">{filteredRestaraunt.name}</h2>
                        {contextMenu.visible && (
                            <div className="context-menu" style={{ position: "absolute", top: contextMenu.y, left: contextMenu.x }}>
                                <button onClick={() => {
                                    patch(DeleteOrder({ id: contextMenu.orderId }))
                                    setContextMenu({ visible: false, x: 0, y: 0, orderId: null });
                                }}>Delete</button>
                                <button onClick={() => {
                                    markOrderAsCompleted(contextMenu.orderId);
                                    setContextMenu({ visible: false, x: 0, y: 0, orderId: null });
                                }}>Mark as Completed</button>
                                <button onClick={() => setContextMenu({ visible: false, x: 0, y: 0, orderId: null })}>Close</button>
                            </div>
                        )}
                       <div className="order-list">
                            {orders.filter(order => order.restaraunt === filteredRestaraunt.id && !order.readyToOrder).map((order, index) => {
                                return (
                                <div onContextMenu={(e) => {
                                    e.preventDefault()
                                    setContextMenu({ visible: true, x: e.clientX, y: e.clientY, orderId: order.id })
                                }} className="order-card" id={order.id} style={{backgroundColor: `rgba(255, 0, 0, ${order.waitingTime / 60})`}}>
                                    <h2 className="order-number">Order #{index + 1}</h2>
                                    <h3 className="order-item">{filteredRestaraunt.items.find(item => item.id === order.menuItemID)?.name || "(Unknown)"}----(${filteredRestaraunt.items.find(item => item.id === order.menuItemID)?.price || 0} each)</h3>
                                    <p>Quantity: {order.quantity}</p>
                                    <h3 className="order-total">Total Price: ${(filteredRestaraunt.items.find(item => item.id === order.menuItemID)?.price || 0) * order.quantity}</h3>
                                    {isAdmin && <button onClick={() => markOrderAsCompleted(order.id)}>Mark as Completed</button>}
                                </div>
                            )})}
                        </div>
                    </>
                   ) : (<>
                   <div className="restaraunt-list">
                   {restaraunts.map((restaraunt, index) => {
                    return (
                        
                        <div className="restaraunt-card" key={index} onClick={() => {
                            if (restaraunts[index].adminIDs.length == 0) {
                                alert("This restaraunt has no admins assigned.");
                                return;
                            }
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