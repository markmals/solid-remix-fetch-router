import type { RouteHandlers } from "@remix-run/fetch-router";
import {
    getContacts,
    getContact,
    deleteContact,
    updateContact,
    createEmptyContact,
} from "./contacts";
import { api } from "~/api";
import { app } from "~/app";
import { json, redirect } from "@remix-run/fetch-router/response-helpers";

export const handlers = {
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
} satisfies RouteHandlers<typeof api>;
