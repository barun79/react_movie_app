import {  useEffect , useState } from "react"
import Search from "./components/Search"
import Spinner from "./components/Spinner";
import MovieCard from "./components/MovieCard";
import MovieDetail from "./components/MovieDetail";
import { useDebounce } from "react-use";
import { getTrendingMovies, updateSearchCount } from "./appwrite";

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method : 'GET',
  headers : {
    accept : 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

const App = () => {
    const [searchTerm, setsearchTerm] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [movieList, setMovieList] = useState([]);
    const [isLoading, setisLoading] = useState(false);
    const [debouncedSearchTerm, setdebouncedSearchTerm] = useState('');
    const [trendingMovies, setTrendingMovies] = useState([]);

    const [selectedMovie, setSelectedMovie] = useState(null);


    useDebounce(()=> setdebouncedSearchTerm(searchTerm), 500, [searchTerm])


    const fetchMovies = async(query = '') => {
      setisLoading(true);
      setErrorMessage('');
      try {
        const endpoint = query ?
        `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        :`${API_BASE_URL}/discover/movie?include_video=false&language=en-US&page=1&sort_by=popularity.desc`;
        const response = await fetch(endpoint, API_OPTIONS);

        if (!response.ok){
          throw new Error('Failed to fetch movies');
        }

        const data = await response.json();

        if (data.response === 'False'){
          setErrorMessage(data.Error || 'Failed to fetch movie');
          setMovieList([]);
          return;
        }
        setMovieList(data.results || []);
        if (query && data.results.length > 0){
          await updateSearchCount(query, data.results[0]);
        }

      } catch(error) {
        console.error(`Error fetching movies: ${error}`)
        setErrorMessage('Error fectching movies. Please try again later.')
      }finally {
        setisLoading(false);
      }
    }

    const loadTrendingMovies = async() =>{
      try {
        const movies = await getTrendingMovies();
        setTrendingMovies(movies);
      } catch (error) {
        console.error(`Error fetching trending movies : ${error}`);
      }
    }

    useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

    useEffect(()=>{
      loadTrendingMovies();
    },[]);

    if (selectedMovie) {
      return <MovieDetail movie={selectedMovie} onClose={() => setSelectedMovie(null)} />;
    }
  return (
  <main>
    <div className="pattern"/>

    <div className="wrapper">
      <header>
        <img src="hero-img.svg" alt="Hero Banner" />
        <h1>Find <span className="text-gradient">movie</span> that you will enjoy without the hassle</h1>
        <Search searchTerm = {searchTerm} setsearchTerm = {setsearchTerm}/>
      </header>
      {trendingMovies.length > 0 && (
        <section className="trending">
          <h2>Trending Movies</h2>
          
          <ul>
            {trendingMovies.map((movie, index)=>(
              <li key = {movie.$id} onClick={() => setSelectedMovie(movie)} className="cursor-pointer">
                <p>{index+1}</p>
                <img src={movie.poster_url} alt={movie.title} />
              </li>
            ))}
          </ul>
        </section>
      )}
      <section className="all-movies">
        <h2>All Movies</h2>

        {isLoading ? (
          <Spinner/>
        ): errorMessage ? (
          <p className="text-red-500">{errorMessage}</p>
        ):(
          <ul>
            {movieList.map((movie) => (
              <li key={movie.id} onClick={() => setSelectedMovie(movie)} className="cursor-pointer">
                <MovieCard key = {movie.id} movie = {movie}/>
              </li>
              
            ))}
          </ul>
        )}

      </section>
    </div>
  </main>
  )
}
export default App
