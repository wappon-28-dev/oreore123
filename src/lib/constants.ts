const waitMs = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const isNumeric = (n: string) => !!Number(n);
const containsNumeric = (n: string) => /\d/.test(n);

type SubmitEvent = Event & {
  readonly submitter: HTMLElement | null;
} & {
  currentTarget: EventTarget & HTMLFormElement;
};

type InputEvent = Event & {
  currentTarget: EventTarget & HTMLInputElement;
};

export { waitMs, isNumeric, containsNumeric };
export type { SubmitEvent, InputEvent };
