import React from "react";
import { Container, Row, Col } from "reactstrap";
import ShowService from "../Services/Show";
import { ACTION, COMEDY, FANTASY, SERIES_TYPE } from "./Constants";
import ShowList from "./ShowList";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

class SeriesPage extends React.Component {
  state = {
    popularSeries: [],
    newestSeries: [],
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
              <div lg={3} className='create-button' onClick={() => this.props.history.push('/createShow')}>
                <FontAwesomeIcon className='black-icon' icon={faPlus} />
                <div className='button-text'>Create series</div>
              </div>
            </Col>
            {this.state.popularSeries.length > 0 ? <ShowList shows={this.state.popularSeries} title='Most popular series' type={SERIES_TYPE} /> : null}
            {this.state.newestSeries.length > 0 ? <ShowList shows={this.state.newestSeries} title='The newest series' type={SERIES_TYPE} /> : null}
            {this.state.comedies.length > 0 ? <ShowList shows={this.state.comedies} title='Comedies' type={SERIES_TYPE} /> : null}
            {this.state.actions.length > 0 ? <ShowList shows={this.state.actions} title='Actions' type={SERIES_TYPE} /> : null}
            {this.state.fantasies.length > 0 ? <ShowList shows={this.state.fantasies} title='Fantasies' type={SERIES_TYPE} /> : null}
          </Col>
        </Row>
      </Container>
    );
  }

  componentDidMount = async () => {
    try {
      let { popularSeries, newestSeries, comedies, actions, fantasies } = this.state;
      let series = (await ShowService.listShows()).filter(show => show.type === SERIES_TYPE);
      popularSeries = [...series].sort((a, b) => b.rating - a.rating);
      newestSeries = [...series].sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
      comedies = series.filter(movie => movie.genres.find(genre => genre.name === COMEDY));
      actions = series.filter(movie => movie.genres.find(genre => genre.name === ACTION));
      fantasies = series.filter(movie => movie.genres.find(genre => genre.name === FANTASY));
      this.setState({ popularSeries, newestSeries, comedies, actions, fantasies });
    } catch (err) {
      this.setState({ err });
    }
  }
}

export default SeriesPage;