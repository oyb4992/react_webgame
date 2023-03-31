const React = require('react');
const { useState, useRef } = React;

const GuGuDan = () => { //use로 시작하는것(useState, useRef 등)이 ReactHooks이다. ReactHooks를 사용하는걸 권장.
  const [first, setFirst] = useState(Math.ceil(Math.random() * 9));
  const [second, setSecond] = useState(Math.ceil(Math.random() * 9));
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const inputRef = useRef(null);
  
  const onSubmitForm = (e) => {
    e.preventDefault();
    inputRef.current.focus();
    if(parseInt(value) !== first * second) {
      setResult('땡');
      setValue('');
      return;
    }
    setResult(`정답: ${value}`);
    setFirst(Math.ceil(Math.random() * 9));
    setSecond(Math.ceil(Math.random() * 9));
    setValue('');
  }
  const onChangeInput = (e) => setValue(e.target.value);
  //입력값이 바뀔때마다 렌더링이 되기때문에 속도가 느려질 수 있음. 이 부분을 개선할 수 있는 방법이 있음
  //react에선 태그에서 class -> className, for -> htmlFor
  //React hooks set은 비동기로 동작이 되어 렌더링이 한번만 일어날 수 있게 한다. set이 여러개여도 여러번 렌더링x
  console.log('렌더링');
  return ( //JSX 작성시에 가능하면 js와 함께 작성하지 않도록 한다.
      <> {/* <> </> 으로 사용할 수 있으나 바벨이 제대로 인식을 하지 못하여 다음과 같이 사용함 */}
        <div>{first} X {second} = ? </div>
        <form onSubmit={onSubmitForm}>
          <input 
            ref ={inputRef}  
            type="number" 
            value={value} 
            onChange={onChangeInput} 
          />
          <button>입력!</button>
        </form>
        <div>{result}</div>
      </>
  );
}

module.exports = GuGuDan;