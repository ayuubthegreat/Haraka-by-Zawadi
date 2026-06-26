import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux"
import { restarauntTemplate } from "../../components/store/schema";
import { CreateRestaraunt, UpdateRestaraunt } from "../../components/store/orderSlice";
import { useState } from "react";
import "./createRestaraunt.css"



export const CreateRestarauntPage = ({restaraunt}) => {
    const dptch = useDispatch();
    const {error, successMessage, loading} = useSelector((state) => state.orders)
    const {
        handleSubmit,
        register,
        reset,
        setValue,
        getValues,
    } = useForm({
        defaultValues: restaraunt != null ? restaraunt : restarauntTemplate,
        errors: restaraunt != null ? {} : null,
    })
    const [items, setItems] = useState(restaraunt != null ? restaraunt.items : getValues("items"));
    const [itemName, setItemName] = useState("");
    const [itemPrice, setItemPrice] = useState(0);
    const onSubmit = async (data) => {
        console.log("Form Data:", data);
        if (restaraunt) {
            await dptch(UpdateRestaraunt({id: restaraunt.id, RestarauntData: data})).unwrap();
            console.log("Restaraunt updated successfully");
        } else {
            await dptch(CreateRestaraunt(data)).unwrap();
            console.log("Restaraunt created successfully");
        }
    }
    return (
        <div className="create-restaraunt-page">
            <h1>{restaraunt != null ? "Update Restaraunt" : "Create Restaraunt"}</h1>
            <p>This is where you can {restaraunt != null ? "update" : "create"} a new restaraunt.</p>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label>Name:</label>
                        <input type="text" {...register("name")} />
                    </div>
                    
                    {loading && <p>{restaraunt != null ? "Updating" : "Creating"} restaraunt...</p>}
                    {error && <p style={{color: "red"}}>Error: {error}</p>}
                    {successMessage && <p style={{color: "green"}}>Success: {successMessage}</p>}
                    <div className="items-container">
                        <h3>Menu Items and Prices</h3>
                        <input id="item-name-input" type="text" placeholder="Item Name" onChange={(e) => {
                            setItemName(e.target.value)}} />
                        <input id="item-price-input" type="number" placeholder="Price"
                         onChange={(e) => setItemPrice(Number(e.target.value))} />
                        <button type="button" onClick={() => {
                            console.log("Adding item:", itemName, "with price:", itemPrice);
                            if (itemName && itemPrice > 0) {
                                setValue("items", [
                                    ...getValues("items"),
                                    { name: itemName, price: itemPrice },
                                ]);
                                setItemPrice(0);
                                setItemName("");
                                document.getElementById("item-name-input").value = "";
                                document.getElementById("item-price-input").value = "";
                                console.log("Current items:", getValues());
                                setItems(getValues("items"));
                            }
                        }}>Add Item</button>
                        <div className="items-list">
                            {items && items.map(({ name, price }) => (
                                <div key={name} className="item">
                                    <p>{name}: ${price}</p>
                                    <button type="button" onClick={() => {
                                        const updatedItems = getValues("items").filter(item => item.name !== name);
                                        setValue("items", updatedItems);
                                        console.log("Current items after deletion:", updatedItems);
                                        setItems(updatedItems);
                                    }}>Remove</button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <button type="submit">{restaraunt != null ? "Update Restaraunt" : "Create Restaraunt"}</button>
                </form>
            </div>
        </div>
    )
}