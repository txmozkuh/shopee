import { ToastContainer } from 'react-toastify'
import useRouteElements from './useRouteElements'
import 'react-toastify/ReactToastify.css'

export default function App() {
  const routes = useRouteElements()
  return (
    <div>
      {routes}
      <ToastContainer />
    </div>
  )
}
