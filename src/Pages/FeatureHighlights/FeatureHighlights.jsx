import React from "react";
import liveTracking from "../../assets/live-tracking.png";
import bigDeliveryman from "../../assets/big-deliveryman.png";
import safeDelivery from "../../assets/safe-delivery.png";

const features = [
  {
    title: "Live Parcel Tracking",
    description:
      "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment’s journey and get instant status updates for complete peace of mind.",
    image: liveTracking,
  },
  {
    title: "100% Safe Delivery",
    description:
      "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
    image: bigDeliveryman,
  },
  {
    title: "24/7 Call Center Support",
    description:
      "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
    image: safeDelivery,
  },
];

const FeatureHighlights = () => {
  return (
    <div className="bg-base-100 py-10 px-4 md:px-20 space-y-6">
      {features.map((feature, index) => (
        <div
          key={index}
          className="flex flex-col md:flex-row items-center bg-white rounded-xl p-6 gap-6 shadow-sm"
        >
          <img
            src={feature.image}
            alt={feature.title}
            className="w-32 h-32 object-contain"
          />
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold text-neutral">{feature.title}</h3>
            <p className="text-sm text-gray-600 mt-2">{feature.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeatureHighlights;
