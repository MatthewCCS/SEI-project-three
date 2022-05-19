import { useEffect } from 'react'
import axios from 'axios'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import CitiesShow from './components/Cities/CitiesShow'
import FullPageCities from '../src/components/Cities/FullPageCities'

const App = () => {

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get('/api/cities/') // * <-- replace with your endpoint
      console.log(data)
    }
    getData()
  })

  return (
    <main className='site-wrapper'>
      <BrowserRouter>
        {/* <PageNav /> */}
        <Routes>
          <Route path="/cities/:id" element={<CitiesShow/>} />
        </Routes>
      </BrowserRouter>
    </main>
  )
}

export default App
