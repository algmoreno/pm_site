import React from 'react';
import "@/styles/page-loader.css";

const PageLoader = () => {
  return (
    <div className="flex flex-wrap m-auto">
      <div className="m-auto rounded-md flex">
        <div className="m-auto">
          <div className="load-row">
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageLoader