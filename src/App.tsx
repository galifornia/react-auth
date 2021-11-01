import './App.css';
import Login from './pages/Login';
import Navigation from './components/Navigation';
import { BrowserRouter, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import Register from './pages/Register';
import { useState, useEffect } from 'react';

function App() {
  const [name, setName] = useState('');
  useEffect(() => {
    // !FIXME
    const hostname = 'http://localhost:8000';
    (async () => {
      await fetch(`${hostname}/api/v1/user`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((json) => {
          if (json?.id !== 0) {
            setName(json.name || '');
          }
        });
    })();
    return () => {
      // cleanup;
    };
  }, []);
  return (
    <div className='App'>
      <BrowserRouter>
        <Navigation isLogged={name !== ''} setName={setName} />
        <main className='form-signin'>
          <Route path='/' exact component={() => <Home name={name} />}></Route>
          <Route
            path='/login'
            component={() => <Login setName={setName} />}
          ></Route>
          <Route path='/register' component={Register}></Route>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
