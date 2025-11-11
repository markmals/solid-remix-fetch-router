import { useNavigate, useParams } from "@solidjs/router";
import { actions } from "~/data/actions.ts";
import { queries } from "~/data/queries.ts";
import { Title } from "@solidjs/meta";
import { createAsync } from "~/lib/create-async.ts";

export default function EditContact() {
    const navigate = useNavigate();
    const params = useParams();
    const contact = createAsync(() => queries.show(params.contactId));

    return (
        <form
            action={actions.update.with({ contactId: contact().id })}
            id="contact-form"
            method="post"
        >
            <Title>{`Editing ${contact().first} ${contact().last} | Remix Contacts`}</Title>
            <p>
                <span>Name</span>
                <input
                    aria-label="First name"
                    value={contact().first ?? ""}
                    name="first"
                    placeholder="First"
                    type="text"
                />
                <input
                    aria-label="Last name"
                    value={contact().last ?? ""}
                    name="last"
                    placeholder="Last"
                    type="text"
                />
            </p>
            <label>
                <span>𝕏, The Everything App</span>
                <input
                    value={contact().twitter ?? ""}
                    name="twitter"
                    placeholder="@elonmusk"
                    type="text"
                />
            </label>
            <label>
                <span>Avatar URL</span>
                <input
                    aria-label="Avatar URL"
                    value={contact().avatar ?? ""}
                    name="avatar"
                    placeholder="https://example.com/avatar.jpg"
                    type="text"
                />
            </label>
            <label>
                <span>Notes</span>
                <textarea name="notes" rows={6} value={contact().notes ?? ""} />
            </label>
            <p>
                <button type="submit">Save</button>
                <button onClick={() => navigate(-1)} type="button">
                    Cancel
                </button>
            </p>
        </form>
    );
}
