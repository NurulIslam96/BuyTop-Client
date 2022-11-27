import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import SkeletonLoader from "../../../components/SkeletonLoader";
import Spinner from "../../../components/Spinner";
import { AuthContext } from "../../../contexts/AuthProvider";

const PaymentForm = ({ productInfo }) => {
  const {
    productName,
    productPhoto,
    price,
    location,
    email,
    userName,
    productId,
    _id,
  } = productInfo;
  const [error, setError] = useState("");
  const [payProcess, setPayProcess] = useState(false);
  const [transId, setTransId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const { user } = useContext(AuthContext);
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_api_link}/create-payment-intent`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("buytop-token")}`,
      },
      body: JSON.stringify({ price }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
      });
  }, [price]);

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
    } else {
      setError("");
    }
    setPayProcess(true);
    const { paymentIntent, error: processError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: userName,
            email: email,
          },
        },
      });
    if (processError) {
      setError(processError.message);
    }
    if (paymentIntent.status === "succeeded") {
      const paymentInfo = {
        productName: productName,
        price: price,
        status: "Paid",
        productId: productId,
        bookingId: _id,
        transactionId: paymentIntent.id,
        buyerEmail: user?.email,
      };
      fetch(`${process.env.REACT_APP_api_link}/payinfo`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${localStorage.getItem("buytop-token")}`,
        },
        body: JSON.stringify(paymentInfo),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setTransId(paymentIntent.id);
          toast.success("Payment Completed");
        });
    }
    setPayProcess(false);
  };

  if(payProcess){
    return <SkeletonLoader></SkeletonLoader>
  }

  return (
    <div className="py-4 px-4 md:px-4 flex justify-center items-center 2xl:mx-auto 2xl:container">
      <div className="flex flex-col justify-start items-start w-full space-y-9">
        <div className="flex justify-start flex-col items-start space-y-2">
          <p className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
            Checkout
          </p>
          <p className="text-base leading-normal sm:leading-4 text-gray-600">
            Home -My Orders -Checkout
          </p>
        </div>
        <div className="flex flex-col xl:flex-row justify-center xl:justify-between space-y-6 xl:space-y-0 xl:space-x-6 w-full">
          <div className="xl:w-3/5 flex flex-col sm:flex-row xl:flex-col justify-center items-center bg-gray-100 bg-gray-800 py-7 sm:py-0 xl:py-10 px-10">
            <div className="flex flex-col justify-start items-start w-full space-y-4">
              <p className="text-xl md:text-2xl leading-normal text-gray-50">
                {productName}
              </p>
              <p className="text-base font-semibold leading-none text-white">
                ${price}
              </p>
            </div>
            <div className="mt-6 sm:mt-0 xl:my-10 xl:px-20 w-52 sm:w-96 xl:w-auto">
              <img src={productPhoto} alt="" />
            </div>
            {transId && (
              <>
              <h2 className="text-black py-4 px-2 font-semibold rounded-md bg-yellow-500">
                Your Transaction ID: {transId}
              </h2>
              <Link to={'/dashboard/myorders'} className="btn btn-outline btn-warning my-5 w-full">Go Back To My Orders</Link>
              </>
            )}
          </div>
          <form
            onSubmit={(e) => handlePayment(e)}
            className="p-8 bg-gray-800 flex flex-col lg:w-full xl:w-3/5"
          >
            <label className="mt-8 text-base leading-4 text-gray-50">
              Email
            </label>
            <div className="mt-2">
              <input
                className="border border-gray-300 p-4 rounded w-full text-base text-white"
                disabled
                value={user?.email}
              />
            </div>
            <label className="mt-8 text-base leading-4 text-gray-50">
              Card details
            </label>
            <div className="mt-2 flex-col">
              <div className="border  rounded-tl rounded-tr border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600">
                <CardElement
                  options={{
                    style: {
                      base: {
                        fontSize: "16px",
                        color: "#a1f505",
                        "::placeholder": {
                          color: "#aab7c4",
                        },
                      },
                      invalid: {
                        color: "#9e2146",
                      },
                    },
                  }}
                />
              </div>
            </div>
            <label className="mt-8 text-base leading-4 text-gray-50">
              Name on card
            </label>
            <div className="mt-2 flex-col">
              <div>
                <input
                  className="border border-gray-300 p-4 rounded w-full text-base text-white"
                  value={user?.displayName}
                  disabled
                />
              </div>
            </div>
            <label className="mt-8 text-base leading-4 text-gray-50">
              Location
            </label>
            <div className="mt-2 flex-col">
              <input
                className="border border-gray-300 p-4 rounded w-full text-base text-white"
                value={location}
                disabled
              />
            </div>
            {<p className="text-red-500 mt-2">{error}</p>}
            {!transId ? (
              <button
                type="submit"
                disabled={!stripe || !clientSecret || payProcess}
                className="mt-8 border border-gray-300 bg-gray-900 text-white hover:bg-white hover:border-black hover:text-black flex justify-center items-center py-4 rounded w-full"
              >
                <div>
                  <p className="text-base leading-4">Pay ${price}</p>
                </div>
              </button>
            ) : (
              <>
                <button
                  disabled
                  className="mt-8 border border-gray-300 text-white bg-gray-500 flex justify-center items-center py-4 rounded w-full"
                >
                  <div>
                    <p className="text-base leading-4">Paid</p>
                  </div>
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
