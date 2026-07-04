import './App.css';
import { RouterProvider, Routes } from './router/Router';
import { AuthProvider } from './auth/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Resume from './pages/Resume';
import Projects from './pages/Projects';
import SuggestionWarehouse from './pages/SuggestionWarehouse';
import Workshop3D from './pages/Workshop3D';
import CelebratingOthers from './pages/CelebratingOthers';
import Recipes from './pages/Recipes';
import CorgiCorner from './pages/CorgiCorner';

const routes = {
  '/': Home,
  '/resume': Resume,
  '/projects': Projects,
  '/suggestion-warehouse': SuggestionWarehouse,
  '/3d-workshop': Workshop3D,
  '/celebrating-others': CelebratingOthers,
  '/recipes': Recipes,
  '/corgi-corner': CorgiCorner,
};

function App() {
  return (
    <RouterProvider>
      <AuthProvider>
        <div className="App">
          <Navbar />
          <Routes routes={routes} fallback={Home} />
          <footer className="App-footer">
            © {new Date().getFullYear()} Madison K. Boudreaux
          </footer>
        </div>
      </AuthProvider>
    </RouterProvider>
  );
}

export default App;
