import { createRoutes } from "@remix-run/fetch-router";

export const app = createRoutes({
    root: "/",
    index: "/",
    contact: {
        show: "/contact/:contactId",
        edit: "/contact/:contactId/edit",
    },
});
