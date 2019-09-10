import React, { Component } from 'react';
import { render } from 'react-dom';
import { resolvePromise,resolveAllPromise } from './functions/resolvePromise'
import Hello from './Hello';
import './style.css';

interface AppProps { }
interface AppState {
  name: string;
  message: string;
}

class App extends Component<AppProps, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      name: 'React',
      message: ''

    };
  }

  loadData = () => {
    const p = fetch("https://restcountries-v1.p.rapidapi.com/all", {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "restcountries-v1.p.rapidapi.com",
        "x-rapidapi-key": "a4e2912a19msh49feb6ab91d0813p1718bfjsn0362b68bdaa6"
      }
    });

    resolveAllPromise([p], (result:any[]) => {
      console.log(result[0]);
      this.setState({ message: 'Ok' })
    } , () =>{})

    // resolvePromise(p, (result: any) => {
    //   this.setState({ message: 'Ok' })
    // }, (reject: any) => {
    //   this.setState({ message: 'Fail in your task' })
    // });
  }
  componentDidMount() {
    this.loadData();
  }

  render() {
    return (
      <div>
        <Hello name={this.state.name} />
        <p>
          Start editing to see some magic happen :)
        </p>
        <p>{this.state.message}</p>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
