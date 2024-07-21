interface PubData {
  date: string;
  text: string;
}

interface UserData {
  name: string;
  login: string;
  bio: string;
  photoProfile: string;
  wallpaper: string;
}

function Publication({
  userData,
  publication,
}: {
  userData: UserData;
  publication: PubData;
}) {
  console.log(publication);
  console.log(userData);
  return (
    <div className="post">
      <img
        className="postProfile"
        src={`../../../images/${userData.photoProfile}`}
      ></img>
      <div>
        <div>
          <p className="postProfile"> {userData.name}</p>
          <p className="postProfile"> @{userData.login}</p>
          <time className="postProfile" dateTime="">
            {publication.date}
          </time>
        </div>
        <p>{publication.text}</p>
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
  );
}

export default Publication;
