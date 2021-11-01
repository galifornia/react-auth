import { SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';

const Navigation = (props: {
  isLogged: boolean;
  setName: (name: string) => void;
}) => {
  const onLogout = async (ev: SyntheticEvent) => {
    // !FIXME
    const hostname = 'http://localhost:8000';

    await fetch(`${hostname}/api/v1/logout`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    props.setName('');
  };
  return (
    <nav className='navbar navbar-expand-md navbar-dark bg-dark mb-4'>
      <div className='container-fluid'>
        <div>
          <ul className='navbar-nav me-auto mb-2 mb-md-0'>
            <li className='nav-item'>
              <Link className='nav-link active' aria-current='page' to='/'>
                Home
              </Link>
            </li>
            {!props.isLogged && (
              <li className='nav-item'>
                <Link className='nav-link' to='/login'>
                  LogIn
                </Link>
              </li>
            )}

            {!props.isLogged && (
              <li className='nav-item'>
                <Link className='nav-link' to='/register'>
                  Register
                </Link>
              </li>
            )}

            {props.isLogged && (
              <li className='nav-item'>
                <Link className='nav-link' to='/login' onClick={onLogout}>
                  Log out
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
