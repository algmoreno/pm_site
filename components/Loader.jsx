import React from 'react';
//import styled from 'styled-components';
import "@/styles/loader.css";

const Loader = () => {
  return (
    <div className="container mx-auto">
      <div className="cloud front">
        <span className="left-front" />
        <span className="right-front" />
      </div>
      <span className="sun sunshine" />
      <span className="sun" />
      <div className="cloud back">
        <span className="left-back" />
        <span className="right-back" />
      </div>
    </div>
  );
}

export default Loader;