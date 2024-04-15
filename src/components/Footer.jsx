import React from "react";

function Footer() {
  let date = new Date();
  return (
    <div className="container-fluid bg-light text-center p-3">
      <p>© {date.getFullYear()} Copyrights by Photo Gallery</p>
    </div>
  );
}

export default Footer;
