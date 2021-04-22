import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { budgetService } from '../../../service/budget.service';

interface AddBudgetModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const AddBudgetModal = ({ isOpen, onClose }: AddBudgetModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create a new budget</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Formik
            initialValues={{
              name: '',
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string().required('Required'),
            })}
            onSubmit={(values) => {
              budgetService.createBudget(values.name).then(() => onClose());
            }}
          >
            {() => (
              <Form>
                <Field name="name">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.name && form.touched.name}
                    >
                      <FormLabel htmlFor="name">Name</FormLabel>
                      <Input {...field} id="name" placeholder="The Void" />
                      <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Button mt={4} mb={4} colorScheme="purple" type="submit">
                  Create
                </Button>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
export default AddBudgetModal;
