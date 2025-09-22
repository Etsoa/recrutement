
import React, { useState, useEffect } from "react";
import { getUsers } from "../api/userApi";
import Header from "../components/Header";


function Home() {
  return (
    <div>
      <Header />
      <main className="App-main">
        <h1>Hello World</h1>
      </main>
    </div>
  );
}

export default Home;
