import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import BookingForm from "../forms/BookingForm/BookingForm";
import { useSearchContext } from "../contexts/SearchContext";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BookingDetailsSummary from "../components/BookingDetailsSummary";
import { Elements } from "@stripe/react-stripe-js";
import { useAppContext } from "../contexts/AppContext";

const Booking = () => {
  const { stripePromise } = useAppContext();
  const search = useSearchContext();
  const { hotelId } = useParams();

  const [numberOfNights, setNumberOfNights] = useState<number>(0);

  useEffect(() => {
    if (search.checkIn && search.checkOut) {
      const nights =
        Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) /
        (1000 * 60 * 60 * 24);

      setNumberOfNights(Math.ceil(nights));
    }
  }, [search.checkIn, search.checkOut]);

  useEffect(() => {
    console.log("Hotel ID:", hotelId);
    console.log("Number of Nights:", numberOfNights);
  }, [hotelId, numberOfNights]);

  const { data: paymentIntentData, error: paymentIntentError } = useQuery(
    ["createPaymentIntent", hotelId, numberOfNights],
    () => apiClient.createPaymentIntent(hotelId as string, numberOfNights.toString()),
    {
      enabled: !!hotelId && numberOfNights > 0,
      onError: (error) => {
        console.error("Error fetching payment intent:", error);
      },
      onSuccess: (data) => {
        console.log("Payment Intent Data:", data);
      },
    }
  );

  const { data: hotel, error: hotelError } = useQuery(
    ["fetchHotelByID", hotelId],
    () => apiClient.fetchHotelById(hotelId as string),
    {
      enabled: !!hotelId,
      onError: (error) => {
        console.error("Error fetching hotel data:", error);
      },
      onSuccess: (data) => {
        console.log("Hotel Data:", data);
      },
    }
  );

  const { data: currentUser, error: currentUserError } = useQuery(
    "fetchCurrentUser",
    apiClient.fetchCurrentUser,
    {
      onError: (error) => {
        console.error("Error fetching current user:", error);
      },
      onSuccess: (data) => {
        console.log("Current User Data:", data);
      },
    }
  );

  useEffect(() => {
    console.log("Hotel:", hotel);
    console.log("Payment Intent Data:", paymentIntentData);
    console.log("Current User:", currentUser);
    if (paymentIntentError) {
      console.error("Payment Intent Error:", paymentIntentError);
    }
    if (hotelError) {
      console.error("Hotel Error:", hotelError);
    }
    if (currentUserError) {
      console.error("Current User Error:", currentUserError);
    }
  }, [hotel, paymentIntentData, currentUser, paymentIntentError, hotelError, currentUserError]);

  if (!hotel) {
    return <></>;
  }

  return (
    <div className="grid md:grid-cols-[1fr_2fr]">
      <BookingDetailsSummary
        checkIn={search.checkIn}
        checkOut={search.checkOut}
        adultCount={search.adultCount}
        childCount={search.childCount}
        numberOfNights={numberOfNights}
        hotel={hotel}
      />
      {currentUser && paymentIntentData && (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret: paymentIntentData.clientSecret,
          }}
        >
          <BookingForm
            currentUser={currentUser}
            paymentIntent={paymentIntentData}
          />
        </Elements>
      )}
    </div>
  );
};

export default Booking;
