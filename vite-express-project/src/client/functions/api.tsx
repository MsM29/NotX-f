import React from "react";
import { UserData } from "./interfaces";

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
  context: { login: string }[],
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
  context: { login: string }[],
  pubInsert: { insertId: string },
) {
  if (file[0]) {
    let type;
    if (file[0].type.split("/")[0] === "image") type = ".png";
    else type = ".mp4";
    const filename =
      file[0].type.split("/")[0] +
      "_" +
      context[0].login +
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
    console.log(resServer)
    return resServer;
  } else {
    alert("Ошибка при выполнении запроса!");
  }
}

export async function deleteP(id_post: number) {
  const res = await fetch(`/delete?id_post=${id_post}`);
  return res;
}

export async function postEditProfile(
  formData: {
    name: string;
    bio: string;
  },
  photoProfile: File[],
  wallpaper: File[],
  context: UserData[],
) {
  const data = JSON.stringify(formData);
  const res = await fetch("/editProfile", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: data,
  });
  if (res.status === 200) {
    if (photoProfile.length !== 0) editPhotoProfile(photoProfile, context);
    if (wallpaper.length !== 0) editWallpaperProfile(wallpaper, context);
  } else alert("Ошибка публикации");
}

async function editPhotoProfile(
  photoProfile: File[],
  context: { login: string }[],
) {
  try {
    const filenameProfile = context[0].login + ".png";
    const filedata = new FormData();
    filedata.append("filedata", new Blob(photoProfile), filenameProfile);
    const res = await fetch("/editPhotoProfile", {
      method: "POST",
      headers: {
        name: filenameProfile,
      },
      body: filedata,
    });
    if (res.status === 200) alert("Опубликовано!");
    else alert("Ошибка публикации");
  } catch (e) {
    console.log(e);
  }
}

async function editWallpaperProfile(
  wallpaper: File[],
  context: { login: string }[],
) {
  try {
    const filenameProfile = context[0].login + ".png";
    const filedata = new FormData();
    filedata.append("filedata", new Blob(wallpaper), filenameProfile);
    const res = await fetch("/editWallpaperProfile", {
      method: "POST",
      headers: {
        name: filenameProfile,
      },
      body: filedata,
    });
    if (res.status === 200) alert("Опубликовано!");
    else alert("Ошибка публикации");
  } catch (e) {
    console.log(e);
  }
}

export async function userPage(login: unknown) {
  const res = await fetch(`/users?user=${login}`);
  if (res.status === 200) {
    const resServer = await res.json();
    console.log(resServer)
    return resServer;
  } else {
    alert("Ошибка при выполнении запроса!");
  }
}

export async function getUserPublication(login: string | null | undefined) {
  const res = await fetch(`/getUserPublication?login=${login}`);
  if (res.status === 200) {
    const pubData = await res.json();
    return pubData;
  }
}