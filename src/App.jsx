
// import PodcastContainer from './PodcastContainer.jsx'
import LoginPage from './Login.jsx'
import Test from './Success.jsx'
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';



const App = () => {
  


  return (
    <Router>
      <Routes>

        <Route path="/" element={<LoginPage />} />
        <Route
          path="/podcasts"
          element={<Test/>}
        />
      </Routes>
    </Router>
  );
};

export default App;
