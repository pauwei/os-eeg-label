import { AuthProvider } from './helpers/AuthContext';
import PublicRoutes from './routes/public.routes';
import ProtectedRoutes from './routes/protected.routes';
import Navbar from './components/Navbar';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Navbar />
        <PublicRoutes />
        <ProtectedRoutes />
      </AuthProvider>
    </div>
  );
}

export default App;
