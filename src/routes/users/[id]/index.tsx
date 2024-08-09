/* eslint-disable @typescript-eslint/no-unused-vars */
import { $, component$, type QRL } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type { SubmitHandler } from "@modular-forms/qwik";
import { formAction$, useForm, valiForm$ } from "@modular-forms/qwik";
import * as v from "valibot";
import { users } from "~/db/users";

const LoginSchema = v.object({
  email: v.pipe(
    v.string(),
    v.nonEmpty("Please enter your email."),
    v.email("The email address is badly formatted."),
  ),
});

type LoginForm = v.InferInput<typeof LoginSchema>;

// default values
export const useFormLoader = routeLoader$(({ params: { id } }) => {
  return users.find((u) => u.id === id) || { email: "" };
});

// Runs on server when form is submitted and valid
const useFormAction = formAction$<LoginForm>(
  (values, { params: { id }, redirect }) => {
    let user = users.find((u) => u.id === id);

    if (user) {
      user = {
        ...user,
        email: values.email,
      };

      return redirect(308, "/users");
    }
  },
  valiForm$(LoginSchema),
);

export default component$(() => {
  const [_loginForm, { Form, Field }] = useForm({
    loader: useFormLoader(),
    action: useFormAction(),
    validate: valiForm$(LoginSchema),
    revalidateOn: "blur",
    validateOn: "blur",
  });

  // Runs on client
  const handleSubmit: QRL<SubmitHandler<LoginForm>> = $((values, event) => {
    console.log(values);
  });

  return (
    <Form onSubmit$={handleSubmit}>
      <Field name="email">
        {(field, props) => (
          <div>
            <input {...props} type="email" value={field.value} />
            {field.error && <div>{field.error}</div>}
          </div>
        )}
      </Field>
      <button type="submit">Login</button>
    </Form>
  );
});
