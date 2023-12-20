import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import AllCharactersPage from './pages/AllCharactersPage'
import CharacterDetailsPage from './pages/CharacterDetailsPage'
import { useContext } from 'react'
import { CharactersContext } from './contexts/CharactersContext'

function App() {
  const { isLoading } = useContext(CharactersContext)

  return isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<h1>Home Page</h1>} />
        <Route path='/characters' element={<AllCharactersPage />} />
        <Route path='/characters/:characterId' element={<CharacterDetailsPage />} />

        <Route path='*' element={<h1>404 Page</h1>} />
      </Routes>
    </>
  )
}

export default App
