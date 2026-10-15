import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import MovieTe from './components/listMovie';
import CharDBZ from './components/charDBZ';
import MyName from './components/myName';
import MyPet from './components/myPet';

function App() {
  const API_KEY = '9037c67c';
  const [response, setPerson] = useState({}); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(false); 
  const [responseDB, setDragonball] = useState({});
  const [responsePoke, setPoke] = useState({});
  const [responseFilme, setFilme] = useState({});
  const [text, setText] = useState(
    localStorage.getItem('easy-input') || ''
  );

  useEffect(() => {
    const getData = async () => {
    try {
        const responseFilme = await axios.get(
          `https://www.omdbapi.com/?i=tt0107290&apikey=${API_KEY}` );
        setFilme(responseFilme.data);
        // const responsePoke = await axios.get(
        //   "https://pokeapi.co/api/v2/pokemon/428" );
        // setPoke(responsePoke.data);
        const responseDB = await axios.get(
          "https://dragonball-api.com/api/characters/38" );
        setDragonball(responseDB.data);
        const response = await axios.get(
          "https://6a79e554674f43f4db11ebc8.mockapi.io/api/person" ); 
        setPerson(response.data);
        setLoading(false); 
        console.log("Success:", response.data);
      } 
      catch (error) {  
        setLoading(false); 
        setError(true);
        console.error( "Erro ao carregar API", error );
      } 
    } 
    getData(); 
  }, []);

  useEffect(() => {
    localStorage.setItem('easy-input', text);
  }, [text]);
  

  if(loading){
    return(<div>Carregando</div>)
  }
  if(error){
    return(<div>Ocorreu um erro</div>)
  }
        return (
          <>
            <section id="center">
              <MovieTe/>
              <div className="hero">
                <CharDBZ/>
              </div>
              <div>
                <MyName/>
              </div>

              <div>
                    <label>
                      Digite o seu nome: 
                    </label>
                    <input
                      type="text"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      placeholder="Digite algo para salvar"
                    />
                  </div>
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

              <MyPet/>
            </section>

            <div className="ticks"></div>
            <section id="spacer"></section>
          </>
        )
}

export default App