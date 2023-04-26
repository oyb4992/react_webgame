const React = require('react');
const { useState, useRef, memo } = React; //exports 되는게 객체나 배열이면 구조 분해 가능.

const NumberBaseball = () => {
  const [result, setResult] = useState('');
  const [value, setValue] = useState('');
  //getNumbers()를 넣게 되면 리렌덩이 될때마다 실행이 되나 해당 부분은 상태값 초기화 부분이므로 매번 실행이 되어도 상태값의 영향을 주진 않음. 
  //다만 매번 함수가 실행이 되어 성능의 문제가 있을 수 있음.
  const [answer, setAnswer] = useState(getNumbers); //lazy init: 함수명만 넣는 경우.
  const [tries, setTries] = useState([]); //react는 배열에 값을 넣을때 push를 사용하면 안됨.
  const inputRef = useRef(null);

  function onSubmitForm(e) {
    e.preventDefault();
    console.log('answer', answer);
    if (tries.length === 0) {
      setResult('');
    }
    if (value === '') {
      return;
    }
    if (new Set(value).size !== 4) {
      alert('중복되지 않게 입력해주세요.');
      setValue('');
      return;
    }
    if (answer.join('') === value) {
      setResult(`홈런!`);
      setTries((prevTries) => {
        [
          ...prevTries,
          {
            try: value,
            result: `홈런!`,
          },
        ];
      });
      return gameReset(true);
    } 
    if (tries.length >= 9) {
      setResult(`10번 넘게 틀려서 실패! 답은 ${answer.join('')} 입니다.`);
      return gameReset(false);
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
    setTries((prevTries) => {
      return [
        ...prevTries,
        {
          try: value,
          result: `${strike} 스트라이크, ${ball} 볼입니다.`,
        },
      ];
    });
    setValue('');
    inputRef.current.focus();
  }

  function gameReset(homerun) {
    let message = '';
    if (!homerun) {
      message = '게임을 다시 시작합니다.';
    } else {
      message = '홈런입니다. 게임을 다시 시작합니다.';
    }
    alert(message);
    setValue('');
    setAnswer(getNumbers());
    setTries([]);
    return;
  }

  function onChangeInput(e) {
    const maxlength = e.target.maxLength;
    if (e.target.value.length > maxlength) {
      return setValue(e.target.value.slice(0, maxlength));
    }
    return setValue(e.target.value);
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
        <input ref={inputRef} type="number" maxLength={4} value={value} onChange={onChangeInput} onInput={onChangeInput} />
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
//memo 사용시 부모 컴포넌트가 렌더링이 되어도 자식 컴포넌트까진 영향이 가지 않게 된다. 
//두번째 인자값으로 커스텀하여 사용가능.
//hooks React.memo = class PureComponent
const Try = memo(({ tryInfo }) => { 
  return (
    <li>
      <div>{tryInfo.try}</div>
      <div>{tryInfo.result}</div>
    </li>
  );
});
Try.displayName = 'Try'; //memo 사용시 개발자 도구에서 컴포넌트명이 이상하게 나오게되는 것을 방지하기 위함.

module.exports = NumberBaseball;
