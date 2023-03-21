import './LayoutContainer.css'
import Logo from '../../assets/images/logo.svg';
import { Outlet, Link } from 'react-router-dom';

const LayoutContainer = () => (
  <>
    <header className="header">
      <div className="top-header">
        <img src={Logo} alt="Rick and Morty Logo" className="header__logo" />
      </div>
      <nav className="nav-header">
        <Link className="nav-header__link" to='/'>Personagens </Link>
        <Link className="nav-header__link" to='/episodio'>Episódios </Link>
        <Link className="nav-header__link" to='/localizacao'>Localizacao </Link>
      </nav>
    </header>
    <main>
      <Outlet />
    </main>
    <footer className="footer">
      <span>Rick And Morty</span>
    </footer>
  </>

)

export default LayoutContainer