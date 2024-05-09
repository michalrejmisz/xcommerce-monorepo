import { z } from "zod";
import { ProductSpecification } from "@acme/db";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../../trpc";

export const productSpecificationRouter = createTRPCRouter({
});