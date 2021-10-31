import React from "react";
import { Form, Formik } from "formik";
import { Modal, ModalHeader } from "reactstrap";

const CreateServerModal: React.FC = ({}) => {
  return (
    <>
      <Formik
        initialValues={{
          bannerURL: "",
          gameID: "",
          ipAddress: "",
          serverName: "",
        }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        <Form>
          <Modal>
            <ModalHeader>Create Server</ModalHeader>
          </Modal>
        </Form>
      </Formik>
    </>
  );
};

export default CreateServerModal;
