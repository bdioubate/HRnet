import { BrowserRouter as Router, Route, Routes as Switch } from 'react-router-dom'

//Pages
import CreateEmployee from '../pages/CreateEmployee'
import EmployeeList from '../pages/EmployeeList'

//Components
import Banner from '../components/Banner'

//Redux
import { Provider } from 'react-redux'
import { store } from '../redux'

function RoutesPath() {

  return (
    <Provider store={store}>
      <Router>
        <Banner />
          <Switch>
            <Route exact path="/" element={<CreateEmployee />}></Route>
            <Route path="/employee-list" element={<EmployeeList />}></Route>
          </Switch>
      </Router>
    </Provider>
  )
}

export default RoutesPath