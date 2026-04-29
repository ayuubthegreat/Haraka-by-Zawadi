import { useForm } from "react-hook-form"
import { orderTemplate } from "../components/store/schema"
import { useDispatch, useSelector } from "react-redux";
import { CreateOrder } from "../components/store/slice";

export default function CreateOrderPage() {
    const {orders, error, loading, successMessage} = useSelector((state) => state.orders)
    const patch = useDispatch();
    const {
        handleSubmit,
        register,
        reset,
        setValues,
    } = useForm({
        defaultValues: orderTemplate
    });
    const onSubmit = async (data) => {
        console.log(typeof data.quantity)
        if (typeof data.quantity !== "number") {
            data.quantity = parseInt(data.quantity, 10);
        }
        console.log("Form Data:", data);
        await patch(CreateOrder(data)).unwrap();
    }
    console.log(orderTemplate)
    return (
        <div className="create-order-page">
            <h1>Create Order</h1>
            <p>This is where you can create a new order.</p>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label>Menu Item:</label>
                        <select {...register("menuItem")}>
                            <option value="">Select an item</option>
                            <option value="Pizza">Pizza</option>
                            <option value="Burger">Burger</option>
                            <option value="Pasta">Pasta</option>
                        </select>
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