/* @refresh reload */

import { render } from "solid-js/web";
import { Router } from "@solidjs/router";
import { MetaProvider } from "@solidjs/meta";
import "solid-devtools";

import { defs } from "./defs/routes.ts";

if (!navigator.serviceWorker.controller) {
    await navigator.serviceWorker.register(
        import.meta.env.DEV ? "/entry.worker.ts" : "/entry.worker.js",
        { type: "module" },
    );
    window.location.reload();
} else {
    render(
        () => (
            <MetaProvider>
                <Router>{defs}</Router>
            </MetaProvider>
        ),
        document.body,
    );
}
