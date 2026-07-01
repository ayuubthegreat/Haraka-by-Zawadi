import { useForm } from "react-hook-form"
import { loginUserSchema, registerUserSchema } from "../../components/store/schema"
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addUser, LoginUser, RegisterUser } from "../../components/store/authSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import '../login-register/login-register.css'

export const LoginPage = () => {
    const patch = useDispatch();
    const nav = useNavigate();
    const {error} = useSelector((state) => state.auth); 
    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        reset,
        formState: { errors }
    } = useForm(loginUserSchema);
        const onSubmit = async (data) =>  {
            console.log("Form Data:", data);
            await patch(LoginUser({user:data})).unwrap();
            nav("/orders");
            patch(addUser(data))
        }
    return (
        <div className="login-page">
            <div className="login-container">
            <h1>Login</h1>
            <p>This is where you can log in to your account.</p>
            <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Email:</label>
                    <input type="text" {...register("email")} />
                    {errors.email && <p style={{color: "red"}}>{errors.email.message}</p>}
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" {...register("password")} />
                    {errors.password && <p style={{color: "red"}}>{errors.password.message}</p>}
                </div>
                <button type="submit">Login</button>
                <p>Don't have an account? <Link to="/register">Register here.</Link></p>
                {error && <p style={{color: "red"}}>{error}. Please try again.</p>}
            </form>
            </div>
        </div>
    )
}

export const RegisterPage = () => {
    const patch = useDispatch();
    const nav = useNavigate();
    const {error} = useSelector((state) => state.auth); 
    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        reset,
        formState: { errors }
    } = useForm(registerUserSchema);
    const onSubmit = async (data) =>  {
        console.log("Form Data:", data);
        await patch(RegisterUser({user: data})).unwrap();
        nav("/login");

    }
    return (
        <div className="register-page">
            <div className="register-container">
            <h1>Register</h1>
            <p>This is where you can create a new account.</p>
            <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Username:</label>
                    <input type="text" {...register("username")} />
                    {errors.username && <p style={{color: "red"}}>{errors.username.message}</p>}
                </div>
                <div>
                    <label>Email:</label>
                    <input type="text" {...register("email")} />
                    {errors.email && <p style={{color: "red"}}>{errors.email.message}</p>}
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" {...register("password")} />
                    {errors.password && <p style={{color: "red"}}>{errors.password.message}</p>}
                </div>
                <button type="submit">Register</button>
                <p>Already have an account? <Link to="/login">Login here.</Link></p>
                {error && <p style={{color: "red"}}>{error}</p>}
            </form>
            </div>
        </div>
    )
}