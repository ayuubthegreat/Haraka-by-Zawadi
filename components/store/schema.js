import z from "zod"


export const menuItems = [
    "Burger",
    "Pizza",
    "Pasta",
    "Salad",
    "Sushi",
]
export const orderTemplate = {
    menuItem: "",
    quantity: 1,
}
export const restarauntTemplate = {
    name: ""
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