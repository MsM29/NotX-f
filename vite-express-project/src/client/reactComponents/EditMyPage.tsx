import React, { useState, useEffect } from "react";
import { postEditProfile, getHome, privacy } from "../functions/api";
import { UserData } from "../functions/interfaces";

function EditMyPage() {
  const [formData, setFormData] = useState<UserData>({
    name: "",
    login: "",
    bio: "",
  });
  const [photoProfile, setPhotoProfile] = useState<File[]>([]);
  const [wallpaper, setWallpaper] = useState<File[]>([]);
  const [privateStatus, setPrivateStatus] = useState<boolean>();

  useEffect(() => {
    async function home() {
      const res = await getHome();
      setFormData(res[0]);
      setPrivateStatus(res[0].private);
    }
    home();
  }, []);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleChangePhotoProfile = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setPhotoProfile(Array.from(event.target.files || []));
  };

  const handleChangeWallpaper = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setWallpaper(Array.from(event.target.files || []));
  };

  const editProfile = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    postEditProfile(formData, photoProfile, wallpaper);
  };

  const privacySettings = async (
    event: React.MouseEvent<HTMLInputElement, MouseEvent>,
  ) => {
    const res = await privacy(event.currentTarget.checked);
    if (res.status === 200) {
      setPrivateStatus(!privateStatus);
    }
  };

  return (
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
            onChange={handleChange}
            defaultValue={formData.name}
          ></input>
        </p>
        <p className="text-2xl mt-3 flex justify-start">
          Введите описание профиля:
          <textarea
            className="ml-3 w-[412px] h-40 resize-none rounded-md border border-gray-950 p-1"
            name="bio"
            onChange={handleChange}
            defaultValue={formData.bio}
          ></textarea>
        </p>
        <button className="mt-3 text-2xl w-max bg-blue-200 text-center text-gray-950 rounded-md border  border-gray-950 px-4 py-2 hover:bg-gray-400 hover:text-white">
          Сохранить
        </button>
      </form>
      <h1 className="text-4xl mt-3">Настройки конфиденциальности</h1>
      <label className="inline-flex items-center cursor-pointer mt-3">
        <p className="text-2xl mt-3 flex justify-start">
          Сделать профиль закрытым:
        </p>
        <input
          type="checkbox"
          className="sr-only peer"
          onClick={privacySettings}
          defaultChecked={privateStatus}
        />
        <div className="text-2xl mt-3 ml-3 relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
      </label>
    </div>
  );
}

export default EditMyPage;
