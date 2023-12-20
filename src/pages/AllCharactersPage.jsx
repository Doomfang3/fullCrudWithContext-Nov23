import { useContext } from 'react'
import { CharactersContext } from '../contexts/CharactersContext'
import { Link } from 'react-router-dom'

const AllCharactersPage = () => {
  const { characters, triggerRefresh } = useContext(CharactersContext)

  return (
    <>
      <h1>All the characters</h1>
      <button type='button' onClick={triggerRefresh}>
        Refresh
      </button>
      <ul>
        {characters.map(character => (
          <li key={character.id}>
            <Link to={`/characters/${character.id}`}>{character.name}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export default AllCharactersPage
