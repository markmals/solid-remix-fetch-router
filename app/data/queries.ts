import { query } from "@solidjs/router";
import { api } from "~/api";
import type { ContactRecord } from "~/worker/contacts";
import { createClient } from "~/lib/fetch-client.ts";

export const client = createClient(api);

export const queries = {
    list: query(
        (query?: string) =>
            client.contact.list.fetch<ContactRecord[]>({ search: { q: query ?? "" } }),
        client.contact.list.key,
    ),
    show: query(
        (id: string) => client.contact.show.fetch<ContactRecord>({ path: { contactId: id } }),
        client.contact.show.key,
    ),
};
