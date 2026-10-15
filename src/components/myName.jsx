import useFetchAPI from "../hooks/useFetchAPI"

export default function MyName() {   
    const {loading, error, ret} = useFetchAPI(
        "https://6a79e554674f43f4db11ebc8.mockapi.io/api/person/","62"
    )
    if(loading){
        return(<div>Carregando</div>)
    }
    if(error){
        return(<div>Ocorreu um erro</div>)
    }
    return( 
    <div>
        <h1>{ret.nome} {ret.sobrenome}</h1>
    </div> 
    )
}