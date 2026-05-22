import { useForm } from "react-hook-form"
import { orderTemplate } from "../components/store/schema"
import { useDispatch, useSelector } from "react-redux";
import { CreateOrder, LoadRestaraunts } from "../components/store/orderSlice";
import { useEffect, useState } from "react";

export default function CreateOrderPage() {
    const {orders, error, loading, successMessage, restaraunts} = useSelector((state) => state.orders)
    const [restarauntIndex, setRestarauntIndex] = useState(-1);
    const patch = useDispatch();
    const {
        handleSubmit,
        register,
        reset,
        setValue,
        getValues,
    } = useForm({
        defaultValues: orderTemplate
    });
    useEffect(() => {
        patch(LoadRestaraunts());
    }, [patch]);
    const onSubmit = async (data) => {
        if (typeof data.quantity !== "number") {
            data.quantity = parseInt(data.quantity, 10);
        }
        if (restarauntIndex === -1) {
            console.error("No restaraunt selected");
            return;
        }
        data.restarauntID = restaraunts[restarauntIndex].id;
        data.unitPrice = restaraunts[restarauntIndex].items.find(item => item.name === data.menuItem)?.price || 0;
        console.log("Form Data:", data);
        await patch(CreateOrder(data)).unwrap();
    }
    console.log(restaraunts)
    return (
        <div className="create-order-page">
            <h1>Create Order</h1>
            <p>This is where you can create a new order.</p>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        {restaraunts.length === 0 ? (
                            <p>No restaraunts available. Please create a restaraunt first.</p>
                        ) : (
                           <>
                        <label>Menu Item:</label>
                        <select {...register("menuItem")}>
                            <option value="">Select a menu item</option>
                            {restarauntIndex !== -1 ? restaraunts[restarauntIndex].items.map(({ name }) => (
                                <option key={name} value={name}>{name}</option>
                            )) : null}
                        </select>
                        <label>Restaraunt:</label>
                        <select {...register("restaraunt")} onChange={(e) => { setRestarauntIndex(restaraunts.findIndex(r => r.name === e.target.value)); setValue("menuItem", ""); }}>
                            <option value="">Select a restaraunt</option>
                            {restaraunts.map((restaraunt, index) => (
                                <option key={index} value={restaraunt.name}>
                                    {restaraunt.name}
                                </option>
                            ))}
                            
                        </select>
                        </>
                        )}
                    </div>
                    <div>
                        <label>Quantity:</label>
                        <input type="number" {...register("quantity")} />
                    </div>
                    <button type="submit">Create Order</button>
                </form>
                {loading && <p>Creating order...</p>}
                {error && <p style={{color: "red"}}>Error: {error}</p>}
                {successMessage && <p style={{color: "green"}}>Success: {successMessage}</p>}
            </div>
        </div>
    )
}