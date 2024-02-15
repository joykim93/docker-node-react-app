import React, { useState, useEffect } from 'react'
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {

  const [lists, setLists] = useState([]);
  const [value, setValue] = useState('');

  useEffect(() => {
    // 데이터 베이스에 있는 값을 가져온다
    axios.get(`/api/values`)
      .then(response => {
        console.log('response', response.data)
        setLists(response.data);
      })
  }, [])

  const changeHandler = (event) => {
    setValue(event.currentTarget.value)
  }

  const submitHandler = (event) => {
    event.preventDefault();

    axios.post(`/api/value`, {
      value : value
    })
    .then((response) => {
      console.log(response);
      setLists([...lists, response.data])
      setValue('');
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        
        <div className='container'>
          {lists && lists.map((list, index) => (
            <li key={index}>{list.value}</li>
          ))}

          <form className='example' onSubmit={submitHandler}>
            <input
              type='text'
              placeholder='입력해주세요...'
              onChange={changeHandler}
              value={value}
            />
          </form>
          <button type='submit'>확인</button>
        </div>

      </header>
    </div>
  );
}

export default App;
