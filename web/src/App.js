import AppRoutes from './routes'

import './App.css'
import StoreProvider from './contexts/Provider';


function App() {
  return (
    <StoreProvider>
      <AppRoutes />
    </StoreProvider>
      
  );
}

export default App;
