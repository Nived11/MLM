import { z } from "zod";

export const searchSchema = z.string().min(1, "Search cannot be empty").refine((val) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const userIdRegex = /^[A-Z]{2}\d+$/;
  const nameRegex = /^[a-zA-Z\s]+$/; 

  return emailRegex.test(val) || userIdRegex.test(val) || nameRegex.test(val);
}, "Enter a valid email, name, or user ID");
