import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CharactersContext } from '../contexts/CharactersContext'

const CharacterDetailsPage = () => {
  const { characterId } = useParams()
  const { getOneCharacter } = useContext(CharactersContext)

  const [character, setCharacter] = useState()

  useEffect(() => {
    setCharacter(getOneCharacter(characterId))
  }, [characterId])

  return (
    <>
      <h1>Details of one character ({characterId})</h1>
      {character && <p>{character.name}</p>}
    </>
  )
}

export default CharacterDetailsPage
