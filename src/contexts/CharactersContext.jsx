import { createContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export const CharactersContext = createContext()

const CharactersContextProvider = ({ children }) => {
  const [characters, setCharacters] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [needRefresh, setNeedRefresh] = useState(false)
  const [isStale, setIsStale] = useState(false)

  const location = useLocation()

  const fetchCharacters = async () => {
    console.log('Fetch characters')
    try {
      const response = await fetch('http://localhost:4000/characters')
      if (response.ok) {
        const charactersData = await response.json()
        setCharacters(charactersData)
        setIsLoading(false)
        setNeedRefresh(false)
        setIsStale(false)
        setTimeout(() => {
          setIsStale(true)
        }, 1000 * 60 * 5)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchCharacters()
  }, [])

  const getOneCharacter = characterId => {
    const oneCharacter = characters.find(character => character.id == characterId)
    return oneCharacter
  }

  const triggerRefresh = () => {
    setNeedRefresh(true)
  }

  useEffect(() => {
    if (needRefresh) {
      fetchCharacters()
    }
  }, [needRefresh])

  useEffect(() => {
    if (location.pathname === '/characters' && isStale) {
      triggerRefresh()
    }
  }, [location])

  return (
    <CharactersContext.Provider
      value={{ isLoading, characters, fetchCharacters, getOneCharacter, triggerRefresh }}
    >
      {children}
    </CharactersContext.Provider>
  )
}

export default CharactersContextProvider
