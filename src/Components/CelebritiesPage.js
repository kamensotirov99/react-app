import React from "react";
import { Container, Row, Col } from "reactstrap";
import CelebrityCircleList from "./CelebrityCircleList";
import CelebrityService from "../Services/Celebrity";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { DIRECTOR, PRODUCER, ACTOR, ACTRESS, WRITER } from "./Constants";

class CelebritiesPage extends React.Component {
  state = {
    actors: [],
    producers: [],
    writers: [],
    directors: [],
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col>
            <Col className="d-flex justify-content-end">
              <div className='create-button' onClick={() => this.props.history.push('/createCelebrity')}>
                <FontAwesomeIcon className='black-icon' icon={faPlus} />
                <div className='button-text'>Create celebrity</div>
              </div>
            </Col>
            <CelebrityCircleList celebrities={this.state.actors} title='Actors / Actresses' />
            <CelebrityCircleList celebrities={this.state.producers} title='Producers' />
            <CelebrityCircleList celebrities={this.state.writers} title='Writers' />
            <CelebrityCircleList celebrities={this.state.directors} title='Directors' />
          </Col>
        </Row>
      </Container>
    );
  }

  componentDidMount = async () => {
    let { actors, producers, writers, directors } = this.state;
    let resp = await CelebrityService.listCelebrities();
    directors = resp.filter(director => director.occupation.includes(DIRECTOR));
    producers = resp.filter(producer => producer.occupation.includes(PRODUCER));
    writers = resp.filter(writter => writter.occupation.includes(WRITER));
    actors = resp.filter(star => star.occupation.includes(ACTOR) || star.occupation.includes(ACTRESS));
    this.setState({ actors, producers, writers, directors });
  }
}

export default CelebritiesPage;