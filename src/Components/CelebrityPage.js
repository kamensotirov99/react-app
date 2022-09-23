import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import CelebrityService from '../Services/Celebrity';
import ShowService from '../Services/Show';
import CustomCarousel from './CustomCarousel';
import { DEFAULT_AVATAR, MOVIES_TYPE, MOVIE_TYPE, SERIES_TYPE } from './Constants';
import ShowList from './ShowList';

class CelebrityPage extends React.Component {
  state = {
    celebrity: {},
    starringMovies: [],
    starringSeries: [],
    directedMovies: [],
    producedMovies: [],
    writtenMovies: [],
    directedSeries: [],
    producedSeries: [],
    writtenSeries: [],
    posters: [],
    width: window.innerWidth,
    error: '',
  }

  render() {
    return (
      <Container fluid className='pl-0 pr-0'>
        <Row className='celebrity-page-container flex-column flex-md-row mr-0 ml-0 '>
          <Col sm={12} md={6} className='celebrity-carousel pl-0'>
            <CustomCarousel posters={this.state.posters} halfWidth={this.state.width > 767 ? true : false} />
          </Col>
          <Col className='info-wrapper pt-lg-5'>
            <div className='circle-decor right'></div>
            <div className='circle-decor left'></div>
            <div className='title-name'>{this.state.celebrity.name}</div>
            <div className='subtitle'>
              <div>{this.state.celebrity.gender}</div>
              <div>{this.state.celebrity.occupation?.join(', ')}</div>
            </div>
            <div className='font-white'>Born on {new Date(this.state.celebrity.dateOfBirth).toLocaleDateString()} in {this.state.celebrity.placeOfBirth}</div>
            {new Date(this.state.celebrity.dateOfDeath).getYear() > 0 ?
              <div className='font-white'>Died on {new Date(this.state.celebrity.dateOfDeath).toLocaleDateString()}</div>
              :
              null
            }
            <div className='description-text'>{this.state.celebrity.bio}</div>
          </Col>
        </Row>
        <Row>
          {this.state.starringMovies.length > 0 ? <ShowList shows={this.state.starringMovies} title='Starring movies' type={MOVIES_TYPE} /> : null}
          {this.state.starringSeries.length > 0 ? <ShowList shows={this.state.starringSeries} title='Starring series' type={SERIES_TYPE} /> : null}
          {this.state.producedMovies.length > 0 ? <ShowList shows={this.state.producedMovies} title='Produced movies' type={MOVIES_TYPE} /> : null}
          {this.state.directedMovies.length > 0 ? <ShowList shows={this.state.directedMovies} title='Directed movies' type={MOVIES_TYPE} /> : null}
          {this.state.writtenMovies.length > 0 ? <ShowList shows={this.state.writtenMovies} title='Written movies' type={MOVIES_TYPE} /> : null}
          {this.state.producedSeries.length > 0 ? <ShowList shows={this.state.producedSeries} title='Produced series' type={SERIES_TYPE} /> : null}
          {this.state.directedSeries.length > 0 ? <ShowList shows={this.state.directedSeries} title='Directed series' type={SERIES_TYPE} /> : null}
          {this.state.writtenSeries.length > 0 ? <ShowList shows={this.state.writtenSeries} title='Written series' type={SERIES_TYPE} /> : null}
        </Row>
      </Container>
    );
  }

  componentDidMount = async () => {
    let { id } = this.props.match.params;
    try {
      let celebrity = await CelebrityService.getCelebrity(id);
      let posters = celebrity.postersPath ? celebrity.postersPath.map(poster => ({ poster })) : [{ poster: DEFAULT_AVATAR }];
      let shows = await ShowService.listShows();
      let starringMovies = shows.filter(show => show.starring.find(starring => starring.name === celebrity.name)).filter(show => show.type === MOVIE_TYPE);
      let starringSeries = shows.filter(show => show.starring.find(starring => starring.name === celebrity.name)).filter(show => show.type === SERIES_TYPE);
      let directedMovies = shows.filter(show => show.directedBy.find(director => director.name === celebrity.name)).filter(show => show.type === MOVIE_TYPE);
      let producedMovies = shows.filter(show => show.producedBy.find(producer => producer.name === celebrity.name)).filter(show => show.type === MOVIE_TYPE);
      let writtenMovies = shows.filter(show => show.writtenBy.find(writor => writor.name === celebrity.name)).filter(show => show.type === MOVIE_TYPE);
      let directedSeries = shows.filter(show => show.directedBy.find(director => director.name === celebrity.name)).filter(show => show.type === SERIES_TYPE);
      let producedSeries = shows.filter(show => show.producedBy.find(producer => producer.name === celebrity.name)).filter(show => show.type === SERIES_TYPE);
      let writtenSeries = shows.filter(show => show.writtenBy.find(writor => writor.name === celebrity.name)).filter(show => show.type === SERIES_TYPE);
      window.addEventListener('resize', this.handleResize);
      this.setState({
        celebrity,
        posters,
        starringMovies,
        starringSeries,
        directedMovies,
        producedMovies,
        writtenMovies,
        directedSeries,
        producedSeries,
        writtenSeries,
      });
    } catch (err) {
      this.setState({ error: err.response.data });
    }
  }

  handleResize = () => {
    this.setState({ width: window.innerWidth });
  }
}

export default CelebrityPage;