import './App.css';
import Login from './pages/Login';
import Navigation from './components/Navigation';
import { BrowserRouter, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import Register from './pages/Register';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Navigation />
        <main className='form-signin'>
          <Route path='/' exact component={Home}></Route>
          <Route path='/login' component={Login}></Route>
          <Route path='/register' component={Register}></Route>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
