import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { Link } from "@builder.io/qwik-city";
import { users } from "~/db/users";

export const useUsers = routeLoader$(() => users);

export default component$(() => {
  const userSignals = useUsers();

  return (
    <ul>
      {userSignals.value.map((u) => (
        <li key={u.id}>
          <Link href={`/users/${u.id}`}>{u.email}</Link>
        </li>
      ))}
    </ul>
  );
});
