import Link from 'next/link';
import Router from 'next/router';
import { Container, Spinner, Alert, Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { Page } from '@app/components';
import { useAuth } from '@app/hooks';
import { constants } from '@app/utils';

enum Fields {
  username = 'identifier',
  password = 'password'
}

const schema = yup.object().shape({
  [Fields.username]: yup
    .string()
    .min(3)
    .required(),
  [Fields.password]: yup
    .string()
    .min(3)
    .required()
});

export type LoginFormValues = yup.InferType<typeof schema>;

export default () => {
  const { handleSubmit, errors, control, reset, register, formState } = useForm<
    LoginFormValues
  >({
    validationSchema: schema,
    mode: 'onChange'
  });

  const { login } = useAuth();

  const onSubmit = async (values: LoginFormValues) => {
    const { err } = await login.run(values);

    if (!err) {
      Router.push('/protected');
    }
  };

  return (
    <Page>
      <Container className="login-form-wrapper d-flex flex-column mt-5">
        {login.error && <Alert variant="danger">{login.error.message}</Alert>}

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

          <Button
            type="submit"
            variant="primary"
            className="rounded-pill"
            disabled={login.loading}
          >
            {login.loading ? (
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

        <Link href={constants.ROUTES.REGISTER}>
          <Button variant="link" className="ml-auto">
            Register
          </Button>
        </Link>
      </Container>
    </Page>
  );
};
