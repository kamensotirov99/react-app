import React from 'react';
import { Form, Input, Container, Row, Col, Button } from 'reactstrap';
import Multiselect from 'multiselect-react-dropdown';
import GenreService from '../Services/Genre';
import CelebrityService from '../Services/Celebrity';
import ShowService from '../Services/Show';
import UploadPosters from './UploadPosters';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { ACTOR, ACTRESS, DIRECTOR, PRODUCER, TYPE_OPTIONS, WRITER } from './Constants';

class CreateShowPage extends React.Component {
  state = {
    id: '',
    title: '',
    type: '',
    releaseDate: '',
    endDate: '',
    hours: '',
    minutes: '',
    trailerUrl: '',
    genres: [],
    directedBy: [],
    producedBy: [],
    writtenBy: [],
    starring: [{ id: '', name: '', roleName: '', postersPath: [] }],
    description: '',
    genresOptions: [],
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
          <div className='title'>Create Show</div>
        </Row>
        <Row>
          <div className='progressbar'>
            <div className='progress-line'></div>
            <div className={`progress-color ${this.state.step2 ? 'step2' : ''}`}></div>
            <div className='active-circle circle'>1</div>
            <div className={`${this.state.step2 ? 'active-circle' : ''} circle`}>2</div>
          </div>
        </Row>
        {this.state.step2 ? <UploadPosters type={this.state.type === 'Series' ? 'series' : 'movie'} id={this.state.id} history={this.props.history} /> : null}
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
                    id='type'
                    type='select'
                    className='input-field mt-3'
                    name='type'
                    value={this.state.type}
                    onChange={this.onInputChange}
                  >
                    <option className='option' value='' disabled>Type</option>
                    {TYPE_OPTIONS.map(type => (
                      <option className='option' key={type}>{type}</option>
                    ))}
                  </Input>

                  <Input
                    required
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
                    id='endDate'
                    name='endDate'
                    className='input-field'
                    value={this.state.endDate}
                    type='text' placeholder='End Date'
                    onFocus={(e) => e.target.type = 'date'}
                    onBlur={(e) => e.target.type = 'text'}
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
                    id='trailerUrl'
                    type='text'
                    name='trailerUrl'
                    className='input-field'
                    placeholder='Trailer URL'
                    value={this.state.trailerUrl}
                    onChange={this.onInputChange}
                  />
                </Form>
              </Col>
              <Col>
                <Form>
                  <Multiselect
                    placeholder='Genres'
                    className='input-field'
                    options={this.state.genresOptions}
                    selectedValues={this.state.genres}
                    onSelect={this.onGenreSelect}
                    onRemove={this.onGenreSelect}
                    displayValue='name'
                  />

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

                  <Input
                    id='description'
                    type='textarea'
                    placeholder='Description'
                    className='input-field'
                    name='description'
                    value={this.state.description}
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
                  <Button onClick={e => this.createShow(e)}>
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
      let resp = await Promise.all([
        GenreService.listAllGenres(),
        CelebrityService.listCelebrities(),
      ]);
      directedByOptions = resp[1].filter(director => director.occupation.includes(DIRECTOR));
      producedByOptions = resp[1].filter(producer => producer.occupation.includes(PRODUCER));
      writtenByOptions = resp[1].filter(writter => writter.occupation.includes(WRITER));
      starringOptions = resp[1].filter(star => star.occupation.includes(ACTOR) || star.occupation.includes(ACTRESS));
      this.setState({ genresOptions: resp[0], directedByOptions, producedByOptions, writtenByOptions, starringOptions });
    }
    catch (err) {
      this.setState({ error: err.response.data });
    }
  }

  onInputChange = e => {
    const stateName = e.target.name;
    const value = e.target.value;
    this.setState({ [stateName]: value });
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

  onGenreSelect = (selectedList) => {
    this.setState({ genres: selectedList });
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

  createShow = async e => {
    let { title, type, releaseDate, endDate, hours, minutes, trailerUrl, genres, directedBy, producedBy, writtenBy, starring, description } = this.state;
    e.preventDefault();
    try {
      starring = starring.map(star => {
        let match = this.state.starringOptions.find(starOption => starOption.name === star.name);
        return { id: match.id, name: match.name, roleName: star.roleName, postersPath: match.postersPath }
      });
      let resp = await ShowService.createShow(
        title,
        type.toLocaleLowerCase(),
        releaseDate ? new Date(releaseDate).toISOString() : '0001-01-01T00:00:00.000+00:00',
        endDate ? new Date(endDate).toISOString() : '0001-01-01T00:00:00.000+00:00',
        { hours: parseInt(hours), minutes: parseInt(minutes) },
        trailerUrl,
        genres,
        directedBy,
        producedBy,
        writtenBy,
        starring,
        description,
      );
      this.setState({ id: resp.id, step2: true, step1: false });
    } catch (err) {
      this.setState({ error: err.response.data });
    }
  }
}

export default CreateShowPage;