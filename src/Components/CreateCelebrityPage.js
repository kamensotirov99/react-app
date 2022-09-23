import React from 'react';
import { Form, Input, Container, Row, Button } from 'reactstrap';
import Multiselect from 'multiselect-react-dropdown';
import CelebrityService from '../Services/Celebrity';
import UploadPosters from './UploadPosters';
import { OCCUPATION_OPTIONS, GENDER_OPTIONS } from './Constants';

class CreateCelebrityPage extends React.Component {
  state = {
    id: '',
    name: '',
    gender: '',
    occupation: [],
    dateOfBirth: '',
    dateOfDeath: '',
    placeOfBirth: '',
    bio: '',
    step1: true,
    step2: false,
    error: '',
  }

  render() {
    return (
      <Container fluid className='create-container'>
        <Row>
          <div className='title'>Create Celebrity</div>
        </Row>
        <Row>
          <div className='progressbar'>
            <div className='progress-line'></div>
            <div className={`progress-color ${this.state.step2 ? 'step2' : ''}`}></div>
            <div className='active-circle circle'>1</div>
            <div className={`${this.state.step2 ? 'active-circle' : ''} circle`}>2</div>
          </div>
        </Row>
        {this.state.step2 ? <UploadPosters type='celebrity' id={this.state.id} history={this.props.history} /> : null}
        <Row className={`inputs-container flex-column ${this.state.step1 ? 'd-flex' : 'd-none'}`}>
          <Form>
            <Input
              id='name'
              type='text'
              name='name'
              placeholder='Name'
              className='input-field'
              value={this.state.name}
              onChange={this.onInputChange}
            />

            <Input
              id='gender'
              type='select'
              className='input-field mt-3'
              name='gender'
              value={this.state.gender}
              onChange={this.onInputChange}
            >
              <option className='option' value='' disabled>Gender</option>
              {GENDER_OPTIONS.map(gender => (
                <option className='option' key={gender}>{gender}</option>
              ))}
            </Input>

            <Multiselect
              placeholder='Occupations'
              className='input-field'
              options={OCCUPATION_OPTIONS}
              selectedValues={this.state.occupation}
              onSelect={this.onOccupationSelect}
              onRemove={this.onOccupationSelect}
              displayValue='name'
            />

            <Input
              id='dateOfBirth'
              name='dateOfBirth'
              className='input-field'
              value={this.state.dateOfBirth}
              type='text' placeholder='Date of Birth'
              onFocus={(e) => e.target.type = 'date'}
              onBlur={(e) => e.target.type = 'text'}
              onChange={this.onInputChange}
            />

            <Input
              id='dateOfDeath'
              name='dateOfDeath'
              className='input-field'
              value={this.state.dateOfDeath}
              type='text' placeholder='Date of Death'
              onFocus={(e) => e.target.type = 'date'}
              onBlur={(e) => e.target.type = 'text'}
              onChange={this.onInputChange}
            />

            <Input
              id='placeOfBirth'
              type='text'
              name='placeOfBirth'
              className='input-field'
              placeholder='Place of Birth'
              value={this.state.placeOfBirth}
              onChange={this.onInputChange}
            />

            <Input
              id='bio'
              type='textarea'
              placeholder='Bio'
              className='input-field'
              name='bio'
              value={this.state.bio}
              onChange={this.onInputChange}
            />

          </Form>
          {
            this.state.error ?
              <Row className='error-message'>{this.state.error.split('=')[2] || this.state.error}</Row>
              :
              null
          }
          {
            this.state.step1 ?
              <Row className='d-flex justify-content-center'>
                <Button onClick={e => this.createCelebrity(e)}>
                  Next
                </Button>
              </Row>
              :
              null
          }
        </Row>
      </Container>
    );
  }

  onInputChange = e => {
    let name = [e.target.name];
    let value = e.target.value;
    this.setState({ [name]: value });
  };

  onOccupationSelect = (selectedList) => {
    this.setState({ occupation: selectedList });
  }

  createCelebrity = async e => {
    let { name, gender, occupation, dateOfBirth, dateOfDeath, placeOfBirth, bio } = this.state;
    e.preventDefault();
    try {
      let resp = await CelebrityService.createCelebrity(
        name,
        occupation.map(occ => Object.values(occ)).flat(),
        dateOfBirth ? new Date(dateOfBirth).toISOString() : '0001-01-01T00:00:00.000+00:00',
        dateOfDeath ? new Date(dateOfDeath).toISOString() : '0001-01-01T00:00:00.000+00:00',
        placeOfBirth,
        gender,
        bio,
      );
      this.setState({ id: resp.id, step2: true, step1: false });
    } catch (err) {
      this.setState({ error: err.response.data });
    }
  }
}

export default CreateCelebrityPage;