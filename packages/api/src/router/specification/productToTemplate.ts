import { z } from "zod";
import { ProductToTemplate } from "@acme/db";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../../trpc";

export const productToTemplateRouter = createTRPCRouter({
});