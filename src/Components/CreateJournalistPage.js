import React from 'react';
import { Form, Input, Container, Row, Button } from 'reactstrap';
import JournalistService from '../Services/Journalist';

class CreateJournalistPage extends React.Component {
  state = {
    name: '',
    error: '',
  }

  render() {
    return (
      <Container fluid className='create-container'>
        <Row>
          <div className='title'>Create Journalist</div>
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
          </Form>
          {
            this.state.error ?
              <Row className='error-message'>{this.state.error.split('=')[2] || this.state.error}</Row>
              :
              null
          }
          <div>
            <Button onClick={e => this.createJournalist(e)}>
              Next
            </Button>
          </div>
        </Row>
      </Container>
    );
  }

  onInputChange = e => {
    let name = [e.target.name];
    let value = e.target.value;
    this.setState({ [name]: value });
  };

  createJournalist = async e => {
    let { name } = this.state;
    e.preventDefault();
    try {
      await JournalistService.createJournalist(name);
    } catch (err) {
      this.setState({ error: err.response.data });
    }
  }
}

export default CreateJournalistPage;