import Navbar from './components/Navbar'
import {Routes,Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router-dom'
import Home from './pages/Home'
import Products from './pages/Products'
import About from './pages/About'
import Contact from './pages/Contact'
import RootLayout from './layout/RootLayout'
import ContactLayout from './layout/ContactLayout'
import ContactInfo from './components/ContactInfo'
import ContactForm from './components/ContactForm'
import NotFound from './components/NotFound'
import JobsLayout from './layout/JobsLayout'
import Jobs, { JobsLoader } from './pages/Jobs'
import JobDetails, { JobDetailsLoader } from './components/JobDetails'
import Error from './components/Error'


const App = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RootLayout/>}>
        <Route index element={<Home/>}/>
        <Route path='Products' element={<Products/>}/>
        <Route path='About' element={<About/>}/>
        <Route path='Contact' element={<ContactLayout/>}>
            <Route path='Info' element={<ContactInfo/>} />
            <Route path='Form' element={<ContactForm/>} />
        </Route>
        <Route path='Jobs' element={<JobsLayout/>} errorElement={<Error/>}>
            <Route index element={<Jobs/>} loader={JobsLoader}/>
            <Route path=':id' element={<JobDetails/>} loader={JobDetailsLoader} />
        </Route>
        <Route path='*' element={<NotFound/>} />
      </Route>
    )
  )

return(
  <div>
    <RouterProvider router={router} />
  </div>
)
}





//   return (
//     <div>
//       <Navbar/>
//       <div className='container'>
//       <Routes>
//         <Route path='/' element={<Home/>}/>
//         <Route path='/Products' element={<Products/>}/>
//         <Route path='/About' element={<About/>}/>
//         <Route path='/Contact' element={<Contact/>}/>
//       </Routes>
//       </div>
//     </div>
//   )
// }

export default App

