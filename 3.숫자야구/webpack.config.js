//webpack 공식: https://webpack.kr/concepts/#plugins
const path = require('path');
const webpack = require('webpack');
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
//package.json에 react-refresh, @pmmmwh/react-refresh-webpack-plugin 없어도 바로 반영은 되나 이것은 리로딩(새로고침)
//두개를 추가하여 설정을 잡으면 핫리로딩이 된다. 이 경우엔 리로딩과 달리 컴포넌트에 데이터가 초기화 되지 않는다.

module.exports = {
  name: 'wordRelay-setting', //webpack 설정의 대한 이름. 필수는 아님
  mode: 'development',
  devtool: 'eval', //dev: eval, production: hidden-source-map
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  //웹팩은 아래와 같은 순서대로 설정하는게 좋음.
  entry: {
    app: ['./client'],
  }, //입력
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        options: {
          presets: [
            //presets은 plugin의 모음.
            [
              '@babel/preset-env',
              {
                //preset에 대한 옵션을 주는 경우 아래와 같이 지정할 수 있음.
                targets: {
                  browsers: ['> 1% in KR'], //브라우저 버전에 따른 설정 추가. 여러가지 옵션들이 존재함.(참고: https://github.com/browserslist/browserslist#queries)
                },
                debug: true,
              },
            ],
            '@babel/preset-react',
          ],
          plugins: ['react-refresh/babel'],
        },
      },
    ],
  },
  plugins: [
    new RefreshWebpackPlugin()
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js',
  }, //출력
  devServer: {
    devMiddleware: { publicPath: '/dist' },
    static: { directory: path.resolve(__dirname) }, //index.html 파일같은 정적 파일의 경로를 작성하는 부분
    hot: true,
  },
};
