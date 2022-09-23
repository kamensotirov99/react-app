import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faClock, faCalendarDays } from '@fortawesome/free-regular-svg-icons';
import { faPlay, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Container, Col, Row } from "reactstrap";
import CustomModal from "./CustomModal";

class ShowInfo extends React.Component {
  state = {
    modal: null,
  }

  render() {
    return (
      <Container className='show-info-wrapper'>
        <Row className='show-info-container ml-lg-4 pt-xs-0 pt-sm-5'>
          <Col className='show-title justify-content-center justify-content-lg-start font-white'>
            <div>{this.props.title}</div>
          </Col>
          <Col className='d-flex flex-column flex-sm-row align-items-center align-items-sm-start justify-content-center justify-content-lg-start pl-0 icons-info'>
            <Col xs={3} md={2} className='d-flex  align-items-center justify-content-start font-white'>
              <FontAwesomeIcon className='yellow-icon pr-0-3' icon={faStar} />
              <div className='pr-0-3'>Rating:</div>
              <div className='bold'>{this.props.rating}</div>
            </Col>
            <Col xs={6} md={4} lg={3} className='d-flex align-items-center  justify-content-center justify-content-lg-start  font-white pr-0 pl-0'>
              <FontAwesomeIcon className='yellow-icon pr-0-3 ' icon={faClock} />
              <div className='pr-0-3'>Duration:</div>
              <div className='bold'>{this.props.length?.hours ? this.props.length.hours : 0}h {this.props.length?.minutes ? this.props.length.minutes : 0}m</div>
            </Col>
            <Col xs={3} md={2} className='d-flex align-items-center justify-content-start pl-lg-0 font-white'>
              <FontAwesomeIcon className='yellow-icon pr-0-3' icon={faCalendarDays} />
              <div className='pr-0-3'>Year:</div>
              <div className='bold'>{this.props.releaseDate ? new Date(this.props.releaseDate).getFullYear() : 'unknown'}</div>
            </Col>
          </Col>
          <Col xs={6} className='show-description-scroll-container d-flex text-align-start font-weigth-lighter align-self-center align-self-lg-start font-white'>
            <div className='show-description-scroll'>{this.props.description}</div>
          </Col>
          <Col className='d-flex flex-column flex-sm-row buttons-container'>
            <Col lg={3} className='d-flex watch-trailer-button pl-0' onClick={() => this.openModal(this.props.id)}>
              <FontAwesomeIcon className='black-icon' icon={faPlay} />
              <div className='button-text'>WATCH TRAILER</div>
              <CustomModal id={this.props.id} trailer={this.props.trailer} modal={this.state.modal} closeModal={this.closeModal} />
            </Col>
            <Col lg={3} className='d-flex add-list-button pl-0'>
              <FontAwesomeIcon className='black-icon' icon={faPlus} />
              <div className='button-text' >ADD LIST</div>
            </Col>
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

export default ShowInfo;