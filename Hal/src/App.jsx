import './App.css';
import Navbar from './components/Navbar'
import Homecontent from './components/Homecontent';
import Homecontent2 from './components/Homecontent2';
import Homecontent3 from './components/Homecontent3';
import Contact from './pages/Contact';

function App() {

  return (
    <div className='text-gray-500 dark:text-gray-400'>
    <Navbar />
    <main className="flex-1">
    <Homecontent title="Get Started" link="/login"/>
    <Homecontent2 />
    <Homecontent3 />
    <Contact />
    </main>
    </div>
  )
}

export default App
