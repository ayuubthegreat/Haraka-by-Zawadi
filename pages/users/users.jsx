import { useEffect } from "react"
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { GetAllUsers, UpdateUser, DeleteUser } from "../../components/store/authSlice";
import '../../pages/users/users.css'
const UsersPage = () => {
    const dispatch = useDispatch();
    const {allUsers: users} = useSelector((state) => state.auth);
    useEffect(() => {
        dispatch(GetAllUsers());
        window.document.title = `Users Page`;
    }, [dispatch, users]);
    const updateUserRole = (userId, userData) => {
        dispatch(UpdateUser({userId, userData}));
    } 
    const deleteUser = (userId) => {
        dispatch(DeleteUser({userId}));
    } 
    return (
        <div>
            <h1>Users Page</h1>
            <div className="users-list">
            {users && users.map((user) => (
                <>
                 <div key={user.id} className="user-card">
                    <p>{user.name}</p>
                    <p>{user.email}</p>
                    <p>{user.role}</p>
                    {user.role === 'user' && <button onClick={() => updateUserRole(user.id, {role: 'admin'})}>Make Admin</button>}
                    {user.role !== 'SUPA_ADMIN' && <button onClick={() => deleteUser(user.id)}>Delete</button>}
                </div>
                </>
            ))}
        </div>
        </div>
    )
}
export default UsersPage;