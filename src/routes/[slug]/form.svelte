<script lang="ts">
  import { isNumeric, type InputEvent } from "$lib/constants";
  import { status } from "$lib/store";
  import { onMount } from "svelte";
  export let name: string;
  export let numbers: number[] = [];
  export let needFocus: boolean | undefined = true;

  let inputElements: HTMLInputElement[] | undefined;
  let focusIndex: number = 0;

  onMount(() => {
    inputElements = Array.from(document.querySelectorAll("input"));
    if (needFocus) inputElements[focusIndex]?.focus();
  });

  const increment = (index: number) => {
    let value = numbers[index];
    if (value !== undefined) {
      value++;
    } else {
      value = 0;
    }
    numbers[index] = value;
  };

  const decrement = (index: number) => {
    let value = numbers[index];
    if (value !== undefined) {
      value--;
    } else {
      value = 0;
    }
    numbers[index] = value;
  };

  const focusNext = (event: InputEvent, index: number) => {
    let value = numbers[index];

    if (
      inputElements === undefined ||
      event.currentTarget.value === "" ||
      value === undefined
    ) {
      return;
    }

    if (event.currentTarget.valueAsNumber >= 10) {
      event.currentTarget.value = String(value)[1] ?? "";
      value = Number(event.currentTarget.value);
    }

    if (index == numbers.length - 1) {
      event.currentTarget.blur();
    }

    numbers[index] = value;
    focusIndex++;
    if (needFocus) {
      inputElements[focusIndex]?.focus();
    }
  };

  $: {
    const strNum = name.match(/\d/g)?.map(Number);
    const arrNum = numbers.filter((num) => num !== undefined) as number[];

    if (JSON.stringify(arrNum) === JSON.stringify(strNum)) {
      $status = "correct";
    } else {
      $status = "wrong";
    }

    if (numbers.length === 0 || arrNum?.length < (strNum?.length ?? 0)) {
      $status = "unanswered";
    }

    if (!numbers.length) {
      focusIndex = 0;
      if (inputElements && needFocus) {
        inputElements[focusIndex]?.focus();
      }
    }
  }
</script>

<div class="field">
  {#each name as char, index}
    {#if isNumeric(char)}
      <div class="input-container">
        <button
          on:click={() => increment(index)}
          disabled={(numbers[index] ?? 0) >= 9}>▲</button
        >
        <input
          class="no-spin"
          type="number"
          bind:value={numbers[index]}
          on:input={(event) => focusNext(event, index)}
          tabindex={index}
        />
        <button
          on:click={() => decrement(index)}
          disabled={numbers[index] === undefined || numbers[index] === 0}
          >▼</button
        >
      </div>
    {:else}
      <div>{char}</div>
    {/if}
  {/each}
</div>

<style lang="scss">
  .field {
    padding: 20px;
    display: flex;
    letter-spacing: 1rem;
    justify-content: center;
    align-items: center;

    font-size: 5rem;
    font-weight: 900;

    .input-container {
      display: flex;
      flex-direction: column;
      align-items: center;

      input {
        background-color: inherit;
        color: inherit;

        border: none;
        outline: none;
        border-bottom: 2px solid #999;

        margin-right: 1rem;
        vertical-align: middle;
        height: 5rem;
        width: 4rem;
        font-size: 5rem;
        font-weight: 900;
        text-align: center;
      }

      button {
        background-color: inherit;
        border: none;
        color: inherit;
        padding: 7px;
        cursor: pointer;
        transform: translateX(-7px);
        margin: 10px;
      }

      div {
        font-size: 1px;
      }
    }
  }

  .no-spin::-webkit-inner-spin-button,
  .no-spin::-webkit-outer-spin-button {
    -webkit-appearance: none !important;
    margin: 0 !important;
  }
</style>
