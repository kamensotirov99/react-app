import React from "react";
import { Link } from "react-router-dom";

class GenreCirlce extends React.Component {
  render() {
    return (
      <div className='genre-circle-container'>
        <Link className='link genre-circle-name' key={this.props.id} to={`/genre/id/${this.props.id}`}>{this.props.name}</Link>
      </div>
    );
  }
}

export default GenreCirlce;