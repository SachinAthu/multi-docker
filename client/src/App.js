import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import Fib from './Fib'
import OtherPage from './OtherPage'

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Link to="/">Home</Link>
          <Link to="/otherpage">Other Page</Link>

          <Route exact path="/" component={Fib} />
          <Route exact path="/otherpage" component={OtherPage} />
        </div>
      </Router>
    </div>
  );
}

export default App;
