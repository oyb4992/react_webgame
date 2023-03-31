const React = require('react');
const { useState, useRef } = React; //exports 되는게 객체나 배열이면 구조 분해 가능.

const NumberBaseball = () => {
  const [result, setResult] = useState('');
  const [value, setValue] = useState('');
  const [answer, setAnswer] = useState(0);
  const [tries, setTries] = useState([]);
  const inputRef = useRef(null);

  const onSubmitForm = (e) => {
    e.preventDefault();
    inputRef.current.focus();
    setTries((oldValue) => oldValue.push(value));
  };

  const onChangeInput = (e) => {
    setValue(e.target.value);
  };

  const getNumbers = () => {
    return 0;
  }
  return (
    <>
      <div>{result}</div>
      <form onSubmit={onSubmitForm}>
        <input
          ref={inputRef}
          type="number"
          maxLength={4}
          value={value}
          onChange={onChangeInput}
        /> 
        <button>입력!</button>
      </form>
      <div>시도: {tries.length}</div>
      <ul>
      { /* key는 성능최적화하는데 사용이 되므로 index로 쓰지말고 유니크한 값을 사용할 수 있도록 한다. */
        tries.map((num, index) => {
          return (
            <li key={num + index}>{num}</li>
          );
        })
      }
      </ul>
  </>
  );
};

module.exports = NumberBaseball;
