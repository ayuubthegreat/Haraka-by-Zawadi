import { useDispatch, useSelector } from "react-redux"
import { useState } from "react";
import {UpdateRestaraunt, LoadRestaraunts} from "../../components/store/orderSlice.js"
import { GetCurrentUser, GetAllUsers } from '../../components/store/authSlice.js'
import "./restaraunts.css"


export const RestarauntsPage = () => {
    const {user, allUsers} = useSelector((state) => state.auth);
    const {orders, loading, restaraunts} = useSelector((state) => state.orders);
    const [filteredRestaraunt, setFilteredRestaraunt] = useState({name: ""}); 
    const [filteredRestarauntItems, setFilteredRestarauntItems] = useState([]); 
    const patch = useDispatch();
    const setFilteredRestarauntAsync = async(restaraunt) => {
        setFilteredRestaraunt(restaraunt);
        const filteredRestarauntData = []

        for(const item of restaraunt.items || []) {
            const itemData = {...item, isEditingName: false, isEditingPrice: false};
            filteredRestarauntData.push(itemData);
        }
        setFilteredRestarauntItems(filteredRestarauntData);
    }
    const annullFilteredRestaraunt = () => {
        setFilteredRestaraunt({name: ""});
        setFilteredRestarauntItems([]);
    }
    const removeRestarauntItem = (itemId) => {
        const restarauntItems = filteredRestarauntItems.filter(item => item.id !== itemId);
        setFilteredRestarauntItems(restarauntItems);
    }
    const addRestarauntItem = () => {
        const item = {id: Date.now(), name: "New Item", price: 0};
        setFilteredRestarauntItems([...filteredRestarauntItems, item]);
    }
    const saveRestarauntItems = () => {
        const newRestaraunt = {...filteredRestaraunt, items: filteredRestarauntItems};
        patch(UpdateRestaraunt({id: newRestaraunt.id, RestarauntData: newRestaraunt}));
        annullFilteredRestaraunt();
        patch(LoadRestaraunts()); 
        patch(GetAllUsers());
    }
    const revertRestarauntItems = () => {
        setFilteredRestarauntItems(filteredRestaraunt.items || []);
    }
    const enableNameEditing = (item) => {
        const newItems = filteredRestarauntItems.map(i => i.id === item.id ? {...i, isEditingName: !i.isEditingName} : i);
        setFilteredRestarauntItems(newItems);
    }
    const enablePriceEditing = (item) => {
        const newItems = filteredRestarauntItems.map(i => i.id === item.id ? {...i, isEditingPrice: !i.isEditingPrice} : i);
        setFilteredRestarauntItems(newItems);
    }
    const cancelEditingItem = (item) => {
        const newItems = filteredRestarauntItems.map(i => i.id === item.id ? {...i, isEditingName: false, isEditingPrice: false} : i);
        setFilteredRestarauntItems(newItems);
    }
    const addAdminUserToRestaraunt = (userId) => {
        const newRestaraunt = {...filteredRestaraunt, adminIDs: [...(filteredRestaraunt.adminIDs || []), userId]};
        console.log("Adding admin user to restaraunt: ", newRestaraunt);
        patch(UpdateRestaraunt({id: newRestaraunt.id, RestarauntData: newRestaraunt}));
        annullFilteredRestaraunt();
        patch(LoadRestaraunts()); 
        patch(GetAllUsers());
    }
    const removeAdminUserFromRestaraunt = (userId) => {
        const newRestaraunt = {...filteredRestaraunt, adminIDs: (filteredRestaraunt.adminIDs || []).filter(id => id !== userId)};
        console.log("Removing admin user from restaraunt: ", newRestaraunt);
        patch(UpdateRestaraunt({id: newRestaraunt.id, RestarauntData: newRestaraunt}));

        annullFilteredRestaraunt();
        patch(LoadRestaraunts()); 
        patch(GetAllUsers());
    }
    return (
        <div>
            {filteredRestaraunt.name != "" ? (
                <>
                <button onClick={annullFilteredRestaraunt}>Back</button>
                <h2 className="restaraunts-title">{filteredRestaraunt.name}</h2>
                <div className="restaraunts-users-section">
                    <p>Admin Users</p>
                    {allUsers && allUsers.filter(user => filteredRestaraunt.adminIDs.includes(user.id)).map((user) => (
                        <p onContextMenu={(e) => {e.preventDefault(); }} className="restaraunts-user" key={user.id} style={{backgroundColor: "#333"}} onClick={() => { const prompt = window.confirm(`Remove admin user ${user.name}?`); if(prompt) removeAdminUserFromRestaraunt(user.id); }}>{user.id}--{user.name}---{user.email} (Admin)</p>
                    ))}
                    <p>All Users</p>
                    {allUsers && allUsers.filter(user => !filteredRestaraunt.adminIDs.includes(user.id)).map((user) => (
                        <p className="restaraunts-user" key={user.id} style={{backgroundColor: (filteredRestaraunt.adminIDs.includes(user.id) ? "#333" : "black")}} onClick={() => addAdminUserToRestaraunt(user.id)}>{user.id}--{user.name}---{user.email}{filteredRestaraunt.adminIDs.includes(user.id) ? " (Admin)" : ""}</p>
                    ))}
                </div>
                <h4 className="restaraunts-subtitle">Items. Length: {filteredRestarauntItems.length}</h4>
                <div className="selected-restaraunt-items-list-parent">
                <div className="selected-restaraunt-items-list">
                 {filteredRestarauntItems && filteredRestarauntItems.map((item) => (
                    <div key={item.id} className="selected-restaraunt-item">
                        <button onClick={() => removeRestarauntItem(item.id)}>Remove</button>
                        <button onClick={() => cancelEditingItem(item)}>Cancel</button>
                        {item.isEditingName && (<><input type="text" value={item.name} onChange={(e) => {
                            const newItems = filteredRestarauntItems.map(i => i.id === item.id ? {...i, name: e.target.value} : i);
                            setFilteredRestarauntItems(newItems);
                        }}></input><p>${item.price}</p></>)}
                        {item.isEditingPrice && (<><p>{item.name}</p><input type="number" value={item.price} onChange={(e) => {
                            const newItems = filteredRestarauntItems.map(i => i.id === item.id ? {...i, price: parseFloat(e.target.value)} : i);
                            setFilteredRestarauntItems(newItems);
                        }} /></>)}
                        {!item.isEditingName && !item.isEditingPrice && (<><p style={{cursor: "pointer", zIndex: 1}} onClick={() => {
                            enableNameEditing(item);
                        }}>{item.name}:</p><p onClick={() => {
                            enablePriceEditing(item);
                        }}>${item.price}</p></>)}
                    </div>
                ))}
                <div className="selected-restaraunt-item" onClick={addRestarauntItem}>+ Add Item</div>
                </div>
                
                </div>
                <button onClick={saveRestarauntItems}>Save Items</button>
                <button onClick={revertRestarauntItems}>Revert Changes</button>
               

                </>
            ) : (restaraunts.length > 0 ? (
                <>
                 <h2 className="restaraunts-title">Restaraunts</h2>
                <div className="restaraunts-list">
                   
                {console.log(restaraunts)}
                {restaraunts.map((restaraunt) => (
                    <div key={restaraunt.id} className="restaraunt-item" onClick={() => setFilteredRestarauntAsync(restaraunt)}>{restaraunt.name}</div>
                ))}

                </div>
                </>
            ) : (
                <p>No restaraunts available</p>
            ))}
            
        </div>
    );
}