import React from "react";
import { Container, Row, Col } from "reactstrap";
import ShowService from "../Services/Show";
import { MOVIE_TYPE, MOVIES_TYPE, COMEDY, ACTION, FANTASY } from "./Constants";
import ShowList from "./ShowList";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

class MoviesPage extends React.Component {
  state = {
    popularMovies: [],
    newestMovies: [],
    comedies: [],
    actions: [],
    fantasies: [],
    err: '',
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col>
            <Col className="d-flex justify-content-end">
              <div className='create-button' onClick={() => this.props.history.push('/createShow')}>
                <FontAwesomeIcon className='black-icon' icon={faPlus} />
                <div className='button-text'>Create movie</div>
              </div>
            </Col>
            {this.state.popularMovies.length > 0 ? <ShowList shows={this.state.popularMovies} title='Most popular movies' type={MOVIES_TYPE} /> : null}
            {this.state.newestMovies.length > 0 ? <ShowList shows={this.state.newestMovies} title='The newest movies' type={MOVIES_TYPE} /> : null}
            {this.state.comedies.length > 0 ? <ShowList shows={this.state.comedies} title='Comedies' type={MOVIES_TYPE} /> : null}
            {this.state.actions.length > 0 ? <ShowList shows={this.state.actions} title='Actions' type={MOVIES_TYPE} /> : null}
            {this.state.fantasies.length > 0 ? <ShowList shows={this.state.fantasies} title='Fantasies' type={MOVIES_TYPE} /> : null}
          </Col>
        </Row>
      </Container>
    );
  }

  componentDidMount = async () => {
    try {
      let { popularMovies, newestMovies, comedies, actions, fantasies } = this.state;
      let movies = (await ShowService.listShows()).filter(show => show.type === MOVIE_TYPE);
      popularMovies = [...movies].sort((a, b) => b.rating - a.rating);
      newestMovies = [...movies].sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
      comedies = movies.filter(movie => movie.genres.find(genre => genre.name === COMEDY));
      actions = movies.filter(movie => movie.genres.find(genre => genre.name === ACTION));
      fantasies = movies.filter(movie => movie.genres.find(genre => genre.name === FANTASY));
      this.setState({ popularMovies, newestMovies, comedies, actions, fantasies });
    } catch (err) {
      this.setState({ err });
    }
  }
}

export default MoviesPage;