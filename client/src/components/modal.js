import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

export default props => {
  return (
    <Modal fade={false} {...props} >
      <ModalHeader toggle={props.toggle}>{props.title}</ModalHeader>
      <ModalBody>
        {props.children}
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" size="sm" onClick={props.toggle}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
};
