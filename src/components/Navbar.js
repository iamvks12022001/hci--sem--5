import React from "react";
import { connect } from "react-redux";
import annyang from "annyang";
import { addMovieToList, handleMovieSearch } from "../actions";
//import SpeechKITT from "speechkitt";
class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      voice: "",
    };
  }
  handleAddToMovies = (movie) => {
    this.props.dispatch(addMovieToList(movie));
    this.setState({
      showSearchResults: false,
    });
  };

  handleSearch = () => {
    const { searchText } = this.state;
    this.props.dispatch(handleMovieSearch(searchText));
  };
  handleChange = (e) => {
    this.setState({
      searchText: e.target.value,
    });
  };

  componentDidUpdate() {
    console.log("annyang", annyang);
    if (annyang) {
      // Let's define a command.
      console.log("annyang is working !!", annyang);
      var commands = {
        "add the movie": () => {
          const { result } = this.props.search;
          this.props.dispatch(addMovieToList(result));
          document.getElementById("search-bar").value = "";
          this.setState({
            showSearchResults: false,
            voice: "add the movie",
          });
        },
        "search the movie *tag": (variable) => {
          this.props.dispatch(handleMovieSearch(variable));
          document.getElementById("search-bar").value = variable;
          this.setState({
            voice: `search the movie ${variable}`,
          });
          //e.target.value=variable
        },
        "go to favourite section": () => {
          document.getElementById("fav-movie").click();
          this.setState({
            voice: `go to favourite section`,
          });
        },
        "go to movie section": () => {
          document.getElementById("movies").click();
          this.setState({
            voice: `go to movie section`,
          });
        },
        "mark *tag": (variable) => {
          console.log("sta");
          const { list } = this.props.movies;
          console.log("list", list);
          const index = list.findIndex(
            (element) => element.Title.toLowerCase() === variable.toLowerCase()
          );
          console.log("index", index);
          //  index = 0;
          if (index !== -1) {
            document.getElementById(`movies-${index}`).click();
          }
          this.setState({
            voice: `mark ${variable}`,
          });
        },
        "unmark *tag": (variable) => {
          console.log("sta");
          const { list } = this.props.movies;
          console.log("list", list);
          const index = list.findIndex(
            (element) => element.Title.toLowerCase() === variable.toLowerCase()
          );
          console.log("index", index);
          //  index = 0;
          if (index !== -1) {
            document.getElementById(`movies-${index}`).click();
          }
          this.setState({
            voice: `unmark ${variable}`,
          });
        },
        "scroll down *tag": (variable) => {
          if (variable.toLowerCase() === "bottom") {
            window.scrollTo(0, document.body.scrollHeight);
          } else {
            if (variable.toLowerCase() === "medium") {
              window.scrollBy(0, 600);
            } else {
              window.scrollBy(0, 300);
            }
          }
          this.setState({
            voice: `scroll down ${variable}`,
          });
        },
        "scroll up *tag": (variable) => {
          if (variable.toLowerCase() === "top") {
            window.scrollTo(0, 0);
          } else {
            if (variable.toLowerCase() === "medium") {
              window.scrollBy(0, -600);
            } else {
              window.scrollBy(0, -300);
            }
          }
          this.setState({
            voice: `scroll up ${variable}`,
          });
        },
        "download commands": () => {
          document.getElementById("pdf-download").click();
          this.setState({
            voice: `download commands`,
          });
        },
      };

      annyang.addCommands(commands);
      annyang.start();
    }
  }

  render() {
    const { result, showSearchResults } = this.props.search;
    console.log("res", result);
    return (
      <div>
        <div className="nav">
          <div className="search-container">
            <input id="search-bar" onChange={this.handleChange} />
            <button id="search-btn" onClick={this.handleSearch}>
              Search
            </button>

            {showSearchResults && (
              <div className="search-results">
                <div className="search-result">
                  <img src={result.Poster} alt="search-pic" />
                  <div className="movie-info">
                    <span>{result.Title}</span>
                    <button onClick={() => this.handleAddToMovies(result)}>
                      Add to Movies
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="voice">
          {annyang.isListening() && (
            <div className="voicetext">
              <i> Did you mean ... </i>
              {this.state.voice}
            </div>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(store) {
  console.log("gifwefwexxxx", store);
  return {
    search: store.search,
    movies: store.movies,
  };
}

export default connect(mapStateToProps)(Navbar);
//export default Navbar;
