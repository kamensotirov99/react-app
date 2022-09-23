import React from 'react';
import { Form, Input, Container, Row, Button } from 'reactstrap';
import GenreService from '../Services/Genre';

class CreateGenrePage extends React.Component {
  state = {
    name: '',
    description: '',
    error: '',
  }

  render() {
    return (
      <Container fluid className='create-container'>
        <Row>
          <div className='title'>Create Genre</div>
        </Row>
        <Row className='inputs-container flex-column'>
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
              id='description'
              type='textarea'
              placeholder='Description'
              className='input-field'
              name='description'
              value={this.state.description}
              onChange={this.onInputChange}
            />
          </Form>
          {
            this.state.error ?
              <Row className='error-message'>{this.state.error.split('=')[2] || this.state.error}</Row>
              :
              null
          }
          <Button onClick={e => this.createGenre(e)}>
            Next
          </Button>
        </Row>
      </Container>
    );
  }

  onInputChange = e => {
    let name = [e.target.name];
    let value = e.target.value;
    this.setState({ [name]: value });
  };

  createGenre = async e => {
    let { name, description } = this.state;
    e.preventDefault();
    try {
      await GenreService.createGenre(name, description);
    } catch (err) {
      this.setState({ error: err.response.data });
    }
  }
}

export default CreateGenrePage;