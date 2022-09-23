import React from 'react';
import { Container, Col, Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import CustomModal from './CustomModal';

class TrailerCard extends React.Component {
  state = {
    modal: null,
  }

  render() {
    return (
      <Container fluid className='show-card-container' style={{ backgroundImage: `url('http://argoxinterns:2003${this.props.poster}')` }}>
        <Row className='show-card-info'>
          <Col className='text-container pl-4 d-flex '>
            <FontAwesomeIcon className='play-button' icon={faCirclePlay} onClick={() => this.openModal(this.props.id)} />
            <CustomModal id={this.props.id} trailer={this.props.trailer} modal={this.state.modal} closeModal={this.closeModal} />
            <div className='show-card-subtitle'>{this.props.title}</div>
          </Col>
        </Row>
      </Container>
    );
  }

  openModal = (id) => {
    this.setState({ modal: id });
  };

  closeModal = () => {
    this.setState({ modal: null });
  };

}

export default TrailerCard;