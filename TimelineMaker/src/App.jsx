import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Benefits from './components/Benefits'
import Footer from './components/Footer'

const App = () =>(
  <div className="bg-slate-900 w-full overflow-hidden">
    <div>
      <div>
        <Navbar/>
      </div>
    </div>

    <div className="mt-[140px]">
      <div>
        <Hero/>
      </div>
    </div>

    <div>
      <div>
        <Benefits />
      </div>
    </div>

    <div>
      <div>
        <Footer />
      </div>
    </div>

  </div>
)

export default App