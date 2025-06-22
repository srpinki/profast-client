import React from "react";
import location from "../../assets/location-merchant.png"
import locationBg from "../../assets/be-a-merchant-bg.png"

const BeMarchant = () => {
  return (
    <div data-aos="zoom-in-up" className="bg-[#03373D] rounded-xl text-white p-6 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden relative">
      {/* Left Text Section */}
      <div className="md:w-1/2 z-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Merchant and Customer Satisfaction <br className="hidden md:block" />
          is Our First Priority
        </h2>
        <p className="text-sm md:text-base text-gray-300 mb-6">
          We offer the lowest delivery charge with the highest value along with
          100% safety of your product. Profast courier delivers your parcels in
          every corner of Bangladesh right on time.
        </p>
        <div className="flex gap-4 flex-wrap">
          <button className="btn bg-lime-400 hover:bg-lime-500 text-black font-semibold rounded-full px-6">
            Become a Merchant
          </button>
          <button className="btn border border-lime-400 text-lime-400 hover:bg-lime-500 hover:text-black font-semibold rounded-full px-6">
            Earn with Profast Courier
          </button>
        </div>
      </div>

      {/* Right Illustration */}
      <div className="md:w-1/2 z-10 flex justify-end">
        <img
          src={location}
          alt="Parcel Illustration"
          className="max-w-xs md:max-w-sm"
        />
      </div>

      {/* Optional Wave Background */}
      <img
        src={locationBg}
        alt="wave"
        className="absolute top-0 right-0 bg-no-repeat opacity-50 z-0"
      />
    </div>
  );
};

export default BeMarchant;
