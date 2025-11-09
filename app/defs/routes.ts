import { lazy } from "solid-js";
import type { RouteDefinition } from "@solidjs/router";
import { listContacts, showContact } from "~/data/queries.ts";
import { routes } from "./ui.ts";

export const defs: RouteDefinition[] = [
    {
        path: routes.root.pattern.toString(),
        preload: ({ location }) => listContacts(location.query.q as string),
        component: lazy(() => import("~/routes/root.tsx")),
        children: [
            {
                path: routes.index.pattern.toString(),
                component: lazy(() => import("~/routes/index.tsx")),
            },
            {
                path: routes.contact.show.pattern.toString(),
                preload: ({ params }) => showContact(params.contactId),
                component: lazy(() => import("~/routes/show-contact.tsx")),
            },
            {
                path: routes.contact.edit.pattern.toString(),
                preload: ({ params }) => showContact(params.contactId),
                component: lazy(() => import("~/routes/edit-contact.tsx")),
            },
        ],
    },
];
