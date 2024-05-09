import { z } from "zod";
import { ProductCategory } from "@acme/db";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const Product = createTRPCRouter({
});