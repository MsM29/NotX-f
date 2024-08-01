import { UserData } from "./interfaces";

export async function getHome() {
  const res = await fetch("/home");
  if (res.status === 200) {
    const resServer = await res.json();
    return resServer;
  } else {
    alert("Ошибка при выполнении запроса!");
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

export async function getPublication(page = 1) {
  const res = await fetch(`/getPublication?page=${page - 1}`);
  if (res.status === 200) {
    const pubData = await res.json();
    return pubData;
  }
}

export function postPublication(
  data: string,
  file: File[],
  context: { login: string },
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
  context: { login: string },
  pubInsert: { insertId: string },
) {
  if (file[0]) {
    let type;
    if (file[0].type.split("/")[0] === "image") type = ".png";
    else type = ".mp4";
    const filename =
      file[0].type.split("/")[0] +
      "_" +
      context.login +
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
      if (res.status !== 200) alert("Ошибка публикации");
    });
  }
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
  return pubData;
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

export async function searchUser(searchText: string, page = 1) {
  const res = await fetch(`/search?user=${searchText}&page=${page - 1}`);
  if (res.status === 200) {
    const resServer = await res.json();
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
  formData: UserData,
  photoProfile: File[],
  wallpaper: File[],
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
    if (photoProfile.length !== 0) editPhotoProfile(photoProfile, formData);
    if (wallpaper.length !== 0) editWallpaperProfile(wallpaper, formData);
  } else alert("Ошибка публикации");
}

async function editPhotoProfile(
  photoProfile: File[],
  context: { login: string },
) {
  try {
    const filenameProfile = context.login + ".png";
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
  context: { login: string },
) {
  try {
    const filenameProfile = context.login + ".png";
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
    return resServer;
  } else {
    alert("Ошибка при выполнении запроса!");
  }
}

export async function getUserPublication(
  login: string | null | undefined,
  page = 1,
) {
  const res = await fetch(
    `/getUserPublication?login=${login}&page=${page - 1}`,
  );
  if (res.status === 200) {
    const resServer = await res.json();
    return resServer;
  } else {
    alert("Ошибка при выполнении запроса!");
  }
}

export async function postSubscribe(login: string) {
  const res = await fetch(`/subscribe?login=${login}`);
  return res;
}

export async function postUnsubscribe(login: string) {
  const res = await fetch(`/unsubscribe?login=${login}`);
  return res;
}

export async function checkSubscription(login: string) {
  const res = await fetch(`/checkSubscription?login=${login}`);
  return res;
}

export async function getSubscriptions(page = 1) {
  const res = await fetch(`/subscriptions?page=${page - 1}`);
  const data = await res.json();
  return data;
}

export async function getSubscribers(page = 1) {
  const res = await fetch(`/subscribers?page=${page - 1}`);
  const data = await res.json();
  return data;
}

export async function getFeed(page = 1) {
  const res = await fetch(`/feed?page=${page - 1}`);
  const pubData = await res.json();
  return pubData;
}

export async function getMyData() {
  const res = await fetch(`/getMyData`);
  if (res.status === 200) {
    const data = await res.json();
    return data;
  } else {
    alert("Ошибка при выполнении запроса!");
  }
}

export async function privacy(privacy: boolean) {
  const data = JSON.stringify({privacy})
  const res = await fetch(`/setPrivacy`, {
    method: "POST",
     headers: {
      "Content-Type": "application/json",
    },
    body: data,
  });
  return res;
}
