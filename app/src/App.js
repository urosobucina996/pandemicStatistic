import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import './App.css';
import PandemicReport from './pages/Pandemic/PandemicReport';
import Contact from "./pages/Contact/Concat";
import About from "./pages/About/About";
import PageLayout from "./components/Layout/Layout";

const links = [
  {
    key   : "report",
    title : "Report",
    to    : "/report"
  },
  {
    key   : "contact",
    title : "Contact",
    to    : "/contact"
  },
  {
    key   : "about",
    title : "About",
    to    : "/about"
  },
];

function App() {
  return (
    <div className="App">
      <Router>
        <PageLayout links={links}>
          <Switch>
            <Route path="/report">
              <PandemicReport />
            </Route>
            <Route exact path="/contact">
              <Contact />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Redirect to='/report' />
          </Switch>
        </PageLayout>
      </Router>
    </div>
  );
}

export default App;
