import React from 'react';
import { Container, Button, Row } from 'reactstrap';
import ShowService from '../Services/Show';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faUpload } from '@fortawesome/free-solid-svg-icons';
import EpisodeService from '../Services/Episode';
import ArticleService from '../Services/Article';
import CelebrityService from '../Services/Celebrity';
import SeasonService from '../Services/Season';
import { MOVIE_TYPE, SERIES_TYPE, CELEBRITY_TYPE, EPISODE_TYPE, SEASON_TYPE, ARTICLE_TYPE } from './Constants';

class UploadPosters extends React.Component {
  state = {
    draggingOver: false,
    postersPath: [],
    error: '',
  }

  render() {
    return (
      <Container className='d-flex justify-content-center'>
        <div className='form-file-upload' onDragOver={this.handleDrag} onDrop={this.handleDrop} onDragEnter={this.handleDrag} onDragLeave={this.handleDragLeave}>
          <input className='input-file-upload' type='file' name='file' onChange={this.onFileChange} multiple accept='image/png , image/jpeg' />
          <label className={`${this.state.draggingOver ? 'drag-active' : ''} label-file-upload`} htmlFor='input-file-upload'>
            <div>
              <div>Drag and drop your file here or click to upload</div>
              <FontAwesomeIcon icon={faUpload} />
            </div>
          </label>
          <div className="d-flex gap align-items-center justify-content-center">
            {Object.keys(this.state.postersPath).map((fileName, index) => {
              let file = this.state.postersPath[fileName];
              let isImageFile = file.type.split('/')[0] === 'image';
              return (
                <div className='section' key={fileName}>
                  <div className='upload-div'>
                    {isImageFile && (
                      <img className='upload-image'
                        src={URL.createObjectURL(file)}
                        alt={`file preview ${index}`}
                      />
                    )}
                    <div className='d-flex flex-column'>
                      <span className='file-name'>{file.name}</span>
                      <div className='file-name'>
                        <span className='pr-2'>{file.size} kb</span>
                        <FontAwesomeIcon className='trash-icon' icon={faTrash} onClick={() => this.removeFile(index)} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {
            this.state.error ?
              <Row className='error-message'>{this.state.error.split('=')[2] || this.state.error}</Row>
              :
              null
          }
          <div className="d-flex gap align-items-center justify-content-center">
            <Link className='link' to='/'>Skip</Link>
            <Button onClick={this.uploadPosters}>Next</Button>
          </div>
        </div>
      </Container>
    );
  }

  removeFile = (index) => {
    let { postersPath } = this.state;
    postersPath = postersPath.filter((poster, i) => i !== index)
    this.setState({ postersPath });
  };

  handleDrag = e => {
    e.preventDefault();
    this.setState({ draggingOver: true });
  }

  handleDragLeave = e => {
    e.preventDefault();
    this.setState({ draggingOver: false });
  }

  handleDrop = e => {
    let { postersPath } = this.state;
    e.preventDefault();
    e.stopPropagation();
    postersPath = postersPath.concat(Array.from(e.dataTransfer.files));
    this.setState({ postersPath, draggingOver: false });
  }

  onFileChange = e => {
    let { postersPath } = this.state;
    e.preventDefault();
    e.stopPropagation();
    postersPath = postersPath.concat(Array.from(e.target.files));
    this.setState({ postersPath });
  }

  uploadPosters = async () => {
    const formData = new FormData();
    let redirectUrl = '';
    let uploadPosters = null;
    this.state.postersPath.forEach((poster, index) => formData.append('images', this.state.postersPath[index]));
    switch (this.props.type) {
      case SERIES_TYPE:
        uploadPosters = async (formData) => { await ShowService.uploadPosters(SERIES_TYPE, formData) };
        redirectUrl = `/series/id/${this.props.id}`;
        formData.append('seriesId', this.props.id);
        break;
      case MOVIE_TYPE:
        uploadPosters = async (formData) => { await ShowService.uploadPosters(MOVIE_TYPE, formData) };
        redirectUrl = `/movies/id/${this.props.id}`;
        formData.append('movieId', this.props.id);
        break;
      case CELEBRITY_TYPE:
        uploadPosters = CelebrityService.uploadPosters;
        redirectUrl = `/celebrities/id/${this.props.id}`;
        formData.append('celebrityId', this.props.id);
        break;
      case SEASON_TYPE:
        uploadPosters = SeasonService.uploadPosters;
        formData.append('seasonId', this.props.id);
        formData.append('seriesId', this.props.seriesId);
        redirectUrl = `/series/id/${this.props.seriesId}/seasons/id/${this.props.id}`;
        break;
      case EPISODE_TYPE:
        uploadPosters = EpisodeService.uploadPosters;
        redirectUrl = `/series/id/${this.props.seriesId}/seasons/id/${this.props.seasonId}/episodes/id/${this.props.id}`;
        formData.append('episodeId', this.props.id);
        formData.append('seriesId', this.props.seriesId);
        formData.append('seasonId', this.props.seasonId);
        break;
      case ARTICLE_TYPE:
        uploadPosters = ArticleService.uploadPosters;
        redirectUrl = `/articles/id/${this.props.id}`;
        formData.append('articleId', this.props.id);
        break;
      default:
        return;
    }
    try {
      await uploadPosters(formData);
      this.props.history.push(redirectUrl);
    } catch (err) {
      this.setState({ error: err.response.data });
    }
  }
}

export default UploadPosters;