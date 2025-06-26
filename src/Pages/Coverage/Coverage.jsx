import React from "react";
import { FaSearch } from "react-icons/fa";
import LocationMap from "./LocationMap ";
import { useLoaderData } from "react-router";

const Coverage = () => {
    const serviceCenters = useLoaderData();
    
  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
        We are available in <span className="text-primary">64 districts</span>
      </h2>

      {/* Divider */}
      <div className="divider"></div>

      {/* Subheading */}
      <h3 className="text-xl font-semibold mb-4">
        We deliver almost all over{" "}
        <span className="text-primary">Bangladesh</span>
      </h3>

      {/* Maps */}
      <div className="grid grid-cols-1 gap-4">
        <LocationMap serviceCenters = {serviceCenters}></LocationMap>
      </div>
    </div>
  );
};

export default Coverage;
