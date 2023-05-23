import { Fragment, useReducer, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import { createOrder } from "../util/APIUtils";

export default function CreateOrderModal({
                                           open,
                                           setOpen,
                                           post,
                                           currentUser,
                                           reFetchPost
                                         }) {
  const cancelButtonRef = useRef(null);
  const [state, setState] = useReducer(
    (prevState, newState) => {
      return { ...prevState, ...newState };
    },
    {
      userName: currentUser.name,
      total: 0.00,
      quantity: 0,
      price: post.price
    }
  );

  const handlePrice = event => {
    setState({ price: event.target.value });
  };
  const handleQuantity = event => {
    state.total = event.target.value * post.price
    setState({ quantity: event.target.value });
  };
  const handleTotal = event => {
    setState({ total: event.target.value });
  };

  const orderObject = {
    postId: post.id,
    userId: currentUser.id,
    total: state.price * state.quantity,
    price: state.price,
    quantity: state.quantity
  };

  const handleCreateOrder = async () => {
    try {
      const response = await createOrder(orderObject);

      if (response) {
        toast("Order Created successfully", { type: "success" });
        reFetchPost();
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
      toast("Oops, Something went wrong", { type: "error" });
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div
                      className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-orange-100 sm:mx-0 sm:h-10 sm:w-10">
                      <ExclamationTriangleIcon
                        className="h-6 w-6 text-orange-400"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 flex-1 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        Create Order
                      </Dialog.Title>

                      <div className="mt-2">
                        <label>price</label>
                        <input
                          type="text"
                          name="name"
                          disabled={true}
                          onChange={handlePrice}
                          value={state.price}
                          className="bg-gray-100 min-w-full rounded-lg p-3  border border-gray-300 outline-none"
                          spellCheck="false"
                        />
                      </div>
                      <div className="mt-2">
                        <label>Quantity</label>
                        <input
                          type="email"
                          name="email"
                          onChange={handleQuantity}
                          value={state.quantity}
                          className="bg-gray-100 min-w-full rounded-lg p-3 border border-gray-300 outline-none"
                          spellCheck="false"
                        />
                      </div>
                      <div className="mt-2">
                        <label>Total</label>
                        <input
                          type="email"
                          name="email"
                          onChange={handleTotal}
                          value={state.total}
                          className="bg-gray-100 min-w-full rounded-lg p-3 border border-gray-300 outline-none"
                          spellCheck="false"
                        />
                      </div>
                    </div>

                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-orange-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    onClick={handleCreateOrder}
                  >
                    Create Order
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
