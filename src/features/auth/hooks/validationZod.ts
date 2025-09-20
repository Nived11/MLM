import { z } from "zod";

export const signupSchema = z
    .object({
        sponsorId: z.string().min(2, "Sponsor ID is required"),
        pincode: z.string().regex(/^\d{6}$/, "Enter a valid 6-digit Pincode"),
        placementId: z.string().min(2, "Placement Id is required"),
        paymentType: z.enum(["GPay", "PhonePe", "Paytm"], {
            message: "Select a valid payment type",
        }),
        firstName: z.string().min(2, "First name is required"),
        upiNumber: z.string().regex(/^\d{10}$/, "Enter a valid 10-digit UPI number"),
        lastName: z.string().min(2, "Last name is required"),

        password: z.string().min(6, "Password must be at least 6 characters").regex(/[A-Za-z]/, "Password must contain at least one letter"),
        confirmPassword: z.string().min(6, "Confirm your password"),
        email: z.string().email("Enter a valid email"),
        mobile: z.string().regex(/^\d{10}$/, "Enter a valid 10-digit Mobile number"),
        amount: z.string().regex(/^\d+$/, "Enter a valid amount"),
        whatsapp: z.string().regex(/^\d{10}$/, "Whatsapp number is required"),
        terms: z.literal(true, {
            message: "You must accept Terms and Conditions",
        }),
    })
    .refine((data) => data.mobile === data.whatsapp, {
        message: "Mobile and WhatsApp number must be the same",
        path: ["whatsapp"],
    });
export type SignupFormData = z.infer<typeof signupSchema>;