<script lang="ts">
  import { waitMs, type SubmitEvent } from "$lib/constants";
  import { onMount } from "svelte";
  import Form from "./[slug]/form.svelte";

  let ref: HTMLInputElement;
  let numbers: number[] = [];
  let stop: boolean = false;
  let status: "correct" | "wrong" | "unanswered" = "unanswered";

  const demo = async () => {
    status = "unanswered";
    numbers = [];
    await waitMs(1500);

    numbers = new Array(4);

    const arr = [1, 2, 2];
    for (let index = 0; index < arr.length; index++) {
      numbers = [...numbers, arr[index] ?? 0];
      await waitMs(300);
    }

    status = "wrong";
    await waitMs(1500);
    numbers.pop();
    numbers = [...numbers, 3];
    status = "correct";
  };

  onMount(async () => {
    ref.focus();

    for (let index = 0; index < 10; index++) {
      if (stop) break;
      await demo();
      await waitMs(5000);
    }
  });

  const transition = (event: SubmitEvent) => {
    const name = ref.value;
    console.log(name);
    if (!name || !name.match(/\S/g)) {
      event.preventDefault();
    }
    stop = true;
    window.location.href = `/${name}`;
  };
</script>

<main class:correct={status === "correct"} class:wrong={status === "wrong"}>
  <div class="container">
    <Form name="オレオレ123" {numbers} needFocus={false} />
    <div class="info">
      <form on:submit|preventDefault={transition}>
        <input
          type="text"
          placeholder="お前のハンドルネームを入力せよ"
          required
          bind:this={ref}
        />
        <button type="submit">はじめる →</button>
      </form>
    </div>
  </div>
</main>

<style lang="scss">
  main {
    height: 100%;
    width: 100%;
    display: table;
    transition: background-color 0.6s ease-in-out, color 0.6s ease-in-out;

    &.correct {
      background-color: #5fd831;
      color: white;
    }

    &.wrong {
      background-color: #ff654c;
      color: white;
    }

    .container {
      display: table-cell;
      vertical-align: middle;

      .info {
        padding: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

    input {
      margin-top: 1rem;
      margin-right: 1rem;

      width: 250px;
      padding: 0.5rem 1rem;
      font-size: 1rem;
      border: 1px solid black;
      border-radius: 0.25rem;
      background-color: white;
      color: black;
    }

    button {
      margin-top: 1rem;
      padding: 0.5rem 1rem;
      font-size: 1rem;
      border: 1px solid black;
      border-radius: 0.25rem;
      background-color: white;
      color: black;
      cursor: pointer;
      transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;

      &:hover {
        background-color: black;
        color: white;
      }
    }
  }
</style>
