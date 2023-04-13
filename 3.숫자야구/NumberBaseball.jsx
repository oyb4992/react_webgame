const React = require('react');
const { useState, useRef } = React; //exports 되는게 객체나 배열이면 구조 분해 가능.

const NumberBaseball = () => {
  const [result, setResult] = useState('');
  const [value, setValue] = useState('');
  const [answer, setAnswer] = useState(getNumbers());
  const [tries, setTries] = useState([]); //react는 배열에 값을 넣을때 push를 사용하면 안됨.
  const inputRef = useRef(null);

  function onSubmitForm(e) {
    e.preventDefault();
    if (value === '') {
      return;
    }
    if (value.length !== 4) {
      alert('4자리 숫자를 입력해주세요.');
      setValue('');
      inputRef.current.focus();
      return;
    }
    if (new Set(value).size !== 4) {
      alert('중복되지 않게 입력해주세요.');
      setValue('');
      inputRef.current.focus();
      return;
    }
    if (tries.length >= 9) {
      setResult(`10번 넘게 틀려서 실패! 답은 ${answer.join(',')} 입니다.`);
      setValue('');
      setAnswer(getNumbers());
      setTries([]);
      inputRef.current.focus();
      alert('게임을 다시 시작합니다.');
      return;
    }
    let strike = 0;
    let ball = 0;
    const answerArray = value.split('').map((v) => parseInt(v));
    for (let i = 0; i < 4; i++) {
      if (answerArray[i] === answer[i]) {
        strike++;
      } else if (answer.includes(answerArray[i])) {
        ball++;
      }
    }
    setTries((prevTries) => [
      ...prevTries,
      {
        try: value,
        result: `${strike} 스트라이크, ${ball} 볼입니다.`,
      },
    ]);
    setValue('');
    inputRef.current.focus();
  }

  function onChangeInput(e) {
    setValue(e.target.value);
  }

  function getNumbers() {
    //숫자야구 게임 문제 출제
    const candinates = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const array = [];
    for (let i = 0; i < 4; i++) {
      const chosen = candinates.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
      array.push(chosen);
    }
    return array;
  }
  return (
    <>
      <div>{result}</div>
      <form onSubmit={onSubmitForm}>
        <input ref={inputRef} type="number" maxLength={4} value={value} onChange={onChangeInput} />
        <button>입력!</button>
      </form>
      <div>시도: {tries.length}</div>
      <ul>
        {/* key는 성능최적화하는데 사용이 되므로 index로 쓰지말고 유니크한 값을 사용할 수 있도록 한다. */
          tries.map((t, i) => (
          <Try key={`${i + 1}차 시도 : ${t.try}`} tryInfo={t} />
        ))}
      </ul>
    </>
  );
};

function Try({ tryInfo }) {
  return (
    <li>
      <div>{tryInfo.try}</div>
      <div>{tryInfo.result}</div>
    </li>
  );
}

module.exports = NumberBaseball;
