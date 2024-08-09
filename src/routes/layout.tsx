import { component$, Slot } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <main>
      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/users">Users</Link>
          </li>
        </ul>
      </nav>
      <Slot />
    </main>
  );
});
