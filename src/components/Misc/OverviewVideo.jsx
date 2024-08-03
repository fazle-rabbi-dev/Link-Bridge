import React from "react";

function VideoEmbed() {
  return (
    <div className="flex justify-center items-center py-8">
      <div className="bg-red-100 py-2 px-4 shadow rounded-2xl">
        <h3 className="text-lg font-bold text-rose-500">
          📢 Sign-Up Currently Unavailable!
        </h3>
        <p className="mt-4 text-sm text-gray-600">
          Sign-up functionality is temporarily unavailable at the moment. My
          Link-Bridge-Api service has been suspended due to exceeding the
          monthly request quota. (
          <span className="font-bold underline">Major Reason</span>: im using
          free hosting.)
        </p>

        <p className="font-bold mt-4 mb-2">
          Watch the video below to see this app's features:
        </p>

        <p>
          Open in{" "}
          <a
            className="underline text-purple-500 mb-2"
            href="https://www.youtube.com/w/OBbjJgiWYBw"
          >
            YouTube.
          </a>
        </p>

        <div className="flex justify-center items-center">
          
        
        <div className="w-full md:w-2/3 lg:w-1/2">
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              className="rounded-lg shadow-lg"
              src="https://www.youtube.com/embed/OBbjJgiWYBw"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

export default VideoEmbed;
