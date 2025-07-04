import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import UseAuth from "../../Hooks/UseAuth";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";

export default function SendParcel() {
  const serviceCenters = useLoaderData();
  const [senderRegion, setSenderRegion] = useState("");
  const [receiverRegion, setReceiverRegion] = useState("");
  const trackingId = generateTrackingId();

  // Get unique regions safely
  const regions = [...new Set(serviceCenters.map((center) => center.region))];

  const senderDistricts = serviceCenters.filter(
    (center) => center.region === senderRegion
  );
  const receiverDistricts = serviceCenters.filter(
    (center) => center.region === receiverRegion
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();

  function generateTrackingId() {
    const prefix = "TRK";
    const timestamp = Date.now().toString(36).toUpperCase(); // e.g., "KZ5BJF8"
    const randomSegment = Math.random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase(); // e.g., "X4K7Z1"
    return `${prefix}-${timestamp}-${randomSegment}`; // e.g., "TRK-KZ5BJF8-X4K7Z1"
  }

  const onSubmit = async (data) => {
    const { parcelType, parcelWeight, yourRegion, deliveryRegion } = data;
    const weight = parseFloat(parcelWeight);
    const isWithinCity = yourRegion === deliveryRegion;

    // 🧮 Pricing Calculation
    let baseCost = 0;
    let extraCost = 0;
    let totalCost = 0;
    let breakdown = "";

    if (parcelType === "Document") {
      baseCost = isWithinCity ? 60 : 80;
      totalCost = baseCost;
      breakdown = `Document (${
        isWithinCity ? "Within City" : "Outside District"
      }): ৳${baseCost}`;
    } else if (parcelType === "Non-Document") {
      if (weight <= 3) {
        baseCost = isWithinCity ? 110 : 150;
        totalCost = baseCost;
        breakdown = `Non-Document ≤ 3kg (${
          isWithinCity ? "Within City" : "Outside District"
        }): ৳${baseCost}`;
      } else {
        const extraKg = weight - 3;
        baseCost = isWithinCity ? 110 : 150;
        extraCost = extraKg * 40;
        if (!isWithinCity) extraCost += 40; // extra 40 for outside
        totalCost = baseCost + extraCost;
        breakdown = `
        Base (${
          isWithinCity ? "Within City" : "Outside District"
        } up to 3kg): ৳${baseCost}<br>
        Extra ${extraKg.toFixed(1)}kg × ৳40 = ৳${(extraKg * 40).toFixed(0)}<br>
        ${!isWithinCity ? "Additional outside district charge: ৳40<br>" : ""}
      `;
      }
    }

    // 📦 Build Parcel Summary
    const summaryHTML = `
    <div style="text-align: left; font-size: 15px">
      <strong>Parcel Type:</strong> ${parcelType}<br>
      <strong>Weight:</strong> ${weight} kg<br>
      <strong>From:</strong> ${yourRegion}<br>
      <strong>To:</strong> ${deliveryRegion}<br><br>
      <strong>Pricing Breakdown:</strong><br>
      ${breakdown}
      <hr>
      <strong style="font-size: 18px">Total Cost: ৳${totalCost}</strong>
    </div>
  `;

    // 🧾 Show SweetAlert
    const result = await Swal.fire({
      title: "Confirm Your Parcel Details",
      html: summaryHTML,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "✅ Proceed to Payment",
      cancelButtonText: "✏️ Edit Info",
      focusConfirm: false,
      customClass: {
        confirmButton: "swal2-confirm btn btn-success mx-2",
        cancelButton: "swal2-cancel btn btn-outline-secondary",
      },
    });

    // 🛠️ If confirmed, save
    if (result.isConfirmed) {
      const parcelData = {
        ...data,
        userEmail: user?.email,
        deliveryCost: totalCost,
        deliveryStatus: "Not-collected",
        paymentStatus: "unpaid",
        status: "pending",
        trackingId,
        creation_date: new Date().toISOString(),
      };

      console.log("✅ Saving to DB:", parcelData);

      // await fetch("/api/parcels", { method: "POST", body: JSON.stringify(parcelData) });

      //send data to the server
      axiosSecure.post("/parcels", parcelData).then((res) => {
        console.log(res.data);
        if (res.data.insertedId) {
          
          //TODO: payment gateway need to add here

          Swal.fire(
            "🎉 Redirecting!",
            "Redirecting to payment gateway!",
            "success"
          );
        }
      });
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-base-100 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Add Parcel</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="form-control">
          <label className="label mb-4">Enter your parcel details</label>
          <div className="flex items-center space-x-4">
            <label className="label cursor-pointer">
              <input
                type="radio"
                value="Document"
                {...register("parcelType", { required: true })}
                className="radio checked:bg-green-500"
              />
              <span className="ml-2">Document</span>
            </label>
            <label className="label cursor-pointer">
              <input
                type="radio"
                value="Non-Document"
                {...register("parcelType", { required: true })}
                className="radio checked:bg-green-500"
              />
              <span className="ml-2">Non-Document</span>
            </label>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input
            {...register("parcelName", { required: true })}
            placeholder="Parcel Name"
            className="input input-bordered w-full"
          />
          <input
            {...register("parcelWeight", { required: true })}
            placeholder="Parcel Weight (KG)"
            className="input input-bordered w-full"
            type="number"
            step="0.1"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sender Details */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Sender Details</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <input
                {...register("senderName", { required: true })}
                placeholder="Sender Name"
                className="input input-bordered w-full"
              />

              <select
                {...register("yourRegion", { required: true })}
                className="select select-bordered w-full"
                onChange={(e) => setSenderRegion(e.target.value)}
              >
                <option value="">Select Your Region</option>
                {regions.map((region, index) => (
                  <option key={index} value={region}>
                    {region}
                  </option>
                ))}
              </select>

              <input
                {...register("senderAddress", { required: true })}
                placeholder="Address"
                className="input input-bordered w-full"
              />

              <input
                {...register("senderContactNo", { required: true })}
                placeholder="Sender Contact No"
                className="input input-bordered w-full"
              />

              <select
                {...register("senderPickupLocation", { required: true })}
                className="select select-bordered w-full col-span-2"
              >
                <option value="">Select Pickup View Location</option>
                {senderDistricts.map((center, index) => (
                  <option key={index} value={center.district}>
                    {center.district}
                  </option>
                ))}
              </select>

              <div className="col-span-2">
                <textarea
                  {...register("pickupInstruction")}
                  placeholder="Pickup Instruction"
                  className="textarea textarea-bordered w-full"
                  rows={3}
                />
              </div>
            </div>
          </div>

          {/* Receiver Details */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Receiver Details</h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <input
                {...register("receiverName", { required: true })}
                placeholder="Receiver Name"
                className="input input-bordered w-full"
              />

              <select
                {...register("deliveryRegion", { required: true })}
                className="select select-bordered w-full"
                onChange={(e) => setReceiverRegion(e.target.value)}
              >
                <option value="">Select Service Center</option>
                {regions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>

              <input
                {...register("receiverAddress", { required: true })}
                placeholder="Receiver Address"
                className="input input-bordered w-full"
              />

              <input
                {...register("receiverContactNo", { required: true })}
                placeholder="Receiver Contact No"
                className="input input-bordered w-full"
              />

              <select
                {...register("receiverDeliveryPoint", { required: true })}
                className="select select-bordered w-full col-span-2"
              >
                <option value="">Receiver Delivery Point Location</option>
                {receiverDistricts.map((center, index) => (
                  <option key={index} value={center.district}>
                    {center.district}
                  </option>
                ))}
              </select>

              <div className="col-span-2">
                <textarea
                  {...register("deliveryInstruction")}
                  placeholder="Delivery Instruction"
                  className="textarea textarea-bordered w-full"
                  rows={3}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="form-control mt-6">
          <button className="btn btn-success w-full">
            Proceed to Confirm Booking
          </button>
        </div>

        <p className="text-sm text-gray-500">
          * Pickup Time: 4pm - 10pm Applies.
        </p>
      </form>
    </div>
  );
}
