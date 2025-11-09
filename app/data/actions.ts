import { api } from "~/defs/api";
import { formAction } from "~/lib/form-action.ts";

export const createContact = formAction(api.contact.create);
export const updateContact = formAction(api.contact.update);
export const favoriteContact = formAction(api.contact.favorite);
export const destroyContact = formAction(api.contact.destroy);
