import React from "react";

export async function getHome() {
  const res = await fetch("/home");
  if (res.status === 200) {
    const resServer = await res.json();
    return resServer;
  }
}

export async function postLogin(data: string) {
  const res = await fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: data,
  });
  return res;
}

export async function getLogout() {
  const res = await fetch("/logout");
  return res;
}

export async function getPublication() {
  const res = await fetch("/getPublication");
  if (res.status === 200) {
    const pubData = await res.json();
    return pubData;
  }
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

export async function getMedia(data: string) {
  const res = await fetch("/getMedia", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: data,
  });
  const pubData = await res.json();
  if (pubData.length !== 0) {
    if (pubData[0].format === "image")
      return (
        <img
          className="w-full object-cover rounded-xl"
          src={`../../../mediaPublication/${pubData[0].media_name}`}
        ></img>
      );
    else
      return (
        <video
          className="w-full object-cover rounded-xl"
          src={`../../../mediaPublication/${pubData[0].media_name}`}
          controls
          autoPlay
          muted
        ></video>
      );
  } else return <></>;
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

export async function searchUser(searchText: string) {
  const res = await fetch(`/search?user=${searchText}`);
  if (res.status === 200) {
    const resServer = await res.json();
    return resServer;
  } else {
    alert("Ошибка при выполнении запроса!");
  }
}
