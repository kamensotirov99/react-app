import React from 'react';
import TrailerCard from './TrailerCard';
import ShowService from '../Services/Show';
import { Container, Row, Col } from 'reactstrap';
import { DEFAULT_IMAGE } from './Constants';

class TrailerList extends React.Component {
  state = {
    shows: [],
  }

  render() {
    return (
      <Container fluid>
        <Row className='section-heading d-flex flex-column pl-4'>Trailers</Row>
        {this.prepareData()}
      </Container>
    );
  }

  componentDidMount = async () => {
    try {
      let resp = await ShowService.listShows();
      this.setState({ shows: resp });
    } catch (err) {
      console.log(err)
      alert(err.response.data);
    }
  }

  prepareData = () => {
    let { shows } = this.state;
    return (
      <Container fluid>
        <Row className='d-flex flex-column flex-sm-row flex-lg-column'>
          {shows.map(show => (
            <Col xs={12} sm={6} md={6} lg={12} key={show.id} className='py-3 p-sm-3 '>
              <TrailerCard id={show.id} title={show.title} poster={show.postersPath ? show.postersPath[0] : DEFAULT_IMAGE} genres={show.genres} trailer={show.trailerUrl} />
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
}

export default TrailerList;