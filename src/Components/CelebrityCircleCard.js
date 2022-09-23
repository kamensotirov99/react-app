import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { Link } from 'react-router-dom';

class CelebrityCircleCard extends React.Component {
  render() {
    return (
      <Container className='d-flex justify-content-center'>
        <Row className='d-flex flex-column'>
          <Col className='d-flex justify-content-center align-items-center pb-2'>
            <img className='img-fluid born-today-image' src={`http://argoxinterns:2003${this.props.poster}`} alt='celebrity poster cover' />
          </Col>
          <Col className='d-flex justify-content-center align-items-center celebrity-name'>
            <Link className='link' to={`/celebrities/id/${this.props.id}`}>
              <div className='celebrity-name'>{this.props.name}</div>
            </Link>
          </Col>
          {this.props.roleName || this.props.dateOfBirth ?
            this.props.roleName ?
              <div className='celebrity-roleName year'>
                {this.props.roleName}
              </div>
              :
              new Date(this.props.dateOfDeath).getYear() > 0 ?
                <Col className='d-flex justify-content-center align-items-center year'>
                  {new Date(this.props.dateOfBirth).getFullYear()} - {new Date(this.props.dateOfDeath).getFullYear()}
                </Col>
                :
                <Col className='d-flex justify-content-center align-items-center year'>
                  {new Date().getYear() - new Date(this.props.dateOfBirth).getYear()}
                </Col>
            :
            <></>
          }
        </Row>
      </Container>
    );
  }
}

export default CelebrityCircleCard;