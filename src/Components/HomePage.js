import React from 'react';
import CelebrityCircleList from './CelebrityCircleList';
import CelebrityService from '../Services/Celebrity';
import ShowList from './ShowList';
import TrailerList from './TrailerList';
import { Col, Container, Row } from 'reactstrap';
import ShowService from '../Services/Show';
import NewsCards from './NewsCards';
import { MOVIES_TYPE, MOVIE_TYPE, SERIES_TYPE } from './Constants';
import ArticleService from '../Services/Article';
import JournalistService from '../Services/Journalist';
class HomePage extends React.Component {
  state = {
    celebrities: [],
    movies: [],
    series: [],
    articles: [],
    journalists: [],
    err: ''
  }

  render() {
    return (
      <Container fluid className='home-container'>
        <Row>{this.state.err ? this.state.err : <></>}</Row>
        <Row>
          <Col lg={3} className='trailers-container'>
            <TrailerList />
          </Col>
          <Col>
            <ShowList shows={this.state.movies} title='Popular Movies' type={MOVIES_TYPE} />
            <ShowList shows={this.state.series} title='Popular Series' type={SERIES_TYPE} />
            <CelebrityCircleList celebrities={this.state.celebrities} title='Born Today' subtitle={`People born on ${new Date().toLocaleString('default', { month: 'long' })} ${new Date().getDate()}`} />
            <NewsCards articles={this.state.articles} journalists={this.state.journalists} title='Top news'/>
          </Col>
        </Row>
      </Container>
    );
  }

  componentDidMount = async () => {
    try {
      let { celebrities, movies, series, journalists } = this.state;
      let resp = await Promise.all([
        CelebrityService.listCelebrities(),
        ShowService.listShows(),
        ArticleService.listArticlesByCount(3),
      ]);
      celebrities = resp[0].filter(celeb => new Date(celeb.dateOfBirth).getDate() === new Date().getDate() && new Date(celeb.dateOfBirth).getMonth() === new Date().getMonth());
      movies = resp[1].filter(show => show.type === MOVIE_TYPE).sort((a, b) => b.rating - a.rating);
      series = resp[1].filter(show => show.type === SERIES_TYPE).sort((a, b) => b.rating - a.rating);
      journalists = await Promise.all(resp[2].map(async article => {
        try {
          return await JournalistService.getJournalistById(article.journalist.id);
        } catch (err) {
          this.setState({ err });
        }
      }));
      this.setState({ celebrities, movies, series, articles: resp[2], journalists });
    } catch (err) {
      this.setState({ err });
    }
  }
}

export default HomePage;