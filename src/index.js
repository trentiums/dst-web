import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import '../node_modules/bootstrap/dist/css/bootstrap.css'

window.$ = window.jQuery = require('jquery')

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
)
