const React = require('react');
const { useState, useRef } = React; //exports 되는게 객체나 배열이면 구조 분해 가능.

const WordRelay = () => {
  const [word, setWord] = useState('제로초');
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const inputRef = useRef(null);

  const onSubmitForm = (e) => {
    e.preventDefault();
    inputRef.current.focus();
    console.dir(e.target);
    // if (word[word.length - 1] !== e.target.children.inputWord.value[0]) { //언컨트롤드 인풋
    if (word[word.length - 1] !== value[0]) { //언컨트롤드 인풋
      setResult('땡!');
      setValue(''); //컨트롤드 인풋
      // e.target.children.inputWord.value = ''; //언컨트롤드 인풋
      return;
    }
    setResult('딩동댕');
    setWord(value); //컨트롤드 인풋
    setValue(''); //컨트롤드 인풋
    // setWord(e.target.children.inputWord.value); //언컨트롤드 인풋
    // e.target.children.inputWord.value = ''; //언컨트롤드 인풋
  };

  const onChangeInput = (e) => {
    setValue(e.target.value);
  };
  //컨트롤드 인풋: 일반적으로 알고 있는 input 방식
  return (
    <>
      <div>{word}</div>
      <form onSubmit={onSubmitForm}>
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={onChangeInput}
        /> 
        <button>입력!</button>
      </form>
      <div>{result}</div>
    </>
  );
  //언컨트롤드 인풋: input의 상태값을 생략할 수 있음.(일반적으로 사용x, 아주 간단한 form인 경우에 사용 가능.)
  // return (
  //   <>
  //     <div>{word}</div>
  //     <form onSubmit={onSubmitForm}>
  //       <input
  //         id="inputWord"
  //         ref={inputRef}
  //         defaultValue={"초밥"}
  //         type="text"
  //       /> 
  //       <button>입력!</button>
  //     </form>
  //     <div>{result}</div>
  //   </>
  // );
};

//node 모듈 문법(commonJS): require와 짝을 이뤄서 사용
module.exports = WordRelay;
//module.exports = { WordRelay, hello:'a'};
//exports.hello = 'hello'; //module.exports = {hello: 'a'};와 동일.
//const WordRelay = require('./WordRelay');

//ES2015 문법: import와 짝을 이뤄서 사용. 위에것과 호환이 됨.
//export default WordRelay;
//export의 경우 default는 한번만 사용가능하며,
//ex) export const hello = 'hello'; import {hello} from '' //다음과 같은 형태로 사용 가능.

//Babel에 의해서 React에서 사용된 import는 require로 변환됨.
//그러므로, require만 사용하는것이 나을 수 있음.(성능상의 문제는 없는것으로 보임.)

