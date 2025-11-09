import { createAsync, useNavigate, useParams } from "@solidjs/router";
import { Show } from "solid-js";
import { updateContact } from "~/data/actions.ts";
import { showContact } from "~/data/queries.ts";
import { Title } from "@solidjs/meta";

export default function EditContact() {
    const navigate = useNavigate();
    const params = useParams();
    const contact = createAsync(() => showContact(params.contactId));

    return (
        <Show when={contact()}>
            {c => (
                <form
                    action={updateContact.with({ contactId: c().id })}
                    id="contact-form"
                    method="post"
                >
                    <Title>{`Editing ${c().first} ${c().last} | Remix Contacts`}</Title>
                    <input type="hidden" name="id" value={c().id} />
                    <p>
                        <span>Name</span>
                        <input
                            aria-label="First name"
                            value={c().first ?? ""}
                            name="first"
                            placeholder="First"
                            type="text"
                        />
                        <input
                            aria-label="Last name"
                            value={c().last ?? ""}
                            name="last"
                            placeholder="Last"
                            type="text"
                        />
                    </p>
                    <label>
                        <span>𝕏, The Everything App</span>
                        <input
                            value={c().twitter ?? ""}
                            name="twitter"
                            placeholder="@elonmusk"
                            type="text"
                        />
                    </label>
                    <label>
                        <span>Avatar URL</span>
                        <input
                            aria-label="Avatar URL"
                            value={c().avatar ?? ""}
                            name="avatar"
                            placeholder="https://example.com/avatar.jpg"
                            type="text"
                        />
                    </label>
                    <label>
                        <span>Notes</span>
                        <textarea name="notes" rows={6} value={c().notes ?? ""} />
                    </label>
                    <p>
                        <button type="submit">Save</button>
                        <button onClick={() => navigate(-1)} type="button">
                            Cancel
                        </button>
                    </p>
                </form>
            )}
        </Show>
    );
}
