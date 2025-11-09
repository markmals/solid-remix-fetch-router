import { createAsync, useParams } from "@solidjs/router";
import { JSX, Show } from "solid-js";
import { api } from "~/defs/api";
import { Favorite } from "~/components/Favorite.tsx";
import { destroyContact } from "~/data/actions.ts";
import { showContact } from "~/data/queries.ts";
import { routes } from "~/defs/ui.ts";
import { Title } from "@solidjs/meta";

export default function ShowContact() {
    const params = useParams();
    const contact = createAsync(() => showContact(params.contactId));

    const guardDelete: JSX.EventHandler<EventTarget, Event> = event => {
        if (!confirm("Please confirm you want to delete this record.")) {
            event.preventDefault();
        }
    };

    return (
        <Show when={contact()}>
            {c => {
                const hasAvatar = () => Boolean(c().avatar);
                return (
                    <div id="contact">
                        <Title>{`${c().first} ${c().last} | Remix Contacts`}</Title>
                        <div>
                            <img
                                alt=""
                                src={
                                    hasAvatar()
                                        ? c().avatar
                                        : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                                }
                            />
                        </div>

                        <div>
                            <h1>
                                <Show when={c().first || c().last} fallback={<i>No Name</i>}>
                                    {c().first} {c().last}
                                </Show>{" "}
                                <Favorite favorite={c().favorite!} id={c().id} />
                            </h1>

                            <Show when={c().twitter}>
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

                            <Show when={c().notes}>{notes => <p>{notes()}</p>}</Show>

                            <div>
                                <form
                                    action={routes.contact.edit.href({
                                        contactId: c().id,
                                    })}
                                    method="get"
                                >
                                    <button type="submit">Edit</button>
                                </form>
                                <form
                                    action={destroyContact.with({ contactId: c().id })}
                                    method="post"
                                    onSubmit={guardDelete}
                                >
                                    <button type="submit">Delete</button>
                                </form>
                            </div>
                        </div>
                    </div>
                );
            }}
        </Show>
    );
}
