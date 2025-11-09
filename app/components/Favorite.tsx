import { useSubmission } from "@solidjs/router";
import { Show } from "solid-js";
import { api } from "~/defs/api.ts";
import { favoriteContact } from "~/data/actions.ts";

export function Favorite(props: { favorite: boolean; id: string }) {
    const submission = useSubmission(favoriteContact, ([{ contactId }]) => contactId === props.id);
    const favorite = () =>
        submission.pending ? submission.input?.[1].get("favorite") === "true" : props.favorite;

    return (
        <form action={favoriteContact.with({ contactId: props.id })} method="post">
            <button
                aria-label={favorite() ? "Remove from favorites" : "Add to favorites"}
                name="favorite"
                type="submit"
                value={favorite() ? "false" : "true"}
            >
                <Show when={favorite()} fallback={<>☆</>}>
                    ★
                </Show>
            </button>
        </form>
    );
}
