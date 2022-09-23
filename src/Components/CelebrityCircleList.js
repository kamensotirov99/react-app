import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import CelebrityCircleCard from './CelebrityCircleCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBan } from '@fortawesome/free-solid-svg-icons';
import { DEFAULT_AVATAR } from './Constants';

class CelebrityCircleList extends React.Component {
  render() {
    return (
      <Container fluid className='celebrity-circle-container'>
        <Row className='section-heading d-flex flex-column pl-2'>{this.props.title}</Row>
        <Row className='section-subheading d-flex flex-column pl-2 pb-3'>{this.props.subtitle}</Row>
        {this.props.celebrities.length > 0 ? this.prepareData() :
          <div className='d-flex align-items-center gap'>
            <FontAwesomeIcon className='icon' icon={faBan} />
            <div className='section-text d-flex flex-column'>No data of celebrities!</div>
          </div>
        }
      </Container>
    );
  }


  prepareData = () => {
    return (
      <Container fluid className='pl-0'>
        <Row>
          {this.props.celebrities.map(celebrity => (
            <Col sm={4} lg={3} key={celebrity.id} className='col-6 pb-5'>
              <CelebrityCircleCard id={celebrity.id} name={celebrity.name} poster={celebrity.postersPath ? celebrity.postersPath[0] : DEFAULT_AVATAR} dateOfBirth={celebrity.dateOfBirth} dateOfDeath={celebrity.dateOfDeath} roleName={celebrity.roleName} />
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
}

export default CelebrityCircleList;