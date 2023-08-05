import React, { Component } from "react";
import Pagination from "./common/pagination";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/like";

class Movies extends Component {
  state = {
    movies: getMovies(),
    currentPage: 1,
    pageSize: 2,
  };

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage } = this.state;

    if (count === 0) return <p>There is no movies in the database.</p>;

    return (
      // React.Fragment is to protect from error
      // the error has come from jsx only one element render
      // so there must be in a div or React.Fragment
      <React.Fragment>
        <p>Showing {count} movies in the database.</p>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Gener</th>
              <th>Stock</th>
              <th>Rate</th>
              <th>Like</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.movies.map((movie) => (
              <tr key={movie._id}>
                {/* each row must uniquely identify otherwise console error */}
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <Like
                    liked={movie.liked}
                    onClick={() => this.handleLike(movie)}
                  />
                </td>
                <td>
                  <button
                    onClick={() => this.handleDelete(movie)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          itemsCount={count}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />
      </React.Fragment>
    );
  }
}

export default Movies;
