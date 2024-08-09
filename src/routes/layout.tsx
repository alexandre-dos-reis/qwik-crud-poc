import { component$, Slot } from "@builder.io/qwik";
import type { LinkProps } from "@builder.io/qwik-city";
import { Link, useLocation } from "@builder.io/qwik-city";

const NavLink = component$<Omit<LinkProps, "class">>((props) => {
  const location = useLocation();

  const isCurrentLocation = props.href === location.url.pathname;

  return (
    <Link
      {...props}
      class={`text-3xl underline-offset-2 ${isCurrentLocation ? "underline" : ""}`}
    >
      <Slot />
    </Link>
  );
});

export default component$(() => {
  return (
    <main class="px-10 py-5">
      <h1 class="text-center text-5xl">Qwik City Crud</h1>
      <nav class="pt-5">
        <ul class="flex items-center justify-center gap-2">
          <li>
            <NavLink href="/">Home</NavLink>
          </li>
          <li>
            <NavLink href="/users">Users</NavLink>
          </li>
        </ul>
      </nav>
      <div class="flex items-center justify-center p-5">
        <Slot />
      </div>
    </main>
  );
});
