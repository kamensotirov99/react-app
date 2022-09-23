import React from 'react';
import { Form, Input, Container, Row, Col, Button } from 'reactstrap';
import ArticleService from '../Services/Article';
import JournalistService from '../Services/Journalist';
import UploadPosters from './UploadPosters';

class CreateArticlePage extends React.Component {
  state = {
    id: '',
    title: '',
    releaseDate: '',
    description: '',
    journalist: '',
    journalistOptions: [],
    step1: true,
    step2: false,
    error: '',
  }

  render() {
    return (
      <Container fluid className='create-container'>
        <Row>
          <div className='title'>Create Article</div>
        </Row>
        <Row>
          <div className='progressbar'>
            <div className='progress-line'></div>
            <div className={`progress-color ${this.state.step2 ? 'step2' : ''}`}></div>
            <div className='active-circle circle'>1</div>
            <div className={`${this.state.step2 ? 'active-circle' : ''} circle`}>2</div>
          </div>
        </Row>
        {this.state.step2 ? <UploadPosters type='article' id={this.state.id} history={this.props.history} /> : null}
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
                    id='journalist'
                    type='select'
                    className='input-field mt-3'
                    name='journalist'
                    value={this.state.journalist}
                    onChange={this.onInputChange}
                  >
                    <option className='option' value='' disabled>Journalist</option>
                    {this.state.journalistOptions.map(journalist => (
                      <option className='option' key={journalist.id}>{journalist.name}</option>
                    ))}
                  </Input>

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
                    id='description'
                    type='textarea'
                    placeholder='Description'
                    className='input-field text-area'
                    name='description'
                    value={this.state.description}
                    onChange={this.onInputChange}
                  />
                </Form>
              </Col>
            </div>
            {
              this.state.error ?
                <Row className='error-message'>{this.state.error}</Row>
                :
                null
            }
            {
              this.state.step1 ?
                <Row className='d-flex justify-content-center'>
                  <Button onClick={e => this.createArticle(e)}>
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
    try {
      let resp = await JournalistService.listAllJournalists();
      this.setState({ journalistOptions: resp });
    } catch (err) {
      this.setState({ error: err.response.data });
    }
  }

  onInputChange = e => {
    const stateName = e.target.name;
    const value = e.target.value;
    this.setState({ [stateName]: value });
  };

  createArticle = async e => {
    let { title, releaseDate, journalist, description } = this.state;
    e.preventDefault();
    try {
      let resp = await ArticleService.createArticle(
        title,
        releaseDate ? new Date(releaseDate).toISOString() : '0001-01-01T00:00:00.000+00:00',
        description,
        journalist,
      );
      this.setState({ id: resp.id, step2: true, step1: false });
    } catch (err) {
      this.setState({ error: err.response.data })
    }
  }
}

export default CreateArticlePage;