import { useEffect, useState } from "react"
import PokemonCards from "./PokemonCards";

const Pokemon = () =>
{
    const [pokemon, setPokemon] =useState([])
    const [loading, setLoading] =useState(true)
    const [error, setError] =useState(null)
    const [search ,setSearch] = useState("")

    const API = 'https://pokeapi.co/api/v2/pokemon?limit=124';

    const  Fetchapi = async()=>
    {
        try {
            const res = await fetch(API);
            const data = await res.json();
            // console.log(data);
          
            const detailedPokemonData = data.results.map(async(currpokemon)=>{
                const res = await fetch(currpokemon.url)
                const data= await res.json();
                return data

            })
            const detailedResponse = await Promise.all(detailedPokemonData)
             console.log(detailedResponse);
            setPokemon(detailedResponse);
            setLoading(false)
            

        } catch (error) {
            console.log(error);
            setLoading(false)
            setError(error)
            
        }

    }
    
    useEffect(()=>{
        Fetchapi();
    },[])

    const searchData = pokemon.filter((curcard)=>
    
        curcard.name.toLowerCase().includes(search.toLowerCase()))

    if(loading)
    {
        return<div>
            <h1>Loading...</h1>
        </div>
    }
    if(error)
    {
        return(
            <div>
                <h1>{error.message}</h1>
            </div>
        )
    }

    return(
        <>
        <section className="container">
            <header>
                <h1>Lets Catch pokemon</h1>
                </header>
                <div className="pokemon search">
                    <input
                    type="text"
                    placeholder="search pokemon"
                    value={search}
                    onChange={(e)=> setSearch(e.target.value)}>
                    </input>
                </div>
                <div>
                    <ul className="cards">
                        
                            {searchData.map((currPokemon)=>
                            {
                                return(
                                    <PokemonCards key={currPokemon.id} pokemonData ={currPokemon}/>
                                )
                            })
                        }
                    </ul>
                </div>
        </section>
        </>
    )
}
export  default Pokemon;