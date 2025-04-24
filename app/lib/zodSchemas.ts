import { doorone } from "@prisma/client";
import { z } from "zod";

export const productSchema = z.object({
  name: z.string(),
  description: z.string().default("Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"),
  category: z.enum(["Doors", "Windows"]),
  originalprice: z.number().min(1),
  discountprice: z.number().min(1),
  images: z.array(z.string()).min(1, "At least one image is required"),
  category1: z.enum(["singledoor", "doubledoor", "fourfolding", "motherandson","none"]).default("none"),
  category2: z.enum(["normalhandle","fridgehandle", "barhandle","none"]).default("none"),
  category3: z.enum(["singlelock","multilock","smartlock","none"]).default("none"),
  category4: z.enum(["GI","SS304","none"]).default("none"),
  ispremium: z.boolean().optional(),
  stars:  z.number().min(1),
  colors:z.array(z.string()).min(1, "At least one color is required"),
  dimensions: z.string().default("34 x 56 X 78 cm"),
  material: z.string().default("premium wood.."),
  warranty: z.string().default("3 years"),
  longdescription: z.string().default("your long description goes here.."),
  isstock: z.boolean().default(false),
  reviews: z.array(z.object({
    name: z.string(),star: z.number().min(1),review: z.string()
  })),

});


// Separate Schema for adding a Review later (e.g., by a customer)
export const reviewSchema = z.object({
  productId: z.string().uuid("Invalid Product ID"),
  name: z.string().min(1, "Reviewer name is required"),
  star: z.number().int().min(1).max(5),
  review: z.string().min(10, "Review must be at least 10 characters"),
});
