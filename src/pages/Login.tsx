import React, { SyntheticEvent, useState } from 'react';
import { Redirect } from 'react-router';

function Login(props: { setName: (name: string) => void }) {
  const [data, setData] = useState({
    password: '',
    email: '',
  });
  const [redirect, setRedirect] = useState(false);

  const onSubmit = async (ev: SyntheticEvent) => {
    ev.preventDefault();

    // !FIXME
    const hostname = 'http://localhost:8000';

    await fetch(`${hostname}/api/v1/login`, {
      method: 'POST',
      body: JSON.stringify(data),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json?.id !== 0) {
          setRedirect(true);
          props.setName(json.name);
        }
      });
  };

  if (redirect) {
    return <Redirect to='/' />;
  }

  return (
    <form onSubmit={onSubmit}>
      <h1 className='h3 mb-3 fw-normal'>Please sign in</h1>

      <div className='form-floating'>
        <input
          type='email'
          className='form-control'
          required
          onChange={(ev) => {
            setData(Object.assign({}, data, { email: ev.target.value }));
          }}
          id='floatingInput'
          placeholder='name@example.com'
        />
        <label htmlFor='floatingInput'>Email address</label>
      </div>
      <div className='form-floating'>
        <input
          type='password'
          className='form-control'
          id='floatingPassword'
          required
          onChange={(ev) => {
            setData(Object.assign({}, data, { password: ev.target.value }));
          }}
          placeholder='Password'
        />
        <label htmlFor='floatingPassword'>Password</label>
      </div>

      <button className='w-100 btn btn-lg btn-primary' type='submit'>
        Sign in
      </button>
    </form>
  );
}

export default Login;
