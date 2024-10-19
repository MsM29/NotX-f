import React, { useState, useEffect } from "react";
import ErrorAlert from "../../shared/components/ErrorAlert";
import SuccessAlert from "../../shared/components/SuccessAlert";

import {
  postEditProfile,
  getHome,
  privacy,
  postEditPassword,
  editPhotoProfile,
  editWallpaperProfile,
} from "../../shared/api/api";

function EditMyPage() {
  const [formData, setFormData] = useState({
    name: "",
    login: "",
    bio: "",
  });
  const [photoProfile, setPhotoProfile] = useState<File[]>([]);
  const [wallpaper, setWallpaper] = useState<File[]>([]);
  const [privateStatus, setPrivateStatus] = useState<boolean>();
  const [formPassword, setFormPassword] = useState({
    oldPassword: "",
    newPassword: "",
    reNewPassword: "",
  });
  const [dialogErrorText, setDialogErrorText] = useState("error");
  const [dialogSuccessText, setDialogSuccessText] = useState("success");

  useEffect(() => {
    async function home() {
      const res = await getHome();
      const data = await res.json();
      setFormData(data[0]);
      setPrivateStatus(data[0].private);
    }
    home();
  }, []);

  const handleChangeData = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleChangePassword = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormPassword((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleChangePhotoProfile = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPhotoProfile(Array.from(event.target.files || []));
  };

  const handleChangeWallpaper = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setWallpaper(Array.from(event.target.files || []));
  };

  const editProfile = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    Promise.all([
      postEditProfile(formData),
      editPhotoProfile(photoProfile, formData.login),
      editWallpaperProfile(wallpaper, formData.login),
    ])
      .then(() => {
        setDialogSuccessText("changesSaved");
      })
      .catch((error) => {
        setDialogErrorText("changeError" + error);
      });
  };

  const editPassword = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formPassword.newPassword === formPassword.reNewPassword) {
      const data = JSON.stringify(formPassword);
      const res = await postEditPassword(data);
      if (res.status !== 200) {
        const text = await res.json();
        setDialogErrorText(text.message);
      } else {
        const text = await res.json();
        setDialogSuccessText(text.message);
      }
    }
  };

  const privacySettings = async (
    event: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    const res = await privacy(event.currentTarget.checked);
    if (res.status === 200) {
      setPrivateStatus(!privateStatus);
    }
  };

  return (
    <>
      <ErrorAlert dialogText={dialogErrorText} />
      <SuccessAlert dialogText={dialogSuccessText} />
      <div className="mt-3 w-[1000px] flex flex-col justify-center items-center">
        <form
          onSubmit={editProfile}
          className="mt-3 w-[1000px] flex flex-col justify-center items-center"
        >
          <h1 className="text-4xl ">Редактирование профиля</h1>
          <p className="text-2xl mt-3 ">
            Выберите обои профиля:
            <input
              type="file"
              name="wallpaper"
              className="ml-3 bg-blue-200 text-center leading-10 text-gray-950 rounded-md border  border-gray-950  hover:bg-gray-400 hover:text-white"
              accept="video/*, image/*"
              onChange={handleChangeWallpaper}
            />
          </p>
          <p className="text-2xl mt-3">
            Выберите фото профиля:
            <input
              type="file"
              name="photoProfile"
              className="ml-3 bg-blue-200 text-center leading-10 text-gray-950 rounded-md border  border-gray-950 hover:bg-gray-400 hover:text-white"
              accept="video/*, image/*"
              onChange={handleChangePhotoProfile}
            />
          </p>
          <p className="text-2xl mt-3">
            Введите имя профиля:
            <input
              className="ml-3 h-12 w-[474px] rounded-md border border-gray-950 p-1"
              name="name"
              onChange={handleChangeData}
              defaultValue={formData.name}
            ></input>
          </p>
          <p className="text-2xl mt-3 flex justify-start">
            Введите описание профиля:
            <textarea
              className="ml-3 w-[412px] h-40 resize-none rounded-md border border-gray-950 p-1"
              name="bio"
              onChange={handleChangeData}
              defaultValue={formData.bio}
              maxLength={280}
            ></textarea>
          </p>
          <button className="mt-3 text-2xl w-max bg-blue-200 text-center text-gray-950 rounded-md border  border-gray-950 px-4 py-2 hover:bg-gray-400 hover:text-white">
            Сохранить
          </button>
        </form>
        <h1 className="text-4xl mt-3">Настройки конфиденциальности</h1>
        <label className="inline-flex items-center cursor-pointer mt-3">
          <p className="text-2xl mt-3 flex justify-start">Закрытый профиль:</p>
          <input
            type="checkbox"
            className="sr-only peer"
            onClick={privacySettings}
            defaultChecked={privateStatus}
          />
          <div className="text-2xl mt-3 ml-3 relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        </label>
        <h1 className="text-4xl mt-3">Изменить пароль</h1>
        <form
          onSubmit={editPassword}
          className="mt-3 w-[1000px] flex flex-col justify-center items-center"
        >
          <p className="text-2xl mt-3">
            Введите старый пароль:
            <input
              type="password"
              className="ml-3 h-12 w-[474px] rounded-md border border-gray-950 p-1"
              name="oldPassword"
              onChange={handleChangePassword}
              defaultValue={formPassword.oldPassword}
              autoComplete="on"
            ></input>
          </p>
          <p className="text-2xl mt-3">
            Введите новый пароль:
            <input
              type="password"
              className="ml-3 h-12 w-[480px] rounded-md border border-gray-950 p-1"
              name="newPassword"
              onChange={handleChangePassword}
              defaultValue={formPassword.newPassword}
              autoComplete="on"
            ></input>
          </p>
          <p className="text-2xl mt-3">
            Повторите новый пароль:
            <input
              type="password"
              className="ml-3 h-12 w-[450px] rounded-md border border-gray-950 p-1"
              name="reNewPassword"
              onChange={handleChangePassword}
              defaultValue={formPassword.reNewPassword}
              autoComplete="on"
            ></input>
          </p>
          <button className="mt-3 text-2xl w-max bg-blue-200 text-center text-gray-950 rounded-md border  border-gray-950 px-4 py-2 hover:bg-gray-400 hover:text-white">
            Сохранить
          </button>
        </form>
      </div>
    </>
  );
}

export default EditMyPage;
