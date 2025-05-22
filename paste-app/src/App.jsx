
import { createBrowserRouter } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar';
import Home from './components/Home';
import Paste from './components/Paste';
import ViewPaste from './components/ViewPaste';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const router = createBrowserRouter(
  [{
    path:"/",
    element:
    <div>
      <Navbar></Navbar>
      <Home></Home>
    </div>
  },
  {
    path:"/pastes",
    element:
    <div>
      <Navbar></Navbar>
      <Paste></Paste>
    </div>
  },
  {
    path:"/paste/:id",
    element:
    <div>
      <Navbar></Navbar>
      <ViewPaste></ViewPaste>
    </div>
  },]
)
function App() {

  return (
    <>
      <RouterProvider router={router} />
        <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

    </>

  )
}

export default App
