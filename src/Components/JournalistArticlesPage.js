import React from "react";
import ArticleService from "../Services/Article";

class JournalistArticlesPage extends React.Component {
  state = {
    articles: [],
    error: '',
  }

  render() {
    return (
      // TODO add new articles card here
      <div>{console.log(this.state.articles)}</div>
    );
  }

  componentDidMount = async () => {
    let { id } = this.props.match.params;
    try {
      let articles = await ArticleService.listArticles(id);
      this.setState({ articles });
    } catch (err) {
      this.setState({ error: err.response.data });
    }
  }
}

export default JournalistArticlesPage;