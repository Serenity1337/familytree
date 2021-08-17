import { Route, Switch } from 'react-router-dom'
import Home from './Pages/Home'

function App() {
  return (
    <div>
      <Switch>
        <Route path='/' component={Home} exact='Home' label='Home'></Route>
      </Switch>
    </div>
  )
}

export default App
