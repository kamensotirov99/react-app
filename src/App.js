import './App.css';

import HomePage from './Components/HomePage';
import CustomNavbar from './Components/Navbar';
import ShowPage from './Components/ShowPage';
import CreateArticlePage from './Components/CreateArticlePage';
import CreateCelebrityPage from './Components/CreateCelebrityPage';
import CreateGenrePage from './Components/CreateGenrePage';
import CreateSeasonPage from './Components/CreateSeasonPage';
import CreateShowPage from './Components/CreateShowPage';
import CreateEpisodePage from './Components/CreateEpisodePage';
import CelebrityPage from './Components/CelebrityPage';
import ArticlePage from './Components/ArticlePage';
import JournalistArticlesPage from './Components/JournalistArticlesPage';
import Footer from './Components/Footer';
import MoviesPage from './Components/MoviesPage';
import SeriesPage from './Components/SeriesPage';
import CelebritiesPage from './Components/CelebritiesPage';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

function App() {
  return (
    <div className='App'>
      <Router>
        <CustomNavbar />
        <Switch>
          <Route exact path='/' >
            <HomePage />
          </Route>
          <Route exact path='/series/id/:seriesId/seasons/id/:seasonId/createEpisode' render={(props) => <CreateEpisodePage {...props} />} />
          <Route exact path='/series/id/:seriesId/createSeason' render={props => <CreateSeasonPage {...props} />} />
          <Route path='/journalists/id/:id/articles' render={props => <JournalistArticlesPage {...props} />} />
          <Route path='/celebrities/id/:id' render={props => <CelebrityPage {...props} />} />
          <Route path='/articles/id/:id' render={props => <ArticlePage {...props} />} />
          <Route path={['/series/id/:id/seasons/id/:seasonId/episodes/id/:episodeId', '/series/id/:id/seasons/id/:seasonId', '/movies/id/:id/', '/series/id/:id/']} render={props => <ShowPage {...props} key={window.location.pathname} />} />
          <Route path='/movies' render={props => <MoviesPage {...props} />} />
          <Route path='/series' render={props => <SeriesPage {...props} />} />
          <Route path='/celebrities' render={props => <CelebritiesPage {...props} />} />
          <Route path='/createShow' render={props => <CreateShowPage {...props} />} />
          <Route path='/createArticle' render={props => <CreateArticlePage {...props} />} />
          <Route path='/createCelebrity' render={props => <CreateCelebrityPage {...props} />} />
          <Route path='/createGenre'>
            <CreateGenrePage />
          </Route>
          <Route path='/createShow' render={props => <CreateShowPage {...props} />}>
          </Route>
          <Route path={'/series/:seriesId/season/:seasonId/createEpisode'} render={(props) => <CreateEpisodePage {...props} />}></Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
