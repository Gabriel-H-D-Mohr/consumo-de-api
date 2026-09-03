import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [count, setCount] = useState(0)
  const [response, setPerson] = useState({}); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(false); 
  const [responseDB, setDragonball] = useState({});
  const [responsePoke, setPoke] = useState({})
  const [responseFilme, setFilme] = useState({})

  useEffect(() => {
    const getData = async () => {
    try {
    const responseFilme = await axios.get( "https://www.omdbapi.com/?i=tt0107290&apikey=9037c67c" );
    setFilme(responseFilme.data);
    const responsePoke = await axios.get( "https://pokeapi.co/api/v2/pokemon/428" );
    setPoke(responsePoke.data);
    const responseDB = await axios.get( "https://dragonball-api.com/api/characters/38" );
    setDragonball(responseDB.data);
    const response = await axios.get( "https://6a79e554674f43f4db11ebc8.mockapi.io/api/person" ); 
    setPerson(response.data); 
    console.log("Success:", response.data); 
    setLoading(false); 
    } 
    catch (e) { 
    console.error( "Erro ao carregar API", e ); 
    setLoading(false); 
    setError(true); 
    } 
    } 
    getData(); 
  }, []);

      if(loading){return (<div>Carregando</div>)}
      if(error){return (<div>Ocorreu um erro</div>)}

        return (
          <>
            <section id="center">
              <div className="hero">
                <img src = {responseDB.image} className="base" width="170" height="380" alt="" />
              </div>
              <div>
                <h1>{response[38].nome} {response[38].sobrenome}</h1>
                <h1>Ki base: {responseDB.ki}</h1>
                <h1>Ki máximo: {responseDB.maxKi}</h1>
              </div>
              <button
                type="button"
                className="counter"
                onClick={() => setCount((count) => count + 1)}
              >
                Count is {count}
              </button>
            </section>

            <div className="ticks"></div>

            <section id="next-steps">
              <div id="docs">
                <h2>Filme favorito:</h2>
                <p>Nome do filme: {responseFilme.Title}</p>
                <p>Gênero(s): {responseFilme.Genre}</p>
                <p>Premiações: {responseFilme.Awards}</p>
                <p>Ano de lançamento: {responseFilme.Year}</p>
                <img src={responseFilme.Poster}/>
                <h2>Avaliações:</h2>
                <p>{responseFilme.Ratings[0].Source}: {responseFilme.Ratings[0].Value}</p>
                <p>{responseFilme.Ratings[1].Source}: {responseFilme.Ratings[1].Value}</p>
                <p>{responseFilme.Ratings[2].Source}: {responseFilme.Ratings[2].Value}</p>
                <p>IMDB: {responseFilme.imdbRating}</p>
              </div>

              <div id="social">
                <h2>Meu pet:</h2>
                <p>Nome: {responsePoke.name}</p>
                <p>Tipo(s): {responsePoke.types[0].type.name}</p>
                <img src={responsePoke.sprites.front_default} width="300" height="300"/>
              </div>
            </section>

            <div className="ticks"></div>
            <section id="spacer"></section>
          </>
        )
}

export default App