import { events } from "@remix-run/events";
import { worker } from "~/lib/targets.ts";
import { router } from "~/worker/router";

declare const self: ServiceWorkerGlobalScope;

events(self, [
    worker.global.fetch(event => {
        const url = new URL(event.request.url);
        const sameOrigin = url.origin === location.origin;
        const maybeApi = url.pathname.startsWith("/api/");

        // Only handle same-origin API requests
        if (!sameOrigin || !maybeApi) return;

        event.respondWith(router.fetch(event.request));
    }),
]);
