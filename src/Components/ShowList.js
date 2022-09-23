import React from 'react';
import ShowCard from './ShowCard';
import { Container, Row, Col } from 'reactstrap';
import { DEFAULT_IMAGE } from './Constants';

class ShowList extends React.Component {
  render() {
    return (
      <Container fluid>
        <Row className='section-heading d-flex flex-column pl-4'>{this.props.title}</Row>
        {this.prepareData()}
      </Container>
    );
  }

  prepareData = () => {
    return (
      <Container fluid>
        <Row>
          {this.props.shows.length > 0 ?
            this.props.shows.map(show => (
              <Col xs={12} sm={6} md={6} lg={4} xl={4} key={show.id} className='d-flex py-3 p-sm-3'>
                <ShowCard id={show.id} title={show.title} poster={show.postersPath ? show.postersPath[0] : DEFAULT_IMAGE} genres={show.genres} rating={show.rating} type={this.props.type} showId={show.showId} pathname={this.props.pathname}/>
              </Col>
            ))
            :
            <div className='font-white ml-5'>No show cards available</div>
            }
        </Row>
      </Container>  
    );
  }
}

export default ShowList;