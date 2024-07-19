import Layout from "./layouts/Layout";
import { useAppContext } from "./contexts/AppContexts";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  // Navigate,
} from "react-router-dom";


//pages
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import AddHotel from "./pages/AddHotel";
import MyHotels from "./pages/MyHotels";
import EditHotel from "./pages/EditHotel";
import Search from "./pages/Search";
import Detail from "./pages/Detail";

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
              <Search/>
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
              path="/hotel/:hotelId/booking"
              element={
                <Layout>
                  <Detail/>
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
          
           <Route
              path="/my-hotels"
              element={
                <Layout>
                  <MyHotels/>
                </Layout>
              }
            />

             <Route
              path="/edit-hotel/:hotelId"
              element={
                <Layout>
                  <EditHotel/>
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
