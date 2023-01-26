import { Route, Routes } from 'react-router';
import './App.css';
import Landing from './pages/Landing';
import InstaFriends from './pages/InstaFriends';
import MyPage from './pages/MyPage';


function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Landing  Greeting='Scooby' />} />
        <Route path='/mariospalazis' element={<MyPage  />} />
        <Route path='/InstaFriends' element={<InstaFriends title='Follower/Unfollower'/>} />
      </Routes>
    </div>
  )
}

export default App
