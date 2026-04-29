import z from "zod"

export const orderTemplate = {
    id: Math.random() * 100000,
    user: "User",
    menuItem: "Chicken Quesadilla",
    orderedTime: 0,
}


export const orderSchema = z.object({
    id: z.int(),
    user: z.string(),
    menuItem: z.string(),
    orderedTime: z.int()
})