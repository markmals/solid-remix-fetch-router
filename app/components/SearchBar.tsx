import { useIsRouting, useSearchParams } from "@solidjs/router";
import { app } from "~/app";

export function SearchBar() {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = () => searchParams.q as string | undefined;

    const isRouting = useIsRouting();
    const isSearching = () => Boolean(isRouting() && query());

    return (
        <form action={app.index.href()} id="search-form" method="get">
            <input
                aria-label="Search contacts"
                classList={{ loading: isSearching() }}
                value={query() ?? ""}
                id="q"
                name="q"
                onInput={event => {
                    const first = query() === undefined;
                    setSearchParams(
                        { q: event.currentTarget.value || undefined },
                        { replace: !first },
                    );
                }}
                placeholder="Search"
                type="search"
            />
            <div aria-hidden hidden={!isSearching()} id="search-spinner" />
            <div aria-live="polite" class="sr-only" />
        </form>
    );
}
