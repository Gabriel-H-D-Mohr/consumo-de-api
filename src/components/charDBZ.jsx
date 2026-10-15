import useFetchAPI from "../hooks/useFetchAPI"

export default function getData() {   
    const {loading, error, ret} = useFetchAPI(
        "https://dragonball-api.com/api/characters/", "38"
    )
    if(loading){
        return(<div>Carregando</div>)
    }
    if(error){
        return(<div>Ocorreu um erro</div>)
    }
    return( 
    <div>
        <img src = {ret.image} className="base" width="170" height="380" alt="" />
    </div> 
    )
}