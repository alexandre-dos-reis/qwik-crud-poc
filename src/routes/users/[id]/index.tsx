import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type { InitialValues } from "@modular-forms/qwik";
import { formAction$, valiForm$ } from "@modular-forms/qwik";
import * as v from "valibot";
import UserForm from "~/components/forms/UserForm";
import { db } from "~/db";

const loginSchema = v.object({
  name: v.pipe(v.string(), v.nonEmpty("Please enter your name")),
  email: v.pipe(
    v.string(),
    v.nonEmpty("Please enter your email."),
    v.email("The email address is badly formatted."),
  ),
});

type LoginForm = v.InferInput<typeof loginSchema>;

export const useFormLoader = routeLoader$<InitialValues<LoginForm>>(
  // @ts-ignore
  async ({ params: { id } }) => {
    const user = await db.user.findUnique({ where: { id: Number(id) } });

    if (!user) {
      throw new Error();
    }

    return user;
  },
);

// Runs on server when form is submitted and valid
const useFormAction = formAction$<LoginForm>(
  async (data, { params: { id }, redirect }) => {
    await db.user.update({
      where: { id: Number(id) },
      data,
    });

    return redirect(308, "/users");
  },
  valiForm$(loginSchema),
);

export default component$(() => (
  <UserForm loader={useFormLoader} action={useFormAction} />
));
