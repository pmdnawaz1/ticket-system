import React, { useState, useEffect } from "react";
import "../styles.css"

import TicketList from "../TicketList";
// import { getTickets } from "../components/api";

const HomePage = () => {
//   const [tickets, setTickets] = useState([]);

//   useEffect(() => {
//     const fetchTickets = async () => {
//       const response = await getTickets();
//       setTickets(response.data);
//     };
//     fetchTickets();
//   }, []);

  return (
    <div className="home">
      <h1>Home Page</h1>
      {/* <TicketList tickets={tickets} /> */}
    </div>
  );
};

export default HomePage;
