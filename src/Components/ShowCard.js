import React from 'react';
import { Container, Col, Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

class ShowCard extends React.Component {
  render() {
    return (
      <Container className='show-card-container' style={{ backgroundImage: `url('http://argoxinterns:2003${this.props.poster}')` }}>
        <Row className='show-card-info'>
          <Col sm={8} className='text-container pl-4 pr-0'>
            <Link className='link' to={this.props.pathname ? `${this.props.pathname}/${this.props.type}/id/${this.props.id}` : `/${this.props.type}/id/${this.props.id}`}>
              <div className='show-card-title '>{this.props.title}</div>
            </Link>
            <div className='show-card-subtitle'>
              {this.props.genres?.map(genre => (
                <Link className='genre link' key={genre.id} to={`/genre/id/${genre.id}`}>{genre.name}</Link>
              ))}
            </div>
          </Col>
          <Col className='rating-container justify-content-start pl-3 pl-sm-0 pr-0 justify-content-sm-start'>
            <div className='show-card-separator d-none d-sm-block pl-0'></div>
            <FontAwesomeIcon className='icon' icon={faStar} />
            <div className='show-card-title'>{this.props.rating ? this.props.rating : 0}</div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ShowCard;