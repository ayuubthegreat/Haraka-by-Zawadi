import { useForm } from "react-hook-form"
import { loginUserSchema, registerUserSchema } from "../components/store/schema"
import { useDispatch } from "react-redux";
import { addUser, LoginUser, RegisterUser } from "../components/store/authSlice";
import { useNavigate } from "react-router-dom";


export const LoginPage = () => {
    const patch = useDispatch();
    const nav = useNavigate();
    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        reset
    } = useForm(loginUserSchema);
        const onSubmit = async (data) =>  {
            console.log("Form Data:", data);
            await patch(LoginUser({user:data})).unwrap();
            nav("/orders");
            patch(addUser(data))
        }
    return (
        <div className="login-page">
            <h1>Login</h1>
            <p>This is where you can log in to your account.</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Email:</label>
                    <input type="text" {...register("email")} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" {...register("password")} />
                </div>
                <button type="submit">Login</button>
                
            </form>
        </div>
    )
}

export const RegisterPage = () => {
    const patch = useDispatch();
    const nav = useNavigate();
    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        reset
    } = useForm(registerUserSchema);
    const onSubmit = async (data) =>  {
        console.log("Form Data:", data);
        await patch(RegisterUser({user: data})).unwrap();
        nav("/login");

    }
    return (
        <div className="register-page">
            <h1>Register</h1>
            <p>This is where you can create a new account.</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Username:</label>
                    <input type="text" {...register("username")} />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="text" {...register("email")} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" {...register("password")} />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    )
}