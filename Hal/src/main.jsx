import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Chat from './pages/chat.jsx'
import Chat1 from './pages/chat1.jsx'
import Chat2 from './pages/chat2.jsx'
import Chat3 from './pages/chat3.jsx'
import Chat4 from './pages/chat4.jsx'
import Chat5 from './pages/chat5.jsx'
import Chat6 from './pages/chat6.jsx'
import Chat7 from './pages/chat7.jsx'
import Chat8 from './pages/chat8.jsx'
import Chat9 from './pages/chat9.jsx'
import Chat10 from './pages/chat10.jsx'


import Login from './pages/Login.jsx'
import Activity from './pages/User/activitypage.jsx';
import Record from './pages/User/Record.jsx'
import Register from './pages/Register.jsx'
import User from './pages/userhome.jsx'

import { Provider } from 'react-redux';
import { store } from './store/index.js'; 


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/user',
    element: <User />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/user/chat',
    element: <Chat />,
  },
  {
    path: '/user/chat1',
    element: <Chat1 />,
  },
  {
    path: '/user/chat2',
    element: <Chat2 />,
  },
  {
    path: '/user/chat7',
    element: <Chat7 />,
  },
  {
    path: '/user/chat3',
    element: <Chat3 />,
  },  {
    path: '/user/chat4',
    element: <Chat4 />,
  },  {
    path: '/user/chat5',
    element: <Chat5 />,
  },  {
    path: '/user/chat6',
    element: <Chat6 />,
  },  {
    path: '/user/chat8',
    element: <Chat8 />,
  },  {
    path: '/user/chat9',
    element: <Chat9 />,
  },  {
    path: '/user/chat10',
    element: <Chat10 />,
  },
  {
    path: '/user/activity',
    element: <Activity />,
  },
  {
    path: '/user/record',
    element: <Record />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <Provider store={store}>
        <RouterProvider router={router} />
      </Provider >
  // </React.StrictMode>,
)
