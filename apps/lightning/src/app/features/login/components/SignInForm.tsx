import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import Auth0Button from '../../../auth/Auth0Button';

const SignInForm = () => {
  return (
    <Flex direction="column">
      <Formik
        initialValues={{
          email: '',
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Invalid email').required('Required'),
        })}
        onSubmit={(values) => {
          // same shape as initial values
          console.log(values);
        }}
      >
        {() => (
          <Form>
            <Field name="email">
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.email && form.touched.email}
                >
                  <FormLabel htmlFor="email">First email</FormLabel>
                  <Input {...field} id="email" placeholder="email" />
                  <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Button mt={4} colorScheme="teal" type="submit">
              Sign In
            </Button>
          </Form>
        )}
      </Formik>

      <Auth0Button>Sign in with Auth0</Auth0Button>
    </Flex>
  );
};
export default SignInForm;
