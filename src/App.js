import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ContactsList from './components/contacts-list/contacts-list.jsx';
import './App.scss';

class App extends Component {
  render() {
    return <ContactsList />;
  }
}

ReactDOM.render(
  <App />, 
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
