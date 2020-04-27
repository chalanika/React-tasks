import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import Like from './like';

export default class Movies extends Component {
    state = {
        movies: getMovies()
    }

    handleLike = (movie) => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        // movies[index] = {...movies[index]};
        // console.log(movies[index].liked);
        movies[index].liked = !movies[index].liked;
        this.setState({movies});
    }

    handleDelete = (movie) => {
        console.log(movie);
        const movies = this.state.movies.filter(m => m._id !== movie._id);
        this.setState({ movies: movies });
    }

    render() {
        console.log('movies');
        const { length: count } = this.state.movies;
        if (count === 0) {
            return <p>No movies yet.</p>
        }
        return (
            <React.Fragment>
                <p>{count} movies</p>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Genre</th>
                            <th scope="col">Stock</th>
                            <th scope="col">Rate</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.movies.map(movie => (
                            <tr key={movie._id}>
                                <th>{movie.title}</th>
                                <td>{movie.genre.name}</td>
                                <td>{movie.numberInStock}</td>
                                <td>{movie.dailyRentalRate}</td>
                                <td><Like liked={movie.liked} onClick={() => this.handleLike(movie)} /></td>
                                <td><button onClick={() => this.handleDelete(movie)} className="btn btn-danger">Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </React.Fragment>
        );
    }
}