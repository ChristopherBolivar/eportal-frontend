import React, {Component, Fragment} from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import Post from './components/Posts'
class App extends Component{
  render(){
  return (
    <Router>
      <Fragment>
       <Route exact path="/" component={Post}/>
      </Fragment>
    </Router>
  );
}
}

export default App;
