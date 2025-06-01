import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Benefits from './components/Benefits'
import Footer from './components/Footer'

const App = () =>(
  <div className="bg-slate-900 w-full overflow-hidden">
    <div>
      <Navbar/>
    </div>

    <div className="mt-[170px]">
      <Hero/>
    </div>

    <div className="mt-[160px]">
      <Benefits />
    </div>

    <div className="mt-[100px]">
      <Footer />
    </div>

  </div>
)

export default App