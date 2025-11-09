import { A, createAsync, useIsRouting, useLocation } from "@solidjs/router";
import { createSignal, For, Show } from "solid-js";
import { listContacts } from "~/data/queries.ts";
import { ContactRecord } from "~/data/contacts";
import { routes } from "~/defs/ui";

const [pendingHref, setPendingHref] = createSignal<string>("");

export function Sidebar() {
    const location = useLocation();
    const contacts = createAsync(() => listContacts(location.query.q as string));

    return (
        <nav>
            <For each={contacts()} fallback={<i>No contacts</i>}>
                {contact => <SidebarItem contact={contact} />}
            </For>
        </nav>
    );
}

function SidebarItem(props: { contact: ContactRecord }) {
    const isRouting = useIsRouting();
    const location = useLocation();

    const link = () =>
        routes.contact.show.href({
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
