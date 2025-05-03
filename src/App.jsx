import './App.css'
import Carros from './Components/Carros'
import Inicio from './Components/Inicio'
import SideBar from './Components/SideBar'

function App() {

  return (
    <div className='container'>
      <SideBar />
      {/* <Inicio /> */}
      <Carros />
    </div>
  )
}

export default App
