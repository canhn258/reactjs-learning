import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { FaCalendarAlt, FaDoorOpen, FaUser } from "react-icons/fa";
import UsersPage from "./components/Users/UsersPage";
import BookablesPage from "./components/Bookables/BookablesPage";
import BookingsPage from "./components/Bookings/BookingsPage";
import UserPicker from "./components/Users/UserPicker";
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <header>
          <nav>
            <ul>
              <li>
                <Link to="/bookables">
                  <FaCalendarAlt />
                  <span>Bookables</span>
                </Link>
              </li>
              <li>
                <Link to="/bookings">
                  <FaDoorOpen />
                  <span>Bookings</span>
                </Link>
              </li>
              <li>
                <Link to="/users">
                  <FaUser />
                  <span>Users</span>
                </Link>
              </li>
            </ul>
          </nav>
          <UserPicker />
        </header>

        <Routes>
          <Route path="/bookables" element={<BookablesPage />} />
          <Route path="/bookings" element={<BookingsPage />} />
          <Route path="/users" element={<UsersPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
