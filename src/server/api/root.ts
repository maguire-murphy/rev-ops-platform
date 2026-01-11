import { createTRPCRouter } from "@/server/api/trpc";
import { mrrRouter } from "@/server/api/routers/mrr";
import { customerRouter } from "@/server/api/routers/customer";
import { dealsRouter } from "@/server/api/routers/deals";
import { forecastRouter } from "@/server/api/routers/forecast";
import { organizationRouter } from "@/server/api/routers/organization";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
    mrr: mrrRouter,
    customer: customerRouter,
    deals: dealsRouter,
    forecast: forecastRouter,
    organization: organizationRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
