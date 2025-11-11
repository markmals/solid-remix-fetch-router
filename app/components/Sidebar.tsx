import { A, useIsRouting, useLocation } from "@solidjs/router";
import { createSignal, For, Show } from "solid-js";
import { queries } from "~/data/queries.ts";
import type { ContactRecord } from "~/worker/contacts";
import { app } from "~/app";
import { createAsync } from "~/lib/create-async.ts";

const [pendingHref, setPendingHref] = createSignal<string>("");

export function Sidebar() {
    const location = useLocation();
    const contacts = createAsync(() => queries.list(location.query.q as string));

    return (
        <nav>
            <ul>
                <For each={contacts()} fallback={<i>No contacts</i>}>
                    {contact => <SidebarItem contact={contact} />}
                </For>
            </ul>
        </nav>
    );
}

function SidebarItem(props: { contact: ContactRecord }) {
    const isRouting = useIsRouting();
    const location = useLocation();

    const link = () =>
        app.contact.show.href({
            contactId: String(props.contact.id),
        }) + location.search;

    const isPending = () => isRouting() && pendingHref() === link();

    return (
        <li>
            <A
                activeClass="active"
                classList={{ pending: isPending() }}
                href={link()}
                onClick={() => setPendingHref(link())}
                // Only to show transitionsn more clearly
                // Don't disable link preloading in real apps
                // (unless you have a really good reason)
                preload={false}
            >
                <Show when={props.contact.first || props.contact.last} fallback={<i>No Name</i>}>
                    {props.contact.first} {props.contact.last}
                </Show>
                <Show when={props.contact.favorite}>
                    <span>★</span>
                </Show>
            </A>
        </li>
    );
}
