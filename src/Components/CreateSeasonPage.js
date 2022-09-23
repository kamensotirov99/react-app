import React from 'react';
import { Form, Input, Container, Row, Col, Button } from 'reactstrap';
import Multiselect from 'multiselect-react-dropdown';
import CelebrityService from '../Services/Celebrity';
import SeasonService from '../Services/Season';
import UploadPosters from './UploadPosters';
import { DIRECTOR, PRODUCER, WRITER } from './Constants';

class CreateSeasonPage extends React.Component {
  state = {
    id: '',
    title: '',
    releaseDate: '',
    trailerUrl: '',
    directedBy: [],
    producedBy: [],
    writtenBy: [],
    resume: '',
    genresOptions: [],
    directedByOptions: [],
    producedByOptions: [],
    writtenByOptions: [],
    step1: true,
    step2: false,
    error: '',
  }

  render() {
    return (
      <Container fluid className='create-container'>
        <Row>
          <div className='title'>Create Season</div>
        </Row>
        <Row>
          <div className='progressbar'>
            <div className='progress-line'></div>
            <div className={`progress-color ${this.state.step2 ? 'step2' : ''}`}></div>
            <div className='active-circle circle'>1</div>
            <div className={`${this.state.step2 ? 'active-circle' : ''} circle`}>2</div>
          </div>
        </Row>
        {this.state.step2 ? <UploadPosters type='season' id={this.state.id} seriesId={this.props.match.params.seriesId} history={this.props.history} /> : null}
        <Row className='d-flex flex-column'>
          <div className={`inputs-container flex-column ${this.state.step1 ? 'd-flex' : 'd-none'}`}>
            <div className='d-flex flex-column flex-lg-row'>
              <Col>
                <Form>
                  <Input
                    id='title'
                    type='text'
                    name='title'
                    placeholder='Title'
                    className='input-field'
                    value={this.state.title}
                    onChange={this.onInputChange}
                  />

                  <Input
                    id='releaseDate'
                    name='releaseDate'
                    className='input-field'
                    value={this.state.releaseDate}
                    type='text' placeholder='Release Date'
                    onFocus={(e) => e.target.type = 'date'}
                    onBlur={(e) => e.target.type = 'text'}
                    onChange={this.onInputChange}
                  />

                  <Input
                    id='trailerUrl'
                    type='text'
                    name='trailerUrl'
                    className='input-field'
                    placeholder='Trailer URL'
                    value={this.state.trailerUrl}
                    onChange={this.onInputChange}
                  />

                  <Multiselect
                    placeholder='Directors'
                    className='input-field'
                    options={this.state.directedByOptions}
                    selectedValues={this.state.directedBy}
                    onSelect={this.onDirectedBySelect}
                    onRemove={this.onDirectedBySelect}
                    displayValue='name'
                  />
                </Form>
              </Col>
              <Col>
                <Form>
                  <Multiselect
                    placeholder='Writers'
                    className='input-field'
                    options={this.state.writtenByOptions}
                    selectedValues={this.state.writtenBy}
                    onSelect={this.onWrittenBySelect}
                    onRemove={this.onWrittenBySelect}
                    displayValue='name'
                  />

                  <Multiselect
                    placeholder='Producers'
                    className='input-field'
                    options={this.state.producedByOptions}
                    selectedValues={this.state.producedBy}
                    onSelect={this.onProducedBySelect}
                    onRemove={this.onProducedBySelect}
                    displayValue='name'
                  />

                  <Input
                    id='resume'
                    type='textarea'
                    placeholder='Description'
                    className='input-field'
                    name='resume'
                    value={this.state.resume}
                    onChange={this.onInputChange}
                  />
                </Form>
              </Col>
            </div>
            {
              this.state.error ?
                <Row className='error-message'>{this.state.error.split('=')[2] || this.state.error}</Row>
                :
                null
            }
            {
              this.state.step1 ?
                <Row className='d-flex justify-content-center'>
                  <Button onClick={e => this.createSeason(e)}>
                    Next
                  </Button>
                </Row>
                :
                null
            }
          </div>
        </Row>
      </Container>
    );
  }

  componentDidMount = async () => {
    let { directedByOptions, producedByOptions, writtenByOptions } = this.state;
    try {
      let resp = await CelebrityService.listCelebrities();
      directedByOptions = resp.filter(director => director.occupation.includes(DIRECTOR));
      producedByOptions = resp.filter(producer => producer.occupation.includes(PRODUCER));
      writtenByOptions = resp.filter(writter => writter.occupation.includes(WRITER));
      this.setState({ directedByOptions, producedByOptions, writtenByOptions });
    } catch (err) {
      this.setState({ error: err.response.data });
    }
  }

  onInputChange = e => {
    let name = [e.target.name];
    let value = e.target.value;
    this.setState({ [name]: value });
  };

  onStarringSelect = (selectedList) => {
    this.setState({ starring: selectedList });
  }

  onDirectedBySelect = (selectedList) => {
    this.setState({ directedBy: selectedList });
  }

  onWrittenBySelect = (selectedList) => {
    this.setState({ writtenBy: selectedList });
  }

  onProducedBySelect = (selectedList) => {
    this.setState({ producedBy: selectedList });
  }

  createSeason = async e => {
    let { title, releaseDate, trailerUrl, directedBy, producedBy, writtenBy, resume } = this.state;
    let { seriesId } = this.props.match.params;
    e.preventDefault();
    try {
      let resp = await SeasonService.createSeason(
        seriesId,
        title,
        trailerUrl,
        resume,
        releaseDate ? new Date(releaseDate).toISOString() : '0001-01-01T00:00:00.000+00:00',
        writtenBy,
        producedBy,
        directedBy,
      );
      this.setState({ id: resp.id, step2: true, step1: false });
    } catch (err) {
      this.setState({ error: err.response.data });
    }
  }
}

export default CreateSeasonPage;