import Layout from "./layouts/Layout";
import { useAppContext } from "./contexts/AppContexts";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  // Navigate,
} from "react-router-dom";
import AddHotel from "./pages/AddHotel";


//pages
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";

function App() {
   const { isLoggedIn } = useAppContext();
  return (
    <>
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <p>Home page</p>
            </Layout>
          }
        />
        <Route
          path="/search"
          element={
            <Layout>
              <p>Search page</p>
            </Layout>
          }
        />

         <Route
          path="/register"
          element={
            <Layout>
              <Register/>
            </Layout>
          }
        />

         <Route
          path="/sign-in"
          element={
            <Layout>
              <SignIn />
            </Layout>
          }
        />

         {isLoggedIn && (
          <>
           

            <Route
              path="/add-hotel"
              element={
                <Layout>
                  <AddHotel/>
                </Layout>
              }
            />
          
          </>
        )}
      </Routes>
    </Router>
    </>

      )
}

export default App;
