import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { userProfile } from "../../context/slice/userSlice";

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
      {!loading && invalid_user_profile && <p>Invalid user profile</p>}
      {!loading && user_profile && <p>{user_profile?.username}</p>}
    </div>
  );
};

export default ProfileDetail;
