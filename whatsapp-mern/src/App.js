import React, {useEffect} from 'react'
import './App.css';
import Sidebar from './Sidebar'
import Chat from './Chat'
import Pusher from 'pusher-js'

function App() {

  useEffect(() => {
    const pusher = new Pusher('b1cf0a7abbc2c975b4d2', {
      cluster: 'us2',
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', function(data) {
      alert(JSON.stringify(data));
    });
  }, [])

  return (
    <div className="app">
      <div className='app__body'>
          
      <Sidebar/>

      <Chat/>

      </div>


    </div>
  );
}

export default App;
