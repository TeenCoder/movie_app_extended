import React from "react";
import axios from "axios";
import Movie from "./Movie";
import ShowFav from "./ShowFav";
import { Button } from "corfu";
import "./App.css";

function allStorage() {
  var values = [],
    keys = Object.keys(localStorage),
    i = keys.length;

  while (i--) {
    values.push(localStorage.getItem(keys[i]));
  }
  //const parsedValues = JSON.parse(values);
  //window.localStorage.setItem("AllFav", JSON.stringify(parsedValues));
  //console.log(values);
  let parsedValues = [];
  values.forEach(data => {
    parsedValues.push(JSON.parse(data));
  });

  console.log(values);
  console.log(parsedValues);
  return values;
}

class App extends React.Component {
  state = {
    isLoading: true,
    movies: [],
    ShowFav: false,
    fav: []
  };

  getMovies = async () => {
    const {
      data: {
        data: { movies }
      }
    } = await axios.get("https://yts-proxy.now.sh/list_movies.json");
    this.setState({ movies, isLoading: false });
  };

  renderFav = () => {
    const { showFav } = this.state;
    if ({ showFav }) {
      localStorage.removeItem("__test__");
      const data = allStorage();
      this.setState({ fav: data });
    }
  };

  componentDidMount() {
    this.getMovies();
  }
  render() {
    const { isLoading, movies } = this.state;
    return (
      <section className="container">
        {isLoading ? (
          <div className="loader">
            <span className="loader__text">Loading...</span>
          </div>
        ) : this.state.showFav ? (
          <div>
            <ShowFav arr={this.state.fav} />
          </div>
        ) : (
          <div className="movies">
            {movies.map(movie => (
              <Movie
                key={movie.id}
                id={movie.id}
                year={movie.year}
                title={movie.title}
                summary={movie.summary}
                poster={movie.medium_cover_image}
                genres={movie.genres}
                test="hello world"
              />
            ))}
          </div>
        )}
        <section>
          <Button
            content="Show List"
            edges="rounded"
            primaryColor="dark"
            inverted={false}
            height="100px"
            onClick={() => {
              this.state.showFav
                ? this.setState({ showFav: false })
                : this.setState({ showFav: true });
              this.renderFav();
            }}
          />
        </section>
      </section>
    );
  }
}

export default App;
