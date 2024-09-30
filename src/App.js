import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css';
import Home from './Components/Home';
import UserRegister from './Components/UserRegister';
import UserLogin from './Components/UserLogin';
import Navbaar from './Components/Navbaar';
import TakeTest from './Components/TakeTest';
import About from './Components/About';
import ContactForm from './Components/ContactForm';
import ReTest from './Components/ReTest';
import VideoPlayer from './Components/VideoPlayer';
import Chat from './Components/Chat';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <Navbaar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/register' element={<UserRegister/>}/>
      <Route path='/login' element={<UserLogin/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/test' element={<TakeTest/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/contact' element={<ContactForm/>}/>
      <Route path='/Retest' element={<ReTest/>}/>
      <Route path='/videoplayer' element={<VideoPlayer/>}/>
      <Route path='/chat' element={<Chat/>}/>
      </Routes> 
     </BrowserRouter>
   </div>
  );
}

export default App;
