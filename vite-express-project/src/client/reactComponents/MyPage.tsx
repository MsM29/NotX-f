import "../styles/myPage.css";

interface UserData {
  name: string;
  login: string;
  bio: string;
  photoProfile: string;
  wallpaper: string;
}

function MyPage({ userData }: { userData: UserData }) {
  return (
    <>
      <nav id="sidebar">
        <ul>
          <li>
            <a href="">Мой профиль</a>
          </li>
          <li>
            <a href="">Подписки</a>
          </li>
          <li>
            <a href="">Подписчики</a>
          </li>
          <li>
            <a href="">Поиск</a>
          </li>
          <li>
            <a href="">Лента</a>
          </li>
          <li>
            <a href="">Понравилось</a>
          </li>
          <li>
            <a href="">Комментарии</a>
          </li>
        </ul>
      </nav>
      <div id="profile">
        <div id="profileInfo">
          <div id="wallpaperProfile" style={{backgroundImage: `url("../../../images/${userData.photoProfile}")`}}>
            <img
              id="photoProfile"
              src={`../../../images/${userData.photoProfile}`}
            ></img>
            <button id="editProfile">Редактировать</button>
          </div>
          <h1 id="nameProfile" className="profileText">
            {userData.name}
          </h1>
          <h2 id="loginProfile" className="profileText">
           @{userData.login}
          </h2>
          <p id="bioProfile" className="profileText">
            {userData.bio}
          </p>
        </div>
        <div id="creatingPost">
          <textarea id="inputPost" placeholder="Что нового?" />
          <div id="listPostButtons">
            <button className="postButtons">Прикрепить</button>
            <button className="postButtons">Опубликовать</button>
          </div>
        </div>
        <div id="myPageFeed">
          <div className="post">
            <img
              className="postProfile"
              src="/images/photo_2024-02-28_03-15-31.jpg"
            ></img>
            <div>
              <div>
                <p className="postProfile">nameProfile</p>
                <p className="postProfile">@loginProfile</p>
                <time className="postProfile" dateTime="2024-07-18">
                  18 Июля
                </time>
              </div>
              <p>Я тут что-то запостил</p>
              <div className="media">
                <img src="../../../images/NotX_logo.png"></img>
                <img src="../../../images/photo_2023-12-07_16-15-10 (2).jpg"></img>
                <img src="../../../images/photo_2024-02-28_03-15-31.jpg"></img>
                <video src="../../../videos/IMG_2164.MP4"></video>
              </div>
              <div className="postButtons">
                <button className="like">&#10084;</button>
                <button className="comment">&#9993;</button>
                <button className="delete">&#10006;</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyPage;
