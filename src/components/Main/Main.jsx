import AboutProject from '../AboutProject/AboutProject';
import NavTab from '../NavTab/NavTab';
import Promo from '../Promo/Promo';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';
import './Main.css';

function Main() {
  return (
    <main className="main">
      <Promo />
      <NavTab />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
    </main>
  );
}

export default Main;
