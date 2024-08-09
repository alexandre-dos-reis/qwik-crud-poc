import type { QwikIntrinsicElements } from "@builder.io/qwik";
import { component$ } from "@builder.io/qwik";

export const Input = component$<
  QwikIntrinsicElements["input"] & { error?: string }
>(({ error, ...inputProps }) => (
  <div>
    <input class="border p-2" {...inputProps} />
    <div class="text-red-400">{error}</div>
  </div>
));
