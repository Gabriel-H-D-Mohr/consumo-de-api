import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import MovieTe from './components/listMovie';
import CharDBZ from './components/charDBZ';
import MyName from './components/myName';
import MyPet from './components/myPet';
import ThemeButton from './components/themeButton';

function App() {
  const API_KEY = '9037c67c';
  const [resPerson, setPerson] = useState({}); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(false); 
  const [responseFilme, setFilme] = useState({});
  const [text, setText] = useState(
    localStorage.getItem('easy-input') || ''
  );
  const [dark, setDark] = useState(false);
  const theme = dark ? 'theme-dark' : 'theme-light';

  useEffect(() => {
    const getData = async () => {
    try {
        const responseFilme = await axios.get(
          `https://www.omdbapi.com/?i=tt0107290&apikey=${API_KEY}` );
        setFilme(responseFilme.data);
        const resPerson = await axios.get(
          "https://6a79e554674f43f4db11ebc8.mockapi.io/api/person" ); 
        setPerson(resPerson.data);
        setLoading(false); 
        console.log("Success:", resPerson.data);
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
            <section id="center" className={theme}>
              <ThemeButton dark={dark}
                onToggle={() => setDark(!dark)}/>
                <div className={theme}>
                  <MovieTe/>
                  </div>
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

            <section id="next-steps" className={theme}>
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
          </>
        )
}

export default App

//background: linear-gradient(45deg, #bf0603,#012641);