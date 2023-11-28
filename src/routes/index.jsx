import { BrowserRouter as Router, Route, Routes as Switch } from 'react-router-dom'

//Pages
import CreateEmployee from '../pages/CreateEmployee'
import EmployeeList from '../pages/EmployeeList'

//Components
import Banner from '../components/Banner'

function RoutesPath() {

  return (
    <Router>
      <Banner />
        <Switch>
          <Route exact path="/" element={<CreateEmployee />}></Route>
          <Route path="/employee-list" element={<EmployeeList />}></Route>
        </Switch>
    </Router>
  )
}

export default RoutesPath