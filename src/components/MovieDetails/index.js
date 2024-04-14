import './index.css'
import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import NavBar from '../NavBar'

const MovieDetails = () => {
  const {id} = useParams()
  const [movieDetails, setMovieDetails] = useState('')
  const [castDetails, setCastDetails] = useState([])

  const getUpdatedData = data => {
    const movieData = {
      name: data.title,
      imageUrl: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
      rating: data.vote_average,
      duration: data.runtime,
      genre: data.genres.map(eachItem => eachItem.name),
      releaseDate: data.release_date,
      overview: data.overview,
    }
    return movieData
  }

  const fetchMovieDetailsApi = async () => {
    const API_KEY = 'c30f3145f60cfa18cd42afbf59d27eaf'
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
    const response = await fetch(url)
    const data = await response.json()
    const newData = getUpdatedData(data)
    setMovieDetails(newData)
  }

  const getCastData = data => {
    const castData = data.cast.map(eachCast => ({
      id: eachCast.id,
      castImage: `https://image.tmdb.org/t/p/w500${eachCast.profile_path}`,
      name: eachCast.name,
      characterName: eachCast.character,
    }))
    return castData
  }

  const fetchCastDetailsApi = async () => {
    const API_KEY = 'c30f3145f60cfa18cd42afbf59d27eaf'
    const url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`
    const response = await fetch(url)
    const data = await response.json()
    const newData = getCastData(data)
    setCastDetails(newData)
  }

  useEffect(() => {
    fetchMovieDetailsApi()
    fetchCastDetailsApi()
  })

  return (
    <div className="details-container">
      <NavBar />
      <div className="movie-details-co">
        <h1 className="movie-title">{movieDetails.name}</h1>
        <div className="movie-details-container">
          <img src={movieDetails.imageUrl} alt="movie" className="movie-img" />
          <div className="side-part">
            <p className="para">Rating: {movieDetails.rating}</p>
            <p className="para">Duration: {movieDetails.duration}</p>
            <p className="para">Release Date: {movieDetails.releaseDate}</p>
            <p className="para">overview: {movieDetails.overview}</p>
          </div>
        </div>
      </div>
      <div className="cast-details">
        <ul className="cast-lists">
          {castDetails.map(eachCast => (
            <li className="cast" key={eachCast.id}>
              <>
                <h1 className="cast-heading">{eachCast.name}</h1>
                <img src={eachCast.castImage} alt="cast" className="cast-img" />
                <p className="para1">{eachCast.characterName}</p>
              </>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
export default MovieDetails
