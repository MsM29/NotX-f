import React, { useEffect, useState } from "react";
import { getFeed, getMedia } from "../functions/api";
import { FeedData } from "../functions/interfaces";

function Feed() {
  const [feed, setFeed] = useState<FeedData[]>([]);
  const [mediaMap, setMediaMap] = useState<{
    [key: string]: JSX.Element | null;
  }>({});

  useEffect(() => {
    async function feedFunc() {
      const res = await getFeed();
      setFeed(res);

      const mediaPromises = res.map(async (element: { id_post: number }) => {
        const data = JSON.stringify({ id_post: element.id_post });
        const mediaResponse = await getMedia(data);

        let media = null;
        if (mediaResponse.length !== 0) {
          const mediaName = mediaResponse[0].media_name;
          if (mediaResponse[0].format === "image") {
            media = (
              <img
                className="w-full object-cover rounded-xl"
                src={`../../../mediaPublication/${mediaName}`}
                alt={`Media for post ${element.id_post}`}
              />
            );
          } else {
            media = (
              <video
                className="w-full object-cover rounded-xl"
                src={`../../../mediaPublication/${mediaName}`}
                controls
                autoPlay
                muted
              />
            );
          }
        }
        return { id_post: element.id_post, media };
      });

      const mediaResults = await Promise.all(mediaPromises);
      const mediaMapResult = mediaResults.reduce((map, { id_post, media }) => {
        map[id_post] = media;
        return map;
      }, {});

      setMediaMap(mediaMapResult);
    }

    feedFunc();
  }, []);

  return feed.map((element, index) => {
    const date = new Date(element.date).toLocaleString("ru");
    return (
      <>
        <div className="flex flex-col justify-center border-x-4 border-[#b6c5cd] max-w-5xl">
          <div key={index} className="max-w-7xl flex flex-row p-2">
            <img
              className="w-24 h-24 object-cover rounded-full border-4 border-[#b6c5cd]"
              src={`../../../mediaProfile/profilePhoto/${element.login}.png`}
              alt={`${element.name}'s profile`}
            />
            <div className="w-full ml-2">
              <div className="flex flex-row ml-2 h-max items-center">
                <p className="text-2xl">{element.name}</p>
                <p className="ml-2 text-1xl">@{element.login}</p>
                <time className="ml-2">{date}</time>
              </div>
              <p className="m-2">{element.text}</p>
              <div
                className="flex flex-row p-1 m-2"
                id={`mediaPost${element.id_post}`}
              >
                {mediaMap[element.id_post]}
              </div>
              <div className="flex m-2">
                <button className="w-10 h-10 p-0 object-cover rounded-full mr-8 bg-blue-200 text-center leading-10 text-gray-950 border border-gray-950 hover:bg-gray-400 hover:text-white flex justify-center">
                  &#10084;
                </button>
                <button className="w-10 h-10 p-0 object-cover rounded-full mr-8 bg-blue-200 text-center leading-10 text-gray-950 border border-gray-950 hover:bg-gray-400 hover:text-white flex justify-center">
                  &#9993;
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  });
}

export default Feed;
