import './App.css';
import {Table, Detail} from './components'
import {Route, Switch} from "react-router-dom"
import './style.css'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' key="home">
          <Table/>
        </Route>
        <Route exact path='/detail/:id' key="detail">
          <Detail/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
