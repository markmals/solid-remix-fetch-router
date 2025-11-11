import { useParams } from "@solidjs/router";
import { type JSX, Show } from "solid-js";
import { Favorite } from "~/components/Favorite.tsx";
import { actions } from "~/data/actions.ts";
import { queries } from "~/data/queries.ts";
import { app } from "~/app";
import { Title } from "@solidjs/meta";
import { createAsync } from "~/lib/create-async.ts";

export default function ShowContact() {
    const params = useParams();
    const contact = createAsync(() => queries.show(params.contactId));

    const guardDelete: JSX.EventHandler<EventTarget, Event> = event => {
        if (!confirm("Please confirm you want to delete this record.")) {
            event.preventDefault();
        }
    };

    return (
        <div id="contact">
            <Title>{`${contact().first} ${contact().last} | Remix Contacts`}</Title>
            <div>
                <img
                    alt=""
                    src={
                        contact().avatar ||
                        "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                    }
                />
            </div>

            <div>
                <h1>
                    <Show when={contact().first || contact().last} fallback={<i>No Name</i>}>
                        {contact().first} {contact().last}
                    </Show>{" "}
                    <Favorite favorite={contact().favorite!} id={contact().id} />
                </h1>

                <Show when={contact().twitter}>
                    {twitter => (
                        <p>
                            <a
                                href={`https://xcancel.com/${twitter().slice(1, twitter().length)}`}
                                rel="noreferrer"
                                target="_blank"
                            >
                                {twitter()}
                            </a>
                        </p>
                    )}
                </Show>

                <Show when={contact().notes}>{notes => <p>{notes()}</p>}</Show>

                <div>
                    <form
                        action={app.contact.edit.href({
                            contactId: contact().id,
                        })}
                        method="get"
                    >
                        <button type="submit">Edit</button>
                    </form>
                    <form
                        action={actions.destroy.with({ contactId: contact().id })}
                        method="post"
                        onSubmit={guardDelete}
                    >
                        <button type="submit">Delete</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
