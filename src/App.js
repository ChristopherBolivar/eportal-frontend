import React, {Component, Fragment} from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import Post from './components/Posts'
import News from './components/News'
class App extends Component{
  render(){
  return (
    <Router>
      <Fragment>
       <Route exact path="/" component={Post}/>
       <Route exact path="/news/:id" component={News}/>
      </Fragment>
    </Router>
  );
}
}

export default App;
