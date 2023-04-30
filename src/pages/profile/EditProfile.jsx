import React from "react";
import {  useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Error403 from "../../assets/403Error.avif";
import "../../styles/profile/error-profile.css";
import Loading from "../../components/global/Loading";
import EditProfilleForm from "../../components/profile/EditProfilleForm";

const EditProfile = () => {
  const { id } = useParams();
  const naviagte = useNavigate();
  const { user, loading } = useSelector((store) => store.auth);

  return (
    <section className="main">
      {loading && <Loading />}
      {!loading && id.toString() !== user?.user?._id.toString() && (
        <div className="bad-request-empty">
          <h1>403: Sorry you can edit only your profile!</h1>
          <p>
            You either tried some shady route or you came here by mistake.
            Whichever it is, try using the navigation
          </p>
          <img src={Error403} alt="Error403" />
          <button onClick={() => naviagte(`/profile/${user?.user?._id}`)}>
            View Your Profile
          </button>
        </div>
      )}
      {!loading && id.toString() === user?.user?._id.toString() && <EditProfilleForm />}
    </section>
  );
};

export default EditProfile;
