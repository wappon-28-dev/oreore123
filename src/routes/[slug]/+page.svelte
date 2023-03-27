<script lang="ts">
  import { goto } from "$app/navigation";
  import { containsNumeric } from "$lib/constants";
  import { status } from "$lib/store";
  import type { PageData } from "./$types";
  import Form from "./form.svelte";

  export let data: PageData;
  const name = data.pathname.slice(1);

  let numbers: number[] = [];
</script>

<svelte:head>
  <title>{name} | オレオレ123</title>
</svelte:head>

<main class:correct={$status === "correct"} class:wrong={$status === "wrong"}>
  <div class="container">
    <div class="form">
      <Form {name} {numbers} />
    </div>
    <div class="info">
      {#if $status === "correct"}
        <p>↑ 俺</p>
        <button
          on:click={() => {
            numbers = [];
            $status = "unanswered";
          }}
        >
          ↻ リセット
        </button>
      {:else if $status === "wrong"}
        <p>↑ 俺じゃない</p>
        <button
          on:click={() => {
            numbers = [];
            $status = "unanswered";
          }}
        >
          ↻ リセット
        </button>
      {:else if $status === "unanswered"}
        {#if containsNumeric(name)}
          <p>正しい数字を入れるんだ</p>
        {:else}
          <p>
            数字が含まれてないじゃないか！<br
            />これじゃあただあんたの名前を表示するだけだろ！
          </p>
        {/if}
        <button on:click={() => goto("/")}> ← 戻る </button>
      {/if}
    </div>
  </div>
</main>

<style lang="scss">
  main {
    height: 100%;
    width: 100%;
    display: table;

    background-color: white;
    color: black;
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
        text-align: center;
        font-size: 1.5rem;

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
    }
  }
</style>
