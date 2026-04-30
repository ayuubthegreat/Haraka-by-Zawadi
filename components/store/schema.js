import z from "zod"


export const menuItemsAndPrices = [
    { name: "Burger", price: 250 },
    { name: "Pizza", price: 300 },
    { name: "Pasta", price: 200 },
    { name: "Salad", price: 150 },
    { name: "Sushi", price: 400 },
]
export const orderTemplate = {
    menuItem: "",
    quantity: 1,
}
export const restarauntTemplate = {
    name: "My Restaraunt",
    items: menuItemsAndPrices,
}
export const restarauntSchema = z.object({
    id: z.int(),
    name: z.string(),
})

export const orderSchema = z.object({
    id: z.int(),
    user: z.string(),
    menuItem: z.string(),
    orderedTime: z.int()
})
export const loginUserSchema = z.object({
    email: z.string(),
    password: z.string(),
})
export const registerUserSchema = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string(),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
})