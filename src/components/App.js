import React from "react";
import { data } from "../data";
import Navbar from "./Navbar";
import MovieCard from "./MovieCard";
import { addMovies, setShowFavourites } from "../actions";
import { connect } from "react-redux";

console.log("inside App.js file");
class App extends React.Component {
  componentDidMount() {
    // make api call to add movies to store
    //dipatch call

    this.props.dispatch(addMovies(data));
    console.log("STATE", this.props);
  }
  isMovieFavourite = (movie) => {
    const { movies } = this.props;
    const { favourites } = movies;

    const index = favourites.indexOf(movie);
    if (index !== -1) {
      //we found the movie
      console.log("trueeeeeee");
      return true;
    }
    // we not find the movie
    console.log("falseeeee");
    return false;
  };

  onChangeTab = (val) => {
    this.props.dispatch(setShowFavourites(val));
  };

  render() {
    console.log("render");
    const { movies, search } = this.props;
    const { list, favourites, showFavourites } = movies; //now get the object
    const displayMovies = showFavourites ? favourites : list;
    return (
      <div className="App">
        <Navbar search={search} />{" "}
        <p>use "Download Command" to download all commands</p>
        {/* //search=this.props.store.getState().search; */}
        <div className="main">
          <div className="download">
            <a
              id="pdf-download"
              href={process.env.PUBLIC_URL + "/document/controls.pdf"}
              download
            >
              <img
                className="pdf"
                src="https://cdn-icons-png.flaticon.com/128/80/80942.png"
                alt="download"
              />
            </a>
          </div>
          <div className="tabs">
            <div
              id="movies"
              className={`tab ${showFavourites ? "" : " active-tabs"}`}
              onClick={() => this.onChangeTab(false)}
            >
              Movies
            </div>
            <div
              id="fav-movie"
              className={`tab ${showFavourites ? " active-tabs" : ""}`}
              onClick={() => this.onChangeTab(true)}
            >
              Favourites
            </div>
          </div>

          <div className="list">
            {displayMovies.map((movie, index) => (
              <MovieCard
                movie={movie}
                id={`movies-${index}`}
                key={`movies-${index}`}
                dispatch={this.props.dispatch}
                isFavourite={this.isMovieFavourite(movie)}
              />
            ))}
          </div>
          {displayMovies.length === 0 ? (
            <div className="no-movies">No movies to display!</div>
          ) : null}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    movies: state.movies,
    search: state.movies,
  };
}
//this function mapStateToProps return all the data that we need to pass to App as props
const connectedAppComponent = connect(mapStateToProps)(App);
//first argument is function specify which data to return and second component
//specify which class to pass this data as a props
//and now export the return component to index.js src
//and pls note if we make changes  in data which we passed(connect) then and then only class App re render alse not
export default connectedAppComponent;
