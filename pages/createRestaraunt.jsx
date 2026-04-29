import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux"
import { restarauntTemplate } from "../components/store/schema";




export const CreateRestarauntPage = () => {
    const dptch = useDispatch();
    const {
        handleSubmit,
        register,
        reset,
        setValues,
    } = useForm({
        defaultValues: restarauntTemplate
    })
    const onSubmit = async (data) => {
        console.log("Form Data:", data);
        await dptch(CreateRestaraunt(data)).unwrap();
    }
    return (
        <div className="create-restaraunt-page">
            <h1>Create Restaraunt</h1>
            <p>This is where you can create a new restaraunt.</p>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label>Name:</label>
                        <input type="text" {...register("name")} />
                    </div>
                    <button type="submit">Create Restaraunt</button>
                </form>
            </div>
        </div>
    )
}