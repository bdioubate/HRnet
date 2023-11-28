import { NavLink } from 'react-router-dom'

//Assets
import Logo from '../../assets/logo.jpg'

const CreateEmployee = () => {
    return (
      <header>
          <div id="logo">
            <NavLink to='/'><img src={Logo} alt="logo de l'entreprise" /></NavLink>
          </div>
          <nav>
            <NavLink to='/employee-list'>View Current Employees</NavLink>
          </nav>
      </header>
    )
  }
  
  export default CreateEmployee 