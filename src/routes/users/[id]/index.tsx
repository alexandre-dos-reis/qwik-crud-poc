import type { HTMLAttributes, QwikIntrinsicElements } from "@builder.io/qwik";
import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type { InitialValues } from "@modular-forms/qwik";
import { formAction$, useForm, valiForm$ } from "@modular-forms/qwik";
import * as v from "valibot";
import { db } from "~/db";

const LoginSchema = v.object({
  name: v.pipe(v.string(), v.nonEmpty("Please enter your name")),
  email: v.pipe(
    v.string(),
    v.nonEmpty("Please enter your email."),
    v.email("The email address is badly formatted."),
  ),
});

type LoginForm = v.InferInput<typeof LoginSchema>;

// default values
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
  valiForm$(LoginSchema),
);

export default component$(() => {
  // eslint-disable-next-line
  const [_form, { Form, Field }] = useForm({
    loader: useFormLoader(),
    action: useFormAction(),
    validate: valiForm$(LoginSchema),
    revalidateOn: "blur",
    validateOn: "blur",
  });

  return (
    <Form class="flex flex-col gap-3">
      <Field name="name">
        {(field, props) => <Input {...props} {...field} />}
      </Field>
      <Field name="email">
        {(field, props) => <Input {...props} {...field} type="email" />}
      </Field>
      <button type="submit" class="rounded-md bg-black p-3 text-white">
        Submit
      </button>
    </Form>
  );
});

const Input = component$<QwikIntrinsicElements["input"] & { error?: string }>(
  ({ error, ...inputProps }) => (
    <div>
      <input class="border p-2" {...inputProps} />
      <div class="text-red-400">{error}</div>
    </div>
  ),
);
