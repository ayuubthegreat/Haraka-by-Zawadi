import { useDispatch, useSelector } from "react-redux"
import { useState } from "react";
import {UpdateRestaraunt, LoadRestaraunts, DeleteRestaraunt} from "../../components/store/orderSlice.js"
import { GetCurrentUser, GetAllUsers } from '../../components/store/authSlice.js'
import "./restaraunts.css"


export const RestarauntsPage = () => {
    const {user, allUsers} = useSelector((state) => state.auth);
    const {orders, loading, restaraunts} = useSelector((state) => state.orders);
    const [filteredRestaraunt, setFilteredRestaraunt] = useState({name: null}); 
    const [filteredRestarauntItems, setFilteredRestarauntItems] = useState([]); 
    const [isEditingRestaraunt, setIsEditingRestaraunt] = useState(false);
    const [isEditingRestarauntName, setIsEditingRestarauntName] = useState(false);
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
    const enableRestarauntNameEditing = () => {
        setIsEditingRestarauntName(true);
        setIsEditingRestaraunt(true);
    }
    const annullRestarauntNameEditing = () => {
        setIsEditingRestarauntName(false);
    }
    const annullFilteredRestaraunt = () => {
        setFilteredRestaraunt({name: null});
        setFilteredRestarauntItems([]);
    }
    const removeRestarauntItem = (itemId) => {
        const restarauntItems = filteredRestarauntItems.filter(item => item.id !== itemId);
        setFilteredRestarauntItems(restarauntItems);
        setIsEditingRestaraunt(true);
    }
    const addRestarauntItem = () => {
        const item = {id: `MAKESHIFT-ID-${Date.now()}`, name: "New Item", price: 0};
        setFilteredRestarauntItems([...filteredRestarauntItems, item]);
        setIsEditingRestaraunt(true);
    }
    const saveRestarauntItems = () => {
        const newRestaraunt = {...filteredRestaraunt, items: filteredRestarauntItems};
        patch(UpdateRestaraunt({id: newRestaraunt.id, RestarauntData: newRestaraunt}));
        setIsEditingRestaraunt(false);
        annullFilteredRestaraunt();
        patch(LoadRestaraunts()); 
        patch(GetAllUsers());
    }
    const revertRestarauntItems = () => {
        setFilteredRestarauntItems(filteredRestaraunt.items || []);
        setIsEditingRestaraunt(false);
    }
    const enableNameEditing = (item) => {
        const newItems = filteredRestarauntItems.map(i => i.id === item.id ? {...i, isEditingName: !i.isEditingName} : i);
        setFilteredRestarauntItems(newItems);
        setIsEditingRestaraunt(true);
    }
    const enablePriceEditing = (item) => {
        const newItems = filteredRestarauntItems.map(i => i.id === item.id ? {...i, isEditingPrice: !i.isEditingPrice} : i);
        setFilteredRestarauntItems(newItems);
        setIsEditingRestaraunt(true);
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
        setIsEditingRestaraunt(true);
    }
    const removeAdminUserFromRestaraunt = (userId) => {
        const newRestaraunt = {...filteredRestaraunt, adminIDs: (filteredRestaraunt.adminIDs || []).filter(id => id !== userId)};
        console.log("Removing admin user from restaraunt: ", newRestaraunt);
        patch(UpdateRestaraunt({id: newRestaraunt.id, RestarauntData: newRestaraunt}));
        annullFilteredRestaraunt();
        patch(LoadRestaraunts()); 
        patch(GetAllUsers());
        setIsEditingRestaraunt(true);
    }
    const deleteRestaraunt = () => {
        const prompt = window.confirm(`Delete restaraunt ${filteredRestaraunt.name}?`);
        if(prompt) {
            patch(DeleteRestaraunt({id: filteredRestaraunt.id}));
            annullFilteredRestaraunt();
            patch(LoadRestaraunts()); 
            patch(GetAllUsers());
            setIsEditingRestaraunt(false);
        }
    }
    return (
        <div>
            {filteredRestaraunt.name != null ? (
                <>
                <div className="restaraunt-buttons">
                    <button onClick={annullFilteredRestaraunt}>Back</button>
                    <button onClick={deleteRestaraunt}>Delete</button>
                </div>
                
               {!isEditingRestarauntName && <h2 className="restaraunts-title" onClick={enableRestarauntNameEditing}>{filteredRestaraunt.name}</h2>}
               {isEditingRestarauntName && (
                   <>
                       <input type="text" value={filteredRestaraunt.name} onChange={(e) => {
                           const newRestaraunt = {...filteredRestaraunt, name: e.target.value};
                           setFilteredRestaraunt(newRestaraunt);
                       }} />
                       <button onClick={annullRestarauntNameEditing}>Cancel</button>
                   </>
               )}
                <div className="restaraunts-users-section">
                    <p>Admin Users</p>
                    {allUsers && allUsers.filter(user => filteredRestaraunt.adminIDs.includes(user.id)).map((user) => (
                        <div onContextMenu={(e) => {e.preventDefault(); }} className="restaraunts-user" key={user.id} style={{backgroundColor: "#333"}}>
                            <button onClick={() => { const prompt = window.confirm(`Remove admin user ${user.name}?`); if(prompt) removeAdminUserFromRestaraunt(user.id); }}>Remove Admin</button>
                            <p>{user.id}--{user.name}---{user.email}</p>
                            </div>
                    ))}
                    <p>All Users</p>
                    {allUsers && allUsers.filter(user => !filteredRestaraunt.adminIDs.includes(user.id)).map((user) => (
                        <div className="restaraunts-user" key={user.id} style={{backgroundColor: (filteredRestaraunt.adminIDs.includes(user.id) ? "#333" : "black")}}>
                            <button onClick={() => addAdminUserToRestaraunt(user.id)}>Add Admin</button>
                            <p>{user.id}--{user.name}---{user.email}{filteredRestaraunt.adminIDs.includes(user.id) ? " (Admin)" : ""}</p>
                            </div>
                    ))}
                </div>
                <h4 className="restaraunts-subtitle">Items. Length: {filteredRestarauntItems.length}</h4>
                <div className="selected-restaraunt-items-list-parent">
                <div className="selected-restaraunt-items-list">
                 {filteredRestarauntItems && filteredRestarauntItems.map((item) => (
                    <div key={item.id} className="selected-restaraunt-item">
                        <button onClick={() => removeRestarauntItem(item.id)}>Remove</button>
                        {(item.isEditingName || item.isEditingPrice) && (<button onClick={() => cancelEditingItem(item)}>Cancel</button>)}
                        {item.isEditingName && (<><input type="text" value={item.name} onChange={(e) => {
                            const newItems = filteredRestarauntItems.map(i => i.id === item.id ? {...i, name: e.target.value} : i);
                            setFilteredRestarauntItems(newItems);
                        }}></input><p>${item.price}</p></>)}
                        {item.isEditingPrice && (<><p>{item.name}</p><input type="number" value={item.price} onChange={(e) => {
                            const newItems = filteredRestarauntItems.map(i => i.id === item.id ? {...i, price: parseFloat(e.target.value)} : i);
                            setFilteredRestarauntItems(newItems);
                        }} /></>)}
                        {!item.isEditingName && !item.isEditingPrice && (<><p className="restaraunt-item-name" title="Edit Item Name" style={{cursor: "pointer", zIndex: 1}} onClick={() => {
                            enableNameEditing(item);
                        }}>{item.name}</p>
                        <p className="restaraunt-item-price" title="Edit Item Price" style={{cursor: "pointer", zIndex: 1}} onClick={() => {
                            enablePriceEditing(item);
                        }}>${item.price}</p></>)}
                    </div>
                ))}
                <div className="selected-restaraunt-item" onClick={addRestarauntItem}>+ Add Item</div>
                </div>
                
                </div>
                {isEditingRestaraunt && (<div className="restaraunt-buttons">
                <button onClick={saveRestarauntItems}>Save Items</button>
                <button onClick={revertRestarauntItems}>Revert Changes</button>
                </div>)}
               

                </>
            ) : (restaraunts.length > 0 ? (
                <>
                 <h2 className="restaraunts-title">Restaraunts</h2>
                <div className="restaraunts-list">
                {console.log(restaraunts)}
                {restaraunts.filter(restaraunt => (restaraunt.adminIDs.includes(user.id) || user.role === "SUPA_ADMIN")).map((restaraunt) => (
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