import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import ArticleService from '../Services/Article';
import JournalistService from '../Services/Journalist';
import CustomCarousel from './CustomCarousel';
import { DEFAULT_IMAGE } from './Constants';
import { Link } from 'react-router-dom';

class ArticlePage extends React.Component {
  state = {
    article: {},
    journalist: {},
    posters: [],
    width: window.innerWidth,
    error: '',
  }

  render() {
    return (
      <Container fluid className='pl-0 pr-0'>
        <Row className='celebrity-page-container flex-column flex-md-row mr-0 ml-0 '>
          <Col className='info-wrapper pt-md-5 order-2 order-md-1'>
            <div className='circle-decor right'></div>
            <div className='circle-decor left'></div>
            <div className='title'>{this.state.article.title}</div>
            <div className='subtitle article'>
              <div className='font-white'>Published by</div>
              <Link className='link article' to={`/journalists/id/${this.state.journalist.id}/articles`}>{this.state.journalist.name}</Link>
              <div className='font-white'>on</div>
              <div>{new Date(this.state.article.releaseDate).toLocaleDateString()}</div>
            </div>
            <div className='description-text'>{this.state.article.description}</div>
          </Col>
          <Col sm={12} md={6} className='celebrity-carousel pl-0 order-1 order-md-2'>
            <CustomCarousel posters={this.state.posters} halfWidth={this.state.width > 767 ? true : false} />
          </Col>
        </Row>
      </Container>
    );
  }

  componentDidMount = async () => {
    let { id } = this.props.match.params;
    try {
      let article = await ArticleService.getAricle(id);
      let journalist = await JournalistService.getJournalistById(article.journalist.id);
      let posters = article.postersPath ? article.postersPath.map(poster => ({ poster })) : [{ poster: DEFAULT_IMAGE }];
      window.addEventListener('resize', this.handleResize);
      this.setState({ article, journalist, posters });
    } catch (err) {
      this.setState({ error: err.response.data });
    }
  }

  handleResize = () => {
    this.setState({ width: window.innerWidth });
  }
}

export default ArticlePage;