import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useLoaderData } from "react-router-dom";
import PaymentForm from "./PaymentForm";

const Payment = () => {
  const productInfo = useLoaderData();
  const stripePromise = loadStripe(`${process.env.REACT_APP_pb_key}`);

  return (
    <Elements stripe={stripePromise}>
        <PaymentForm productInfo={productInfo}></PaymentForm>
    </Elements>
  );
};

export default Payment;
