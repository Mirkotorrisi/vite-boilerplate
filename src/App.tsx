import { ReactNode, Suspense } from 'react';
import { routes, protectedRoutes } from './routes';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';
import AuthProvider from './providers/AuthProvider';
import { useAuth } from './hooks/useAuth';

interface Props {
  redirectPath?: string;
  children?: ReactNode;
}
const ProtectedRoute = ({ redirectPath = '/login', children }: Props) => {
  const { user } = useAuth();

  if (!user) return <Navigate to={redirectPath} replace />;
  return children ?? <Outlet />;
};

function App() {
  return (
    <Suspense fallback="...is loading">
      <Router>
        <AuthProvider>
          <Routes>
            {routes.map(({ component, path }) => (
              <Route path={path} Component={component} key={path} />
            ))}
            <Route element={<ProtectedRoute />}>
              {protectedRoutes.map(({ component, path }) => (
                <Route path={path} Component={component} key={path} />
              ))}
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </Suspense>
  );
}

export default App;
