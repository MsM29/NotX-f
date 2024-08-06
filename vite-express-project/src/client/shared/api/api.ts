import { UserData } from "../interface/interfaces";

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

export async function getPublication(page: number) {
  const res = await fetch(`/getPublication?page=${page}`);
  if (res.status === 200) {
    const pubData = await res.json();
    return pubData;
  }
}

export async function postPublication(
  data: string,
  file: File[],
  login: string,
) {
  try {
    const res = await fetch("/makePublication", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    });

    if (res.status === 200) {
      const pubInsert = await res.json();
      await uploadMedia(file, login, pubInsert);
      return res;
    } else {
      throw new Error("Ошибка публикации");
    }
  } catch (error) {
    console.error("Ошибка при публикации:", error);
    throw error;
  }
}

async function uploadMedia(
  file: File[],
  login: string,
  pubInsert: { insertId: string },
) {
  if (file[0]) {
    let type;
    if (file[0].type.split("/")[0] === "image") type = ".png";
    else type = ".mp4";
    const filename =
      file[0].type.split("/")[0] +
      "_" +
      login +
      "_" +
      pubInsert.insertId +
      "_" +
      Date.now() +
      type;
    const filedata = new FormData();
    filedata.append("filedata", new Blob(file), filename);
    try {
      const res = await fetch("/addMedia", {
        method: "POST",
        headers: {
          name: filename,
          pub_id: pubInsert.insertId,
        },
        body: filedata,
      });

      if (res.status !== 200) {
        throw new Error("Ошибка публикации");
      }
    } catch (error) {
      console.error("Ошибка при загрузке медиа:", error);
      throw error;
    }
  }
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

export async function searchUser(searchText: string, page: number) {
  const res = await fetch(`/search?user=${searchText}&page=${page}`);
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

export async function postEditProfile(formData: UserData) {
  const data = JSON.stringify(formData);
  const res = await fetch("/editProfile", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: data,
  });
  return res;
}

export async function editPhotoProfile(photoProfile: File[], login: string) {
  try {
    const filenameProfile = login + ".png";
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

export async function editWallpaperProfile(wallpaper: File[], login: string) {
  try {
    const filenameProfile = login + ".png";
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
  page: number,
) {
  const res = await fetch(`/getUserPublication?login=${login}&page=${page}`);
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

export async function getSubscriptions(page: number) {
  const res = await fetch(`/subscriptions?page=${page}`);
  const data = await res.json();
  return data;
}

export async function getSubscribers(page: number) {
  const res = await fetch(`/subscribers?page=${page}`);
  const data = await res.json();
  return data;
}

export async function getFeed(page: number) {
  const res = await fetch(`/feed?page=${page}`);
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
  const data = JSON.stringify({ privacy });
  const res = await fetch(`/setPrivacy`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: data,
  });
  return res;
}

export async function postEditPassword(data: string) {
  const res = await fetch("/editPassword", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: data,
  });
  if (res.status !== 200) {
    const commits = await res.json();
    alert(commits.message);
  } else alert("Пароль изменен!");
}

export async function sendLike(id_post: number) {
  const res = await fetch(`like?post=${id_post}`);
  const data = res.json();
  return data;
}

export async function getLikeUsers(post: number, page: number) {
  const res = await fetch(`/likes?post=${post}&page=${page}`);
  const data = await res.json();
  return data;
}

export async function getPost(post: number) {
  const res = await fetch(`/post?post=${post}`);
  const data = await res.json();
  return data;
}

export async function postComment(data: string, file: File[]) {
  try {
    const res = await fetch("/makeComment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    });

    if (res.status === 200) {
      const pubInsert = await res.json();
      await uploadMediaComment(file, pubInsert.insertId);
      return res;
    } else {
      throw new Error("Ошибка публикации");
    }
  } catch (error) {
    console.error("Ошибка при публикации:", error);
    throw error;
  }
}

async function uploadMediaComment(file: File[], insertId: string) {
  if (file[0]) {
    let type;
    if (file[0].type.split("/")[0] === "image") type = ".png";
    else type = ".mp4";
    const filename =
      file[0].type.split("/")[0] + "_" + insertId + "_" + Date.now() + type;
    const filedata = new FormData();
    filedata.append("filedata", new Blob(file), filename);
    try {
      const res = await fetch("/addMediaComment", {
        method: "POST",
        headers: {
          name: filename,
          pub_id: insertId,
        },
        body: filedata,
      });

      if (res.status !== 200) {
        throw new Error("Ошибка публикации");
      }
    } catch (error) {
      console.error("Ошибка при загрузке медиа:", error);
      throw error;
    }
  }
}

export async function getComments(post: number, page: number) {
  const res = await fetch(`/getComments?post=${post}&page=${page}`);
  if (res.status === 200) {
    const pubData = await res.json();
    return pubData;
  }
}