import { resources, createRoutes } from "@remix-run/fetch-router";

export const api = createRoutes("/api", {
    contact: {
        ...resources("/contact", {
            only: ["index", "show", "destroy", "update", "create"],
            names: { index: "list" },
            param: "contactId",
        }),
        favorite: { method: "PUT", pattern: "/contact/:contactId/favorite" },
    },
});
