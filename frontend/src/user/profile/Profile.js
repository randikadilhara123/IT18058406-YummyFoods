/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useCallback, useEffect, useState } from "react";
import "./Profile.css";
import { approvedOrder, deleteOrder, deleteProfileById, getAllOrders, getCurrentUser } from "../../util/APIUtils";
import { toast } from "react-toastify";
import { ACCESS_TOKEN } from "../../constants";
import EditUserModal from "../../components/EditUserModal";
import html2pdf from "html2pdf.js";

const Profile = ({ currentUser }) => {
  const [user, setUser] = useState(currentUser);
  const [orders, setOrders] = useState([]);
  const [open, setOpen] = useState(false);

  const refetchUser = async () => {
    try {
      const response = await getCurrentUser();
      if (!response) return;

      setUser(response);
    } catch (error) {
      toast("Oops something went wrong!", { type: "error" });
    }
  };

  const handleDeleteOrder = async (id) => {
    try {
      const response = await deleteOrder(id);
      if (response) {
        toast("order deleted successfully", { type: "success" });
        fetchAllOrders();
      }
    } catch (error) {
      toast("Oops, Something went wrong", { type: "error" });
    }
  };

  const handleApprovedOrder = async (id) => {
    try {
      const response = await approvedOrder(id);
      if (response) {
        toast("order Approved successfully", { type: "success" });
        fetchAllOrders();
      }
    } catch (error) {
      toast("Oops, Something went wrong", { type: "error" });
    }
  };

  const fetchAllOrders = useCallback(async () => {
    try {
      const response = await getAllOrders();
      if (!response.length) return;
      if (!isUserAdmin) {
        setOrders(
          response.reverse().filter(order => order.userId === user.id)
        );
      }
      setOrders(response);
    } catch (error) {
      toast("Oops something went wrong!", { type: "error" });
    }
  }, [user.id]);

  useEffect(() => {
    fetchAllOrders();
  }, [fetchAllOrders]);

  const isUserAdmin = currentUser.role === "ADMIN";

  const editProfile = async () => {
    setOpen(true);
  };

  const deleteProfile = async () => {
    try {
      const response = await deleteProfileById(user.id);
      if (response != null) {
        toast("profile remove successfully", { type: "success" });
        localStorage.removeItem(ACCESS_TOKEN);
        window.location.href = "/login";
      }
    } catch (error) {
      toast("Oops something went wrong!", { type: "error" });
    }
  };

  const generatePDF = () => {
    const element = document.getElementById("pdf-content");

    html2pdf().set({ html2canvas: { scale: 2 } }).from(element).save("orders.pdf");
  };

  const validateImageUrl = (imageUrl) =>{
    if(imageUrl != null){
      return imageUrl;
    }
    return  "https://imgtr.ee/images/2023/05/18/2onJR.th.png";
  }


  return (
    <>
      <header aria-label="Page Header" className="bg-blue-100">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mt-8">
            <a href="#" className="block shrink-0">
              <span className="sr-only">Profile</span>
              <img
                alt={user.name}
                src={validateImageUrl(user.imageUrl)}
                className="h-100 w-100 mb-2 rounded-full object-cover"
              />
            </a>
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Welcome Back, {user.name}
            </h1>

            <p className="mt-1.5 text-sm text-gray-500">{user.email}</p>
          </div>

          <div className="flex items-center justify-end gap-4">
            <div className="relative">
              <div
                className="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 bg-indigo-500 ml-auto"
              >
                <button onClick={generatePDF}>Generate and Download PDF</button>
              </div>
            </div>
            <div className="flex items-center gap-4">

              <div className="relative">
                <div
                  onClick={editProfile}
                  className="btn border border-orange-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 bg-orange-500 ml-auto"
                >
                  Edit Profile
                </div>
              </div>

              <div
                onClick={deleteProfile}
                className="btn border border-red-400 p-1 px-4 font-semibold cursor-pointer text-gray-200 bg-red-400 ml-auto"
              >
                Delete Profile
              </div>
              <span
                areahidden="true"
                className="block h-6 w-px rounded-full bg-gray-200"
              />
            </div>
          </div>
        </div>
        <div className="count ml-auto">
          <div className="buttons flex" />
        </div>
      </header>

      <div className="home-container">
        <h2>System Order Summary</h2>
        <div className="relative overflow-x-auto" id="pdf-content">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-200 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Order Code
              </th>
              <th scope="col" className="px-6 py-3">
                Quantity
              </th>
              <th scope="col" className="px-6 py-3">
                Product Price
              </th>
              <th scope="col" className="px-6 py-3">
                Total
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              {isUserAdmin && (
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              )}
            </tr>
            </thead>
            <tbody>
            {orders.map(order => (
              <tr
                key={order.id}
                className="bg-white border-b dark:bg-gray-100 dark:border-gray-200"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray"
                >
                  {order.id}
                </th>
                <td className="px-6 py-4">{order.quantity}</td>
                <td className="px-6 py-4">
                  {order.price}
                </td>
                <td className="px-6 py-4">{order.total}</td>
                <td className="px-6 py-4">{order.orderStatus}</td>
                {isUserAdmin && (
                  <td>
                    <div className="flex items-center space-x-4">

                      <div
                        type="button"
                        onClick={() => handleDeleteOrder(order.id)}
                        className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-200 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-red-400"
                      >
                        <svg fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"
                             xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                      </div>
                      {order.orderStatus !== "APPROVED" && (
                        <div
                          type="button"
                          onClick={() => handleApprovedOrder(order.id)}
                          className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-200 hover:bg-green-700 dark:text-gray-400 dark:hover:text-white dark:hover:bg-green-400"
                        >
                          <svg fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="1.5"
                               viewBox="0 0 24 24"
                               xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>

      <EditUserModal
        open={open}
        setOpen={setOpen}
        currentUser={user}
        refetchUser={refetchUser}
      />
    </>
  );
};

export default Profile;
