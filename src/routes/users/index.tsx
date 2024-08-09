import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { db } from "~/db";

export const useGetUsers = routeLoader$(async () => {
  return await db.user.findMany();
});

export default component$(() => {
  const users = useGetUsers();
  return (
    <section>
      <ul>
        {users.value.map((user) => (
          <li key={user.id} class="underline">
            <a href={`/users/${user.id}`}>
              {user.name} ({user.email})
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
});
