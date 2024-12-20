import { z } from "zod";


// Zod registration
export const ZodSignupValidator = z.object({
    email: z.string({ required_error: "Email is required." }).email("Invalid email format").trim(),
    password: z.string({ required_error: "Password is required." }).trim().min(8, "Password must be at least 8 characters."),
})

export type ZodSignupSchemaType = z.infer<typeof ZodSignupValidator>

// Zod login
export const ZodLoginValidator = z.object({
    email: z.string({ required_error: "Email is required." }).email("Invalid email format").trim(),
    password: z.string({ required_error: "Password is required." }).trim().min(8, "Password must be at least 8 characters."),
})

export type ZodLoginSchemaType = z.infer<typeof ZodLoginValidator>

// Zod Email validation
export const ZodEmailValidation = z.object({
    otp: z.string({ required_error: "OTP is required for the validation." }).trim()
})

export type ZodEmailValidationSchemaType = z.infer<typeof ZodEmailValidation>;


// Zod Product validation
export const ZodProductValidation = z.object({
    productName: z.string({ required_error: "Product name is required to create the product." }).trim(),
    productDescription: z.string({ required_error: "Product description is required to create the product." }).trim(),
    brand: z.string({ required_error: "Product brand is required to create the product." }).trim(),
    productRating: z.number({ required_error: "Product rating is required to create the product." }).min(1, { message: "Value can't be below 1." }).max(5, { message: "value can't excid 5" }),
    productPrice: z.number({ required_error: "Product price is required to create the product." }).min(0,{message:"product price can't be negative."}),
    productCategory: z.string({ required_error: "Product category is required to create the product." }).trim(),
    discount: z.number({ required_error: "discount is required to create the product." }).min(0,{message:"Dicount can't be negative."}),
    stock: z.number({ required_error: "stock is required to create the product." }).min(0,{message:"stock cant be negative."}),
})

export type ZodProductValidationSchemaType = z.infer<typeof ZodProductValidation>


export const ZodUpdateProductValidation = z.object({
    ProductName: z.string({ required_error: "Product name is required to update the product information" }).trim(),
    Rating: z.number({ required_error: "Product rating is required to update the product information" }).min(1, { message: "Value can't be below 1." }).max(5, { message: "value can't excid 5" }),
    Price: z.number({ required_error: "Product price is required to update the product information" }),
    Discount: z.number({ required_error: "Product discount is required to update the product information" }),
    StockQuantity: z.number({ required_error: "Product StockQuantity is required to update the product information" }),
    Brand: z.string({ required_error: "Product Brand is required to update the product information" }).trim(),
    Category: z.string({ required_error: "Product Category is required to update the product information" }).trim(),
    Description: z.string({ required_error: "Product Description is required to update the product information" }).trim()
})

export type ZodUpdateProductValidationSchemaType = z.infer<typeof ZodUpdateProductValidation>

// Zod user information validation
export const ZodUserInfoValidation = z.object({
    FullName: z.string({ required_error: "" }),
    Phone: z.number({ required_error: "" }),
    Street: z.string({ required_error: "" }),
    PostalCode: z.string({ required_error: "" }),
    City: z.string({ required_error: "" }),
    State: z.string({ required_error: "" }),
    Country: z.string({ required_error: "" }),
    DateOfBirth: z.string({ required_error: "" }),
    Gender: z.string({ required_error: "" })
})

export type ZodUserInfoValidationSchemaType = z.infer<typeof ZodUserInfoValidation>

// enum Gender {
//     Male = "male",
//     Female = "female",
//     Other = "other"
// }
