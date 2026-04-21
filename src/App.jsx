import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Courses from './pages/Courses.jsx'
import CourseDetails from './pages/CourseDetails.jsx'
import CourseLearn from './pages/CourseLearn.jsx'
import Quiz from './pages/Quiz.jsx'
import Login from './pages/Login.jsx'
import SignUp from './pages/SignUp.jsx'
import HomeAfterSignIn from './pages/HomeAfterSignIn.jsx'

export default function App() {
  const path =
    typeof window !== 'undefined' ? window.location.pathname.toLowerCase() : '/'

  if (path === '/about' || path === '/about/') return <About />
  if (path === '/courses' || path === '/courses/') return <Courses />
  if (path.startsWith('/course/') && path.includes('/learn')) return <CourseLearn />
  if (path.startsWith('/course/') && path.includes('/quiz/')) return <Quiz />
  if (path.startsWith('/course/') && path.includes('/final-quiz')) return <Quiz />
  if (path.startsWith('/course')) return <CourseDetails />
  if (path === '/contact' || path === '/contact/') return <Contact />
  if (path === '/login' || path === '/login/') return <Login />
  if (path === '/signup' || path === '/signup/' || path === '/register' || path === '/register/')
    return <SignUp />
  if (path === '/app' || path === '/app/') return <HomeAfterSignIn />
  return <Home />
}
