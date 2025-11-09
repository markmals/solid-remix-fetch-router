import { ParentProps, Suspense } from "solid-js";
import { useIsRouting, useNavigate } from "@solidjs/router";
import { Link, Title } from "@solidjs/meta";
import { on } from "@remix-run/interaction";

import { createContact } from "~/data/actions.ts";
import { SearchBar } from "~/components/SearchBar.tsx";
import { Sidebar } from "~/components/Sidebar.tsx";

import styles from "~/index.css?url";

export default function Root(props: ParentProps) {
    const isRouting = useIsRouting();
    const navigate = useNavigate();

    on(document, {
        submit(event) {
            if (!(event.target instanceof HTMLFormElement)) return;
            if (event.target.method.toUpperCase() === "POST") return;
            if (event.defaultPrevented) return;

            event.preventDefault();
            navigate(new URL(event.target.action).pathname);
        },
    });

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
