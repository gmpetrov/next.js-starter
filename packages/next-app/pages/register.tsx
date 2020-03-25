import Link from 'next/link';
import Router from 'next/router';
import { Container, Spinner, Alert, Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { Page } from '@app/components';
import { useAuth } from '@app/hooks';
import { constants } from '@app/utils';

enum Fields {
  username = 'username',
  email = 'email',
  password = 'password',
  confirmPassword = 'confirmPassword'
}

const schema = yup.object().shape({
  [Fields.username]: yup
    .string()
    .min(3)
    .required(),
  [Fields.email]: yup
    .string()
    .email()
    .required(),
  [Fields.password]: yup
    .string()
    .min(3)
    .required(),
  [Fields.confirmPassword]: yup.string().oneOf([yup.ref(Fields.password)])
});

export type RegisterFormValues = yup.InferType<typeof schema>;

export default () => {
  const { handleSubmit, errors, control, reset, register, formState } = useForm<
    RegisterFormValues
  >({
    validationSchema: schema,
    mode: 'onChange'
  });

  const auth = useAuth();

  const onSubmit = async ({
    confirmPassword,
    ...otherProps
  }: RegisterFormValues) => {
    const { err } = await auth.register.run({ ...otherProps });

    if (!err) {
      Router.push('/protected');
    }
  };

  return (
    <Page>
      <Container className="login-form-wrapper d-flex flex-column mt-5">
        {auth.register.error && (
          <Alert variant="danger">{auth.register.error.message}</Alert>
        )}

        <Form
          onSubmit={handleSubmit(onSubmit)}
          className="container-sm border rounded py-3"
        >
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name={Fields.username}
              isInvalid={!!errors[Fields.username]}
              ref={register}
            />
            <Form.Control.Feedback type="invalid">
              {errors[Fields.username]?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name={Fields.email}
              isInvalid={!!errors[Fields.email]}
              ref={register}
            />
            <Form.Control.Feedback type="invalid">
              {errors[Fields.email]?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name={Fields.password}
              isInvalid={!!errors[Fields.password]}
              ref={register}
            />
            <Form.Control.Feedback type="invalid">
              {errors[Fields.password]?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label>Confirm password</Form.Label>
            <Form.Control
              type="password"
              name={Fields.confirmPassword}
              isInvalid={!!errors[Fields.confirmPassword]}
              ref={register}
            />
            <Form.Control.Feedback type="invalid">
              {errors[Fields.confirmPassword]?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Button
            type="submit"
            variant="primary"
            className="rounded-pill"
            disabled={auth.register.loading}
          >
            {auth.register.loading ? (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            ) : (
              <span>Submit</span>
            )}
          </Button>
        </Form>
        <Link href={constants.ROUTES.LOGIN}>
          <Button variant="link" className="ml-auto">
            Login
          </Button>
        </Link>
      </Container>
    </Page>
  );
};
