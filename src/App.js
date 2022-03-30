import { AuthProvider } from './helpers/AuthContext';
import PublicRoutes from './routes/public.routes';
import ProtectedRoutes from './routes/protected.routes';
import './App.css';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <PublicRoutes />
        <ProtectedRoutes />
      </AuthProvider>
    </div>
  );
}

export default App;
