import React, { Component } from 'react';
import ShowService from "../Services/Show";
import SeasonService from "../Services/Season";
import EpisodeService from '../Services/Episode';
import CustomCarousel from './CustomCarousel';
import ShowInfo from './ShowInfo';
import CelebrityCircleList from './CelebrityCircleList';
import ShowList from './ShowList';
import GenreCirlce from './GenreCircle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Container, Row, Col } from 'reactstrap';
import {
  STARRINGS_TITLE,
  PRODUCERS_TITLE,
  WRITERS_TITLE,
  DIRECTORS_TITLE,
  SERIES_TYPE,
  SEASONS_TITLE,
  SEASONS_TYPE,
  EPISODES_TYPE,
  EPISODES_TITLE,
  DEFAULT_IMAGE,
} from './Constants';

class ShowPage extends Component {
  state = {
    show: {},
    posters: [],
  }

  render() {
    return (
      <div className='show-page-container'>
        {this.prepareData()}
      </div>
    );
  }

  componentDidMount = async () => {
    try {
      let { show, posters } = this.state;
      let { episodeId, seasonId, id } = this.props.match.params;
      if (episodeId) {
        show = await EpisodeService.getEpisode(episodeId);
        let season = await SeasonService.getSeason(show.seasonId);
        show.releaseDate = season.releaseDate;
      } else if (seasonId) {
        show = await SeasonService.getSeason(seasonId);
        show.length = await SeasonService.getAverageLength(seasonId);
      } else {
        show = await ShowService.getShow(id);
      }
      posters = show.postersPath ? show.postersPath.map(poster => ({ poster })) : [{ poster: DEFAULT_IMAGE }];
      this.setState({ show, posters });
    } catch (err) {
      console.log(err)
      alert(err.response.data);
    }
  }

  prepareData = () => {
    let { show, posters } = this.state;
    return (
      <Container fluid className='p-0'>
        <CustomCarousel posters={posters}>
          <ShowInfo title={show.title} rating={show.rating} length={show.length} releaseDate={show.releaseDate} description={show.description ? show.description : show.resume} trailer={show.trailerUrl} />
        </CustomCarousel>
        <Row className='d-flex justify-content-between align-items-center pr-3 mr-0 mt-4'>
          <Col sm={6} className='genres-wrapper pr-0'>
            {show.genres?.map(genre => <GenreCirlce id={genre.id} name={genre.name} key={genre.id} />)}
          </Col>
          {this.state.show.type === SERIES_TYPE || this.state.show.showId ?
            <Col sm={2} className='create-button' onClick={this.handleRedirect}>
              <FontAwesomeIcon className='black-icon' icon={faPlus} />
              <div className='button-text'>{this.state.show.type === SERIES_TYPE ? 'Create season' :
                this.state.show.showId ? 'Create episode' : null}</div>
            </Col>
            :
            null
          }
        </Row>
        {show.starring ? <CelebrityCircleList celebrities={show.starring} title={STARRINGS_TITLE} /> : null}
        {show.directedBy ? <CelebrityCircleList celebrities={show.directedBy} title={DIRECTORS_TITLE} /> : null}
        {show.producedBy ? <CelebrityCircleList celebrities={show.producedBy} title={PRODUCERS_TITLE} /> : null}
        {show.writtenBy ? <CelebrityCircleList celebrities={show.writtenBy} title={WRITERS_TITLE} /> : null}
        {show.seasons?.length > 0 ? <ShowList title={SEASONS_TITLE} shows={show.seasons} type={SEASONS_TYPE} pathname={this.props.location.pathname} /> : null}
        {show.episodes?.length > 0 ? <ShowList title={EPISODES_TITLE} shows={show.episodes} type={EPISODES_TYPE} pathname={this.props.location.pathname} /> : null}
      </Container>
    );
  }

  handleRedirect = () => {
    if (this.state.show.type === SERIES_TYPE) {
      this.props.history.push(`${this.props.location.pathname}/createSeason`);
    } else if (this.state.show.showId) {
      this.props.history.push(`${this.props.location.pathname}/createEpisode`);
    }
  }
}

export default ShowPage;