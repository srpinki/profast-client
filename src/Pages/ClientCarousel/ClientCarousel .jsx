import React from "react";
import Marquee from "react-fast-marquee";

//import logos

import client1 from "../../assets/brands/client1.png";
import client2 from "../../assets/brands/client2.png";
import client3 from "../../assets/brands/client3.png";
import client4 from "../../assets/brands/client4.png";
import client5 from "../../assets/brands/client5.png";
import client6 from "../../assets/brands/client6.png";
import client7 from "../../assets/brands/client7.png";

const logos = [client1, client2, client3, client4, client5, client6, client7];

const ClientCarousel = () => {
  return (
    <div className="bg-white py-6">
        <h3 className="text-primary text-2xl font-bold text-center mb-8">We've helped thousands of sales teams</h3>
      <Marquee speed={50} pauseOnHover={true} gradient={false}>
        {logos.map((logo, index) => (
          <div className="mx-8 flex items-center" key={index}>
            <img
              
              src={logo}
              alt={`client-logo-${index}`}
              className="h-6 object-contain"
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default ClientCarousel;
