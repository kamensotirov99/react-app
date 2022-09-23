import React from 'react';
import { Form, Input, Container, Row, Col, Button } from 'reactstrap';
import Multiselect from 'multiselect-react-dropdown';
import CelebrityService from '../Services/Celebrity';
import EpisodeService from '../Services/Episode';
import UploadPosters from './UploadPosters';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { ACTOR, ACTRESS, DIRECTOR, PRODUCER, WRITER } from './Constants';

class CreateEpisodePage extends React.Component {
  state = {
    id: '',
    title: '',
    seasonId: '',
    seriesId: '',
    hours: '',
    minutes: '',
    trailerUrl: '',
    directedBy: [],
    producedBy: [],
    writtenBy: [],
    starring: [{ id: '', name: '', roleName: '', postersPath: [] }],
    resume: '',
    directedByOptions: [],
    producedByOptions: [],
    writtenByOptions: [],
    starringOptions: [],
    step1: true,
    step2: false,
    error: '',
  }

  render() {
    return (
      <Container fluid className='create-container'>
        <Row>
          <div className='title'>Create Episode</div>
        </Row>
        <Row>
          <div className='progressbar'>
            <div className='progress-line'></div>
            <div className={`progress-color ${this.state.step2 ? 'step2' : ''}`}></div>
            <div className='active-circle circle'>1</div>
            <div className={`${this.state.step2 ? 'active-circle' : ''} circle`}>2</div>
          </div>
        </Row>
        {this.state.step2 ? <UploadPosters type={'episode'} seriesId={this.state.seriesId} seasonId={this.state.seasonId} id={this.state.id} history={this.props.history} /> : null}
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
                    id='trailerUrl'
                    type='text'
                    name='trailerUrl'
                    className='input-field'
                    placeholder='Trailer URL'
                    value={this.state.trailerUrl}
                    onChange={this.onInputChange}
                  />

                  <div className='d-flex gap'>
                    <Input
                      id='hours'
                      min='0'
                      max='90'
                      name='hours'
                      type='number'
                      placeholder='Hours'
                      className='input-field length'
                      value={this.state.hours}
                      onChange={this.onInputChange}
                    />

                    <Input
                      id='minutes'
                      min='0'
                      max='60'
                      name='minutes'
                      placeholder='Minutes'
                      className='input-field length'
                      value={this.state.minutes}
                      onChange={this.onInputChange}
                      onFocus={(e) => e.target.type = 'number'}
                      onBlur={(e) => e.target.type = 'text'}
                    />
                  </div>

                  <Input
                    id='resume'
                    type='text'
                    placeholder='Resume'
                    className='input-field'
                    name='resume'
                    value={this.state.resume}
                    onChange={this.onInputChange}
                  />

                </Form>
              </Col>
              <Col>
                <Form>
                  {this.state.starring.map((star, i) => (
                    <div className='d-flex gap'>
                      <Input
                        id='name'
                        type='select'
                        className='input-field length'
                        name='name'
                        value={star.name}
                        onChange={e => this.onCelebrityChange(e, i)}
                      >
                        <option className='option' value='' disabled>Starring</option>
                        {this.state.starringOptions.map(star => (
                          <option className='option' key={star.id}>{star.name}</option>
                        ))}
                      </Input>

                      <Input
                        name='roleName'
                        placeholder='Role name'
                        className='input-field length'
                        value={star.roleName}
                        onChange={e => this.onCelebrityChange(e, i)}
                      />

                      <div className='d-flex align-items-center gap'>
                        {this.state.starring.length !== 1 &&
                          <FontAwesomeIcon className='cross-button' icon={faCircleXmark} onClick={() => this.handleRemoveClick(i)} />
                        }
                        {this.state.starring.length - 1 === i &&
                          <Button onClick={this.handleAddClick}>Add</Button>
                        }
                      </div>
                    </div>
                  ))}

                  <Multiselect
                    placeholder='Directors'
                    className='input-field'
                    options={this.state.directedByOptions}
                    selectedValues={this.state.directedBy}
                    onSelect={this.onDirectedBySelect}
                    onRemove={this.onDirectedBySelect}
                    displayValue='name'
                  />

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
                  <Button onClick={this.createEpisode}>
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
    let { directedByOptions, producedByOptions, writtenByOptions, starringOptions } = this.state;
    try {
      let resp = await CelebrityService.listCelebrities();
      directedByOptions = resp.filter(director => director.occupation.includes(DIRECTOR));
      producedByOptions = resp.filter(producer => producer.occupation.includes(PRODUCER));
      writtenByOptions = resp.filter(writter => writter.occupation.includes(WRITER));
      starringOptions = resp.filter(star => star.occupation.includes(ACTOR) || star.occupation.includes(ACTRESS));
      this.setState({
        directedByOptions,
        producedByOptions,
        writtenByOptions,
        starringOptions,
        seasonId: this.props.match.params.seasonId,
        seriesId: this.props.match.params.seriesId
      });
    } catch (err) {
      this.setState({ error: err.response.data });
    }
  }

  onInputChange = e => {
    let name = [e.target.name];
    let value = e.target.value;
    this.setState({ [name]: value });
  };

  handleRemoveClick = index => {
    const list = [...this.state.starring];
    list.splice(index, 1);
    this.setState({ starring: list });
  }

  handleAddClick = () => {
    let { starring } = this.state;
    starring = starring.concat({ name: '', roleName: '' })
    this.setState({ starring });
  }

  onCelebrityChange = (e, i) => {
    let { starring } = this.state;
    const { name, value } = e.target;
    const list = [...starring];
    list[i][name] = value;
    this.setState({ starring: list });
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

  createEpisode = async e => {
    let { seasonId, title, hours, minutes, trailerUrl, directedBy, producedBy, writtenBy, starring, resume } = this.state;
    e.preventDefault();
    try {
      starring = starring.map(star => {
        let match = this.state.starringOptions.find(starOption => starOption.name === star.name);
        return { id: match.id, name: match.name, roleName: star.roleName, postersPath: match.postersPath }
      });
      let resp = await EpisodeService.createEpisode(
        seasonId,
        title,
        trailerUrl,
        { hours: parseInt(hours), minutes: parseInt(minutes) },
        resume,
        writtenBy,
        directedBy,
        producedBy,
        starring,
      );
      this.setState({ id: resp.id, step2: true, step1: false });
    } catch (err) {
      this.setState({ error: err.response.data });
    }
  }
}

export default CreateEpisodePage;