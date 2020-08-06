import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
axios.defaults.headers.common['Authorization'] =
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NDE5ODJjMjNkYzIzMDYwM2U3NzBkZDIwNTMwMWQ3MCIsInN1YiI6IjVmMmFkMDk4NzlhMWMzMDAzODMxNGQyYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bMJtd-MNXiUtSZ_oxmkIaZPCY75PrIEijur-iovW4SA';

const fetchTrendingMovies = () => {
  return axios
    .get('trending/movie/day')
    .then(response => response.data.results);
};

const fetchMovieById = id => {
  return axios.get(`movie/${id}`).then(response => console.log(response));
};

export default { fetchTrendingMovies, fetchMovieById };
