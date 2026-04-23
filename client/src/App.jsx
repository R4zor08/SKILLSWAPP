import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import { AppRouter } from './routes/AppRouter.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <AppRouter />
      </AuthProvider>
    </BrowserRouter>
  );
}
