import React from 'react';

const ServiceCard = ({service}) => {
    const {icon, title, description} = service;
    return (
        <div
            className={`rounded-xl p-6 text-center shadow-md transition-all duration-300 ${
              service.highlight
                ? "bg-lime-300 text-black"
                : "bg-white text-gray-800"
            }`}
          >
            <div className="flex justify-center mb-4">{icon}</div>
            <h3 className="font-semibold text-lg mb-2">{title}</h3>
            <p className="text-sm leading-relaxed">{description}</p>
          </div>
    );
};

export default ServiceCard;