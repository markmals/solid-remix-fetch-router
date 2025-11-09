import { query } from "@solidjs/router";
import { api } from "~/defs/api.ts";
import { ContactRecord } from "~/data/contacts";
import { createClient } from "~/lib/fetch-client.ts";

export const client = createClient(api);

export const listContacts = query(
    (query?: string) => client.contact.list.fetch<ContactRecord[]>({ search: { q: query ?? "" } }),
    client.contact.list.key,
);

export const showContact = query(
    (id: string) => client.contact.show.fetch<ContactRecord>({ path: { contactId: id } }),
    client.contact.show.key,
);
