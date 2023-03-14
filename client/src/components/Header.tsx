import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import decode from "jwt-decode";
import { UserType } from "./PostForm";

type DecodedTokenType = {
  email: string;
  id: string;
  iat: number;
  exp: number;
};
const Header = () => {
  const [user, setUser] = useState<UserType | null>(
    JSON.parse(localStorage.getItem("profile") as string)
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch({ type: "LOGOUT" });

    navigate("/signin");

    setUser(null);
  };
  useEffect(() => {
    if (!user) {
      console.log("No logged in user");
      navigate("/signin");
    } else {
      const token = user.token;

      const decodedToken: DecodedTokenType = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile") as string));
  }, [location]);
  return (
    <header className="navbar bg-neutral text-neutral-content gap-2 py-4 fixed top-0 z-50">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">Miniposts</a>
      </div>

      <div className="flex items-center justify-center gap-2 relative">
        <label className="btn btn-ghost btn-square avatar">
          <span className="w-10 h-10 bg-accent flex items-center justify-center text-neutral-focus text-2xl">
            {user?.result.username.charAt(0)}
          </span>
        </label>
        <span>@{user?.result.username}</span>
      </div>
      <button className="btn btn-warning btn-outline ml-4" onClick={logout}>
        Logout
      </button>
    </header>
  );
};
export default Header;
