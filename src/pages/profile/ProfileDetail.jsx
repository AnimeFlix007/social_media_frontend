import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { userProfile } from "../../context/slice/userSlice";
import BadRequestEmpty from "../../assets/BadRequestEmpty.avif";
import "../../styles/profile/error-profile.css";

const ProfileDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { invalid_user_profile, user_profile, loading } = useSelector(
    (store) => store.users
  );

  useEffect(() => {
    dispatch(userProfile({ id }));
  }, [id, dispatch]);

  return (
    <div className="main">
      {loading && <p>loading...</p>}
      {!loading && invalid_user_profile && (
        <div className="bad-request-empty">
          <h1>404: The Profile you are looking for isn’t here</h1>
          <p>
            You either tried some shady route or you came here by mistake.
            Whichever it is, try using the navigation
          </p>
          <img src={BadRequestEmpty} alt="BadRequestEmpty" />
          <button>View Your Profile</button>
        </div>
      )}
      {!loading && user_profile && <p>{user_profile?.username}</p>}
    </div>
  );
};

export default ProfileDetail;
