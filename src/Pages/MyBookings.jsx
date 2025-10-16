import React, { useEffect, useState } from "react";
import { dummyBookingData } from "../assets/assets";
import Loading from "../Components/Loading";
import BlurCircle from "../Components/BlurCircle";
import { dateFormat } from "../lib/dateFormat";
import timeFormat from "../lib/timeFormat";
import { CheckCircle, Clock, CreditCard } from "lucide-react";

const MyBookings = () => {
  const currency = import.meta.env.VITE_CURRENCY || "$";

  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getMyBookings = async () => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setBookings(dummyBookingData);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setBookings([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMyBookings();
  }, []);

  const handlePayNow = (bookingId) => {
    // Handle payment logic here
    console.log("Processing payment for booking:", bookingId);
    // You can implement payment integration here
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="relative px-6 md:px-16 lg:px-40 pt-30 md:pt-40 min-h-[80vh]">
      <BlurCircle top="100px" left="100px" />
      <BlurCircle bottom="0px" left="600px" />

      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">My Bookings</h1>

        {bookings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="text-center">
              <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-300 mb-2">
                No Bookings Found
              </h2>
              <p className="text-gray-400">
                You haven't made any bookings yet.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((item, index) => (
              <div
                key={item._id || index}
                className="flex flex-col lg:flex-row bg-primary/8 border border-primary/20 rounded-lg p-4 hover:bg-primary/12 transition-colors"
              >
                <div className="flex flex-col md:flex-row flex-1">
                  <img
                    src={item.show.movie.poster_path}
                    alt={item.show.movie.title}
                    className="w-full md:w-48 h-64 md:h-36 object-cover rounded-lg"
                  />
                  <div className="flex flex-col p-4 flex-1">
                    <h3 className="text-xl font-semibold mb-2">
                      {item.show.movie.title}
                    </h3>
                    <div className="space-y-1 text-sm text-gray-400">
                      <p>Duration: {timeFormat(item.show.movie.runtime)}</p>
                      <p>Show Time: {dateFormat(item.show.showDateTime)}</p>
                      <p>
                        Genre:{" "}
                        {item.show.movie.genres
                          .map((genre) => genre.name)
                          .join(", ")}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col lg:items-end lg:text-right justify-between p-4 border-t lg:border-t-0 lg:border-l border-primary/20">
                  <div className="flex flex-col items-start lg:items-end gap-3 mb-4">
                    <div className="flex items-center gap-2">
                      {item.isPaid ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <CreditCard className="w-5 h-5 text-yellow-500" />
                      )}
                      <span
                        className={`text-sm font-medium ${
                          item.isPaid ? "text-green-500" : "text-yellow-500"
                        }`}
                      >
                        {item.isPaid ? "Paid" : "Pending Payment"}
                      </span>
                    </div>
                    <p className="text-2xl font-bold">
                      {currency}
                      {item.amount}
                    </p>
                    {!item.isPaid && (
                      <button
                        onClick={() => handlePayNow(item._id)}
                        className="bg-primary hover:bg-primary-dull px-6 py-2 text-sm rounded-full font-medium cursor-pointer transition-colors"
                      >
                        Pay Now
                      </button>
                    )}
                  </div>

                  <div className="text-sm space-y-1">
                    <p>
                      <span className="text-gray-400">Total Tickets:</span>{" "}
                      <span className="font-medium">
                        {item.bookedSeats.length}
                      </span>
                    </p>
                    <p>
                      <span className="text-gray-400">Seat Numbers:</span>{" "}
                      <span className="font-medium">
                        {item.bookedSeats.join(", ")}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
