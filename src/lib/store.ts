import { writable } from "svelte/store";

const status = writable<"unanswered" | "correct" | "wrong">("unanswered");

export { status };
