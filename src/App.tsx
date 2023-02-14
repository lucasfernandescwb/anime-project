import { 
  createBrowserRouter, 
  createRoutesFromChildren, 
  Route, 
  RouterProvider
} from "react-router-dom"


import RootLayout from "./layouts/RootLayout"
import Home from "./pages/Home"
import Details from "./pages/Details"
import Character from "./pages/Character"

const router = createBrowserRouter(
  createRoutesFromChildren(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path='anime/:id' element={<Details />} />
      <Route path='character/:id' element={<Character />} />
    </Route>
  )
)

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
