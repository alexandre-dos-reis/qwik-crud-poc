import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { formAction$, valiForm$ } from "@modular-forms/qwik";
import UserForm, { loginSchema } from "~/components/forms/UserForm";
import { db } from "~/db";

const useFormAction = formAction$(async (data, { redirect }) => {
  await db.user.create({
    data,
  });

  return redirect(308, "/users");
}, valiForm$(loginSchema));

export const useFormLoader = routeLoader$(() => ({ email: "", name: "" }));

export default component$(() => (
  <UserForm action={useFormAction} loader={useFormLoader} />
));
