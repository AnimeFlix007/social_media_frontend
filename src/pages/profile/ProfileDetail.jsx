import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { userProfile } from "../../context/slice/userSlice";
import BadRequestEmpty from "../../assets/BadRequestEmpty.avif";
import "../../styles/profile/error-profile.css";
import Loading from "../../components/global/Loading";
import UserProfile from "../../components/profile/UserProfile";

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
      {loading && <Loading />}
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
      {!loading && user_profile && <UserProfile profile={user_profile} />}
    </div>
  );
};

export default ProfileDetail;
