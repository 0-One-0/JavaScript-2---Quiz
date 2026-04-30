import Links from "./Links";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import logo from "../assets/logo2.png";

function NavBar() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);

      if (!user) {
        setProfile(null);
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) {
        console.log(error.message);
        setProfile(null);
        return;
      }

      setProfile(data);
    }

    fetchUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      fetchUser();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function handleLogout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log(error.message);
      return;
    }

    setUser(null);
    setIsOpen(false);
    navigate("/login");
  }

  const displayName = profile?.username || "";
  const avatarUrl = profile?.avatar_url || "";
  const avatarLetter = displayName.charAt(0).toUpperCase() || "?";

  return (
    <nav className="navbar-continer">
      <div className="links-continer">
        <Links />
      </div>
      <div className="logo-continer">
        <Link to="/">
          <img className="logo-img" src={logo} alt="logo" />
        </Link>
      </div>
      <div className="avatar-continer">
        {user && (
          <>
            <div className="avatar-circle" onClick={() => setIsOpen(!isOpen)}>
              {avatarUrl ?
                <img
                  src={avatarUrl}
                  alt="Profile avatar"
                  className="avatar-img"
                />
              : avatarLetter}
            </div>

            {isOpen && (
              <div className="dropdown-profile">
                <p className="dropdown-username">{displayName}</p>

                <Link
                  to={`/profile/${profile?.username}`}
                  onClick={() => setIsOpen(false)}
                >
                  Profil
                </Link>

                <button type="button" onClick={handleLogout}>
                  Logga ut
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
