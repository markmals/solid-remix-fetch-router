import { useIsRouting, useNavigate } from "@solidjs/router";
import { ParentProps, Suspense } from "solid-js";
import { createContact } from "~/data/actions.ts";
import { SearchBar } from "~/components/SearchBar.tsx";
import { Sidebar } from "~/components/Sidebar.tsx";
import { events } from "@remix-run/events";
import { doc } from "~/lib/targets.ts";
import { Link, Title } from "@solidjs/meta";

import styles from "../index.css?url";

export default function Root(props: ParentProps) {
    const isRouting = useIsRouting();
    const navigate = useNavigate();

    events(document, [
        doc.submit<HTMLFormElement>(event => {
            if (event.target.method.toUpperCase() === "POST") return;
            if (event.defaultPrevented) return;
            event.preventDefault();
            navigate(new URL(event.target.action).pathname);
        }),
    ]);

    return (
        <>
            <Title>Remix Contacts</Title>
            <Link rel="stylesheet" href={styles} />
            <Link rel="icon" type="image/svg+xml" href="/favicon.svg" />

            <Suspense fallback={<p class="loading">Loading...</p>}>
                <div id="sidebar">
                    <h1>Remix Contacts</h1>
                    <div>
                        <SearchBar />
                        <form action={createContact} method="post">
                            <button type="submit">New</button>
                        </form>
                    </div>
                    <Sidebar />
                </div>
                <div class={isRouting() ? "loading" : undefined} id="detail">
                    {props.children}
                </div>
            </Suspense>
        </>
    );
}
