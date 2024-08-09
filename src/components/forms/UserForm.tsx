import type { ValueOrPromise } from "@builder.io/qwik";
import { component$ } from "@builder.io/qwik";
import type { RequestEventLoader } from "@builder.io/qwik-city";
import { routeLoader$, type Action, type Loader } from "@builder.io/qwik-city";
import type {
  FormActionFunction,
  FormActionStore,
  InitialValues,
} from "@modular-forms/qwik";
import {
  formAction$,
  useForm,
  valiForm$,
  type Maybe,
} from "@modular-forms/qwik";
import * as v from "valibot";
import { Input } from "./Input";

export const loginSchema = v.object({
  name: v.pipe(v.string(), v.nonEmpty("Please enter your name")),
  email: v.pipe(
    v.string(),
    v.nonEmpty("Please enter your email."),
    v.email("The email address is badly formatted."),
  ),
});

type LoginForm = v.InferInput<typeof loginSchema>;

export const useUserFormAction = (
  fn: FormActionFunction<
    {
      name: string;
      email: string;
    },
    undefined
  >,
) => formAction$<LoginForm>(fn, valiForm$(loginSchema));

export const useUserFormLoader = (
  loaderFn: (event: RequestEventLoader) => ValueOrPromise<{
    name: Maybe<string>;
    email: Maybe<string>;
  }>,
) => routeLoader$<InitialValues<LoginForm>>(loaderFn);

export default component$(
  ({
    loader,
    action,
  }: {
    loader: Loader<{
      name: Maybe<string>;
      email: Maybe<string>;
    }>;
    action: Action<
      FormActionStore<
        {
          name: string;
          email: string;
        },
        undefined
      >,
      {
        name?: Maybe<string>;
        email?: Maybe<string>;
      },
      true
    >;
  }) => {
    // eslint-disable-next-line
    const [_form, { Form, Field }] = useForm({
      loader: loader(),
      action: action(),
      validate: valiForm$(loginSchema),
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
  },
);
