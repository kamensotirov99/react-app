import React from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
} from 'reactstrap';

class CustomModal extends React.Component {
  render() {

    return (
      <Modal className='modal-content'
        isOpen={this.props.modal === this.props.id}
        toggle={this.props.closeModal}
      >
        <ModalBody>
          <iframe width='470' height='315' src={this.props.trailer} title='YouTube video player' frameBorder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowFullScreen></iframe>
        </ModalBody>
        <ModalFooter>
          <Button color='secondary' onClick={this.props.closeModal}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default CustomModal;