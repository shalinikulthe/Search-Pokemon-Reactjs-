import '../styles.css'

const PokemonCards = ({pokemonData}) =>
{
    return(
        <li className="pokemon-cards">
            <figure>
                <img
                src={pokemonData.sprites.other.dream_world.front_default}
                alt={pokemonData.name}
                className="pokemon-image"/>
            </figure>
            <h1 className='pokemon-name'>{pokemonData.name}</h1>
            <div className='pokemon-info'>
                <p>
                    {pokemonData.types.map((currType)=>currType.type.name).join(" , ")}
                    
                </p>
            </div>
        </li>
    );
};
 export default PokemonCards;