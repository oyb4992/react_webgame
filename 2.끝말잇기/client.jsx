//해당 파일은 js로 작성이 되어도 되나, jsx 문법을 사용하는 경우엔 jsx 확장자로 해야
//파일명만으로 해당 파일이 어떤 내용을 담고 있는지 파악할 수 있다.
//require:, import:
const React = require('react');
const ReactDOM = require('react-dom/client');

const WordRelay =  require('./WordRelay');

ReactDOM.createRoot(document.querySelector('#root')).render(<WordRelay />);