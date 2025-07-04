import React, { useState } from "react";
import UseAuth from "../../../Hooks/UseAuth";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import Swal from "sweetalert2";

const Myparcels = () => {
  const [selectedParcel, setSelectedParcel] = useState(null);
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();
  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["my-parcels", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email${user.email}`);
      return res.data;
    },
  });

  const handleView = (parcel) => {
    setSelectedParcel(parcel);
    document.getElementById("parcelModal").showModal();
  };

  const handlePay = async (parcel) => {
    await onPay(parcel);
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to recover this parcel!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      axiosSecure.delete(`/parcels/${id}`).then((res) => {
        if (res.data.deletedCount) {
          Swal.fire("Deleted!", "The parcel has been removed.", "success");
        }
        refetch();
      });
    }
    
  };

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra w-full text-sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Type</th>
            <th>Created At</th>
            <th>Cost</th>
            <th>Payment</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {parcels.map((parcel, index) => (
            <tr key={parcel._id}>
              <td>{index + 1}</td>
              <td className="max-w-[180px] truncate">{parcel.parcelName}</td>
              <td>
                {parcel.parcelType === "Document" ? "Document" : "Non-document"}
              </td>
              <td>{new Date(parcel.creation_date).toLocaleString()}</td>
              <td>${parcel.deliveryCost}</td>
              <td>
                <span
                  className={`badge ${
                    parcel.paymentStatus === "paid"
                      ? "badge-success"
                      : "badge-error"
                  }`}
                >
                  {parcel.paymentStatus}
                </span>
              </td>
              <td className="flex gap-2">
                <button
                  className="btn btn-xs btn-info"
                  onClick={() => handleView(parcel)}
                >
                  View
                </button>
                {parcel.paymentStatus !== "paid" && (
                  <button
                    className="btn btn-xs btn-warning"
                    onClick={() => handlePay(parcel)}
                  >
                    Pay
                  </button>
                )}
                <button
                  className="btn btn-xs btn-error"
                  onClick={() => handleDelete(parcel._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* View Modal */}
      <dialog id="parcelModal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Parcel Details</h3>
          {selectedParcel && (
            <div className="py-2">
              <p>
                <strong>Tracking ID:</strong> {selectedParcel.trackingId}
              </p>
              <p>
                <strong>Sender:</strong> {selectedParcel.senderName}
              </p>
              <p>
                <strong>Receiver:</strong> {selectedParcel.receiverName}
              </p>
              <p>
                <strong>Delivery Region:</strong>{" "}
                {selectedParcel.deliveryRegion}
              </p>
              <p>
                <strong>Cost:</strong> ${selectedParcel.deliveryCost}
              </p>
              <p>
                <strong>Status:</strong> {selectedParcel.status}
              </p>
              <p>
                <strong>Created:</strong>{" "}
                {new Date(selectedParcel.creation_date).toLocaleString()}
              </p>
            </div>
          )}
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Myparcels;
