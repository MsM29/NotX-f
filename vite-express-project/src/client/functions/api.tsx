import React, { SetStateAction } from "react";
import { UserData, PubData } from "./interfaces";

export function getHome(
  setAuth: { (value: SetStateAction<boolean>): void },
  setUserData: { (value: SetStateAction<UserData[]>): void },
) {
  fetch("/home").then(async (res) => {
    if (res.status === 200) {
      const resServer = await res.json();
      setUserData(resServer);
      setAuth(true);
    } else {
      setAuth(false);
    }
  });
}

export async function postLogin(data: string) {
  await fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: data,
  }).then(async (res) => {
    if (res.status !== 200) {
      const commits = await res.json();
      alert(commits.message);
    } else window.location.reload();
  });
}

export function getLogout() {
  fetch("/logout").then((res) => {
    if (res.status === 200) {
      window.location.reload();
    } else alert("Ошибка при выходе!");
  });
}

export function getPublication(setPublication: {
  (value: SetStateAction<PubData[]>): void;
}) {
  fetch("/getPublication").then(async (res) => {
    const pubData = await res.json();
    setPublication(pubData);
  });
}

export function postPublication(
  data: string,
  file: File[],
  context: { name: string }[],
) {
  fetch("/makePublication", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: data,
  })
    .then(async (res) => {
      if (res.status === 200) {
        const pubInsert = await res.json();
        uploadMedia(file, context, pubInsert);
      } else alert("Ошибка публикации");
    })
    .catch((error) => {
      console.log(error);
      alert("Ошибка публикации");
    });
}

function uploadMedia(
  file: File[],
  context: { name: string }[],
  pubInsert: { insertId: string },
) {
  if (file[0]) {
    let type;
    if (file[0].type.split("/")[0] === "image") type = ".png";
    else type = ".mp4";
    const filename =
      file[0].type.split("/")[0] +
      "_" +
      context[0].name +
      "_" +
      pubInsert.insertId +
      "_" +
      Date.now() +
      type;
    const filedata = new FormData();
    filedata.append("filedata", new Blob(file), filename);
    fetch("/addMedia", {
      method: "POST",
      headers: {
        name: filename,
        pub_id: pubInsert.insertId,
      },
      body: filedata,
    }).then((res) => {
      if (res.status === 200) alert("Опубликовано!");
      else alert("Ошибка публикации");
    });
  } else alert("Опубликовано!");
}

export function getMedia(data: string, setMedia: { (value: React.SetStateAction<JSX.Element>): void}) {
  return fetch("/getMedia", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: data,
  }).then(async (res) => {
    const pubData = await res.json();
    if (pubData.length !== 0) {
      const mediaElement =
        pubData[0].format === "image" ? (
          <img
            className="w-full object-cover rounded-xl"
            src={`../../../mediaPublication/${pubData[0].media_name}`}
          ></img>
        ) : (
          <video
            className="w-full object-cover rounded-xl"
            src={`../../../mediaPublication/${pubData[0].media_name}`}
            controls
            autoPlay
            muted
          ></video>
        );
        setMedia(mediaElement)
    }
  });
}

export async function postRegistration(data: string) {
  await fetch("/registration", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: data,
  }).then(async (res) => {
    if (res.status !== 200) {
      const commits = await res.json();
      alert(commits.message);
    } else alert("Регистрация прошла успешно!");
  });
}

export function searchUser(
  searchText: string,
  setSearchData: { (value: SetStateAction<never[]>): void },
) {
  fetch(`/search?user=${searchText}`)
    .then(async (res) => {
      if (res.status === 200) {
        const resServer = await res.json();
        setSearchData(resServer);
      } else {
        alert("Ошибка при выполнении запроса!");
      }
    })
    .catch((error) => {
      console.error("Ошибка запроса:", error);
      alert("Произошла ошибка при выполнении запроса.");
    });
}
