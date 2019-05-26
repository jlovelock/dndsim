import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { ICharacter } from '../server/models/character.entity';
interface IAppState {
  characters: ICharacter[]
}

export default class App extends Component<{}, IAppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      characters: []
    };
  }

  componentDidMount() {
    console.log("mount")
    fetch("http://localhost:3333/api/character")
      .then(res => res.json())
      .then(characters => this.setState({characters}))
      .catch(e => console.log(e));
  }

  render () {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            {JSON.stringify(this.state.characters)}
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

// const App: React.FC = () => {

//
// export default App;
