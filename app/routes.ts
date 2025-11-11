import { lazy } from "solid-js";
import type { RouteDefinition } from "@solidjs/router";
import { queries } from "~/data/queries.ts";
import { app } from "~/app.ts";

export const routes: RouteDefinition[] = [
    {
        path: app.root.pattern.toString(),
        preload: ({ location }) => queries.list(location.query.q as string),
        component: lazy(() => import("~/routes/root.tsx")),
        children: [
            {
                path: app.index.pattern.toString(),
                component: lazy(() => import("~/routes/index.tsx")),
            },
            {
                path: app.contact.show.pattern.toString(),
                preload: ({ params }) => queries.show(params.contactId),
                component: lazy(() => import("~/routes/show-contact.tsx")),
            },
            {
                path: app.contact.edit.pattern.toString(),
                preload: ({ params }) => queries.show(params.contactId),
                component: lazy(() => import("~/routes/edit-contact.tsx")),
            },
        ],
    },
];
