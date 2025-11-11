import { api } from "~/api";
import { formAction } from "~/lib/form-action.ts";

export const actions = {
    create: formAction(api.contact.create),
    update: formAction(api.contact.update),
    favorite: formAction(api.contact.favorite),
    destroy: formAction(api.contact.destroy),
};
