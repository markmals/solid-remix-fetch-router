import { createRouter } from "@remix-run/fetch-router";
import { formData } from "@remix-run/fetch-router/form-data-middleware";
import { logger } from "@remix-run/fetch-router/logger-middleware";
import {
    getContacts,
    getContact,
    deleteContact,
    updateContact,
    createEmptyContact,
} from "~/data/contacts.ts";
import { api } from "~/defs/api.ts";
import { app } from "~/defs/app.ts";
import { clientRedirect, methodOverride } from "./middleware.ts";
import { json, redirect } from "@remix-run/fetch-router/response-helpers";

export const router = createRouter({
    middleware: [
        formData(),
        methodOverride(),
        clientRedirect(),
        ...(import.meta.env.DEV ? [logger()] : []),
    ],
});

router.map(api, {
    contact: {
        list: async ({ url }) => {
            const query = url.searchParams.get("q");
            return json(await getContacts(query));
        },
        show: async ({ params }) => json(await getContact(params.contactId)),
        destroy: async ({ params }) => {
            await deleteContact(params.contactId);
            return redirect(app.index.href());
        },
        update: async ({ params, formData }) => {
            const contact = await updateContact(params.contactId, {
                first: formData.get("first") as string,
                last: formData.get("last") as string,
                twitter: formData.get("twitter") as string,
                avatar: formData.get("avatar") as string,
                notes: formData.get("notes") as string,
            });
            return redirect(app.contact.show.href({ contactId: contact.id }));
        },
        create: async () => {
            await createEmptyContact();
            return redirect(app.index.href());
        },
        favorite: async ({ params, formData, url }) => {
            await updateContact(params.contactId, {
                favorite: formData.get("favorite") === "true",
            });
            return new Response(null);
        },
    },
});
