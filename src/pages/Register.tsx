import React, { SyntheticEvent, useState } from 'react';
import { Redirect } from 'react-router';
function Register() {
  const [data, setData] = useState({
    name: '',
    password: '',
    email: '',
  });
  const [redirect, setRedirect] = useState(false);

  const onSubmit = async (ev: SyntheticEvent) => {
    ev.preventDefault();

    // !FIXME
    const hostname = 'http://localhost:8000';

    await fetch(`${hostname}/api/v1/register`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json?.id !== 0) {
          setRedirect(true);
        }
      });
  };

  if (redirect) {
    return <Redirect to='/login' />;
  }

  return (
    <form onSubmit={onSubmit}>
      <h1 className='h3 mb-3 fw-normal'>You can register here</h1>
      <div className='form-floating'>
        <input
          type='text'
          required
          onChange={(ev) => {
            setData(Object.assign({}, data, { name: ev.target.value }));
          }}
          className='form-control'
          id='name'
          placeholder='name@example.com'
        />
        <label htmlFor='name'>Your name</label>
      </div>
      <div className='form-floating'>
        <input
          type='email'
          className='form-control'
          id='email'
          required
          onChange={(ev) => {
            setData(Object.assign({}, data, { email: ev.target.value }));
          }}
          placeholder='name@example.com'
        />
        <label htmlFor='email'>Email address</label>
      </div>
      <div className='form-floating'>
        <input
          type='password'
          className='form-control'
          id='password'
          required
          onChange={(ev) => {
            setData(Object.assign({}, data, { password: ev.target.value }));
          }}
          placeholder='Password'
        />
        <label htmlFor='password'>Password</label>
      </div>

      <button className='w-100 btn btn-lg btn-primary' type='submit'>
        Register
      </button>
    </form>
  );
}

export default Register;
