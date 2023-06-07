import React from 'react';
import './App.css'
import CalcMain from './components/Calculator/CalcMain.js';
import Header from "./components/Header/Header";
import HelloWorld from "./components/HelloWorld/HelloWorld";
import Graph2D from "./components/Graph2D/Graph2D";
import Graph3D from "./components/Graph3D/Graph3D";

export default class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = { showComponent: 'HelloWorld' };

    this.showComponent = this.showComponent.bind(this);

  }

  showComponent(name) {
    this.setState({ showComponent: name });
  }

  render() {
    return (<div className='App'>
      <Header showComponent={name => this.showComponent(name)} />
      {this.state.showComponent === "Calculator" ? <CalcMain /> : this.state.showComponent === "Graph2D" ? <Graph2D /> : this.showComponent === "HelloWorld" ? <HelloWorld/> :
          this.state.showComponent === "Graph3D" ? <Graph3D/> : <></>}
      
    </div>);
  }

}




