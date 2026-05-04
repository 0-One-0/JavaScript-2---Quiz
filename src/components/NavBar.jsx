import Links from "./Links";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { supabase } from "../lib/supabase";
import logo from "../assets/logo2.png";
import SearchBar from "./SearchBar";

function NavBar({setQuizArray, setScore}) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [searchArr, setSearchArr] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchToggle, setSearchToggle] = useState(false);
  const searchContainerRef = useRef(null);
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

    async function fetchSearchUsers() {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, username, avatar_url");

      if (error) {
        console.log(error.message);
        return;
      }

      setSearchArr(data || []);
    }

    fetchUser();
    fetchSearchUsers();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      fetchUser();
      fetchSearchUsers();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (
        searchToggle &&
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setSearchToggle(false);
      }
    };

    document.addEventListener("mousedown", handleDocumentClick);
    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, [searchToggle]);

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

  const handleSearchToggle = (e) => {
    e.stopPropagation();
    if (searchToggle) {
      setSearchToggle(false);
    } else {
      setSearchToggle(true);
    }
  };

  const handleSelectedUser = (id) => {
    if (!id) return;
    const selectedUser = searchArr.find((item) => item.id === id);
    if (!selectedUser) return;
    setSearchToggle(false);
    navigate(`/profile/${selectedUser.username}`);
  };

  return (
    <nav className="navbar-continer">
      <div className="links-continer">
        <Link to="/">
          <img className="logo-img-big" src={logo} alt="logo" />
        </Link>
        <Links setQuizArray={setQuizArray} setScore={setScore} />
      </div>
      <div
        className="search-container"
        onClick={handleSearchToggle}
        ref={searchContainerRef}
      >
        <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>
        <div className={searchToggle === false ? "hidden" : "search-view"}>
          <SearchBar
            searchArr={searchArr}
            placeholderText={"Search for a user"}
            handleSelect={handleSelectedUser}
            displayKey="username"
            iconKey="avatar_url"
            searchKeys={["username"]}
          />
        </div>
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
