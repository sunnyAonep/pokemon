import { QueryClientProvider } from '@tanstack/react-query';
import './App.css';
import Home from './pages/Home';
import { QueryClient } from '@tanstack/react-query';

function App() {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={client}>
      <div className='w-full h-full'>
       <Home/>
      </div>
    </QueryClientProvider>
  );
}

export default App;
