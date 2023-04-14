import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Comment from "./components/Comment";
import LoginForm from "./components/LoginForm";
import TicketForm from "./components/TicketForm";
import TicketList from "./components/TicketList";
import UserList from "./components/UserList";
import HomePage from "./components/Home";

import "./App.css";

const App = () => (
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<HomePage />}/>
      <Route path="/comment" element={<Comment />}/>
        <Route path="loginform" element={<LoginForm />} />
        <Route path="ticketform" element={<TicketForm />} />
        <Route path="ticketlist" element={<TicketList />} />
        <Route path="userlist" element={<UserList />} />
      
    </Routes>
  </BrowserRouter>
);

export default App;
