import { Popover, Typography } from "@mui/material";

import { useDispatch } from "react-redux";
import { signOut } from "../redux/slices/AuthSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const ProfileDropDown = ({ id, anchorEl, handleClose, open }) => {
  const dispatch = useDispatch();
  const route = useNavigate();

  const signout = () => {
    dispatch(signOut());
    route("/");
  };
  return (
    <>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        className="mt-5"
      >
        <div className="w-full">
          <Typography
            className="px-10 py-3 hover:bg-DarkGreen hover:text-white cursor-pointer"
          >
            <Link to="/settings">Settings</Link>
          </Typography>
          <Typography
            onClick={signout}
            sx={{cursor: "pointer" }}
            className="px-10 py-3 hover:bg-DarkGreen hover:text-white cursor-pointer"
          >
            Sign Out
          </Typography>
        </div>
      </Popover>
    </>
  );
};

export default ProfileDropDown;
