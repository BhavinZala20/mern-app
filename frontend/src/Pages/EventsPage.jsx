import React from "react";
import { useSelector } from "react-redux";
import EventCard from "../Components/Events/EventCard";
import Header from "../Components/Layout/Header";
import Loader from "../Components/Layout/Loader";

const EventsPage = () => {
  const { allEvents, isLoading } = useSelector((state) => state.events);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex flex-col items-center justify-center">
          <Header activeHeading={4} />
          {/* <EventCard active={true} data={allEvents && allEvents[0]} /> */}
          <div className="w-full max-w-screen-lg flex flex-col items-center">
            {allEvents && allEvents.length > 0 ? (
              allEvents.map((event, index) => (
                <EventCard key={index} active={true} data={event} />
              ))
            ) : (
              <p className="text-center w-full pt-[200px] text-[20px]">
                No events available.
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default EventsPage;
