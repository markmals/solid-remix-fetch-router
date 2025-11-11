import { useSubmission } from "@solidjs/router";
import { Show } from "solid-js";
import { actions } from "~/data/actions.ts";

export function Favorite(props: { favorite: boolean; id: string }) {
    const submission = useSubmission(actions.favorite, ([{ contactId }]) => contactId === props.id);
    const input = () => {
        const [, input] = submission.input ?? [];
        return input;
    };

    const favorite = () =>
        submission.pending ? input()?.get("favorite") === "true" : props.favorite;

    return (
        <form action={actions.favorite.with({ contactId: props.id })} method="post">
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
