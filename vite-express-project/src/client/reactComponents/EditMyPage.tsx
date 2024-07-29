import React, { useContext, useState } from "react";
import { MyContext } from "./App";
import { postEditProfile } from "../functions/api";

function EditMyPage() {
  const context = useContext(MyContext);
  const [formData, setFormData] = useState({
    name: context[0].name,
    bio: context[0].bio,
  });
  const [photoProfile, setPhotoProfile] = useState<File[]>([]);
  const [wallpaper, setWallpaper] = useState<File[]>([]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const editProfile = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    postEditProfile(formData, photoProfile, wallpaper, context);
  };

  return (
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
          onChange={(event) =>
            setWallpaper(Array.from(event.target.files || []))
          }
        />
      </p>
      <p className="text-2xl mt-3">
        Выберите фото профиля:
        <input
          type="file"
          name="photoProfile"
          className="ml-3 bg-blue-200 text-center leading-10 text-gray-950 rounded-md border  border-gray-950 hover:bg-gray-400 hover:text-white"
          accept="video/*, image/*"
          onChange={(event) =>
            setPhotoProfile(Array.from(event.target.files || []))
          }
        />
      </p>
      <p className="text-2xl mt-3">
        Введите имя профиля:
        <input
          className="ml-3 h-12 w-[474px] rounded-md border border-gray-950 p-1"
          name="name"
          onChange={handleChange}
          defaultValue={context[0].name}
        ></input>
      </p>
      <p className="text-2xl mt-3 flex justify-start">
        Введите описание профиля:
        <textarea
          className="ml-3 w-[412px] h-40 resize-none rounded-md border border-gray-950 p-1"
          name="bio"
          onChange={handleChange}
          defaultValue={context[0].bio}
        ></textarea>
      </p>
      <button className="mt-3 text-2xl w-max bg-blue-200 text-center text-gray-950 rounded-md border  border-gray-950 px-4 py-2 hover:bg-gray-400 hover:text-white">
        Сохранить
      </button>
    </form>
  );
}

export default EditMyPage;
