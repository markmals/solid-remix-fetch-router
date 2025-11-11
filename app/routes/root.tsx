import { type ParentProps, Suspense } from "solid-js";
import { useIsRouting } from "@solidjs/router";
import { Link, Title } from "@solidjs/meta";

import { actions } from "~/data/actions.ts";
import { SearchBar } from "~/components/SearchBar.tsx";
import { Sidebar } from "~/components/Sidebar.tsx";

import styles from "~/index.css?url";
import { useInstallGlobalNavigation } from "~/lib/use-install-global-nav.ts";

export default function Root(props: ParentProps) {
    useInstallGlobalNavigation();
    const isRouting = useIsRouting();

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
                        <form action={actions.create} method="post">
                            <button type="submit">New</button>
                        </form>
                    </div>
                    <Sidebar />
                </div>
                <div classList={{ loading: isRouting() }} id="detail">
                    {props.children}
                </div>
            </Suspense>
        </>
    );
}
