import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getUserCloseFriends,
  userProfile,
} from "../../context/slice/userSlice";
import BadRequestEmpty from "../../assets/BadRequestEmpty.avif";
import "../../styles/profile/error-profile.css";
import Loading from "../../components/global/Loading";
import UserProfile from "../../components/profile/UserProfile";
import {
  getAllImages,
  getAllUserPosts,
  savedPosts,
} from "../../context/slice/postSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { loggedInUserProfile } from "../../context/slice/authSlice";

const ProfileDetail = () => {
  const { id } = useParams();
  const [loadPg, setLoadPg] = useState(false);
  const dispatch = useDispatch();
  const { userDetails } = useSelector((store) => store.auth);
  const {
    invalid_user_profile,
    user_profile,
    loading,
    followed,
    follow_loading,
  } = useSelector((store) => store.users);

  useEffect(() => {
    setLoadPg((prev) => !prev);
    dispatch(userProfile({ id }))
      .then(unwrapResult)
      .then(() => {
        dispatch(loggedInUserProfile());
        setLoadPg((prev) => !prev);
      });
    dispatch(getAllImages({ id }));
    dispatch(getAllUserPosts({ id }));
    dispatch(savedPosts());
    dispatch(getUserCloseFriends({ userId: id }));
  }, [id, dispatch, followed]);

  const closeFriend = userDetails?.close_friends?.find(
    (friend) => friend._id === user_profile._id
  );

  return (
    <div className="main">
      {(loading || loadPg) && <Loading />}
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
      {!loading && user_profile && !invalid_user_profile && (
        <UserProfile
          profile={user_profile}
          loading={follow_loading}
          closeFriend={closeFriend}
        />
      )}
    </div>
  );
};

export default ProfileDetail;
