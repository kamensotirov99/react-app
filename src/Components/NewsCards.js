import '../App.css';
import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import ArticleService from '../Services/Article';
import { Link } from 'react-router-dom';
import JournalistService from '../Services/Journalist';

class NewsCards extends Component {


  render() {
    let recentNews = this.renderRecentArticles();
    return (
      <Container fluid>
        <Row className='section-heading d-flex flex-column pl-4'>{this.props.title}</Row>
        <Row className='justify-content-center justify-content-sm-start'>{recentNews}</Row>
      </Container>
    );
  }


  renderRecentArticles = () => {
    let info = this.props.articles.map((obj, i) => {
      return (
        <Col lg='3' md='4' sm='6' xs='7' key={obj.id} className='py-3' >
          <Container key={obj.id} fluid className='news-container'>
            <Row >
              <Col className='img-div mt-2' lg='12'>
                {obj.postersPath ?
                  <img
                    alt='Article poster'
                    src={`http://argoxinterns:2003${obj.postersPath[0]}`}
                    className='article-img '
                  />
                  :
                  <></>
                }
              </Col>
              <Col lg='12' className='height-full news-info-container'>
                <Container >
                  <Row >
                    <Col lg='12' md='12' className='text-start'>
                      <Link to={`/articles/id/${obj.id}`} className='font-white title-font text-start news-title'>{obj.title}</Link>
                    </Col>
                    <Col lg='12' md='12' className='news-yellow mt-2 article-date text-start'>
                      {this.props.journalists[i]?.name}
                    </Col>
                    <Col lg='12' md='12' className='font-white bold mt-2 article-date text-start'>
                      {new Date(obj.releaseDate).toDateString()}
                    </Col>
                  </Row>
                </Container>
              </Col>
            </Row>
          </Container>
        </Col>
      );
    });
    return info;
  };
}



export default NewsCards;
