import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

function Profile() {
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  async function fetchUser() {
    setErrorMessage("");

    const { data, error } = await supabase.auth.getUser();

    if (error) {
      setErrorMessage(error.message);
      setIsLoading(false);
      return;
    }

    setUser(data.user);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchUser();
  }, []);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (errorMessage) {
    return <h1>{errorMessage}</h1>;
  }

  if (!user) {
    return <h1>No user found</h1>;
  }

  return (
    <div>
      <h1>My Profile</h1>
      <p>Name: {user.user_metadata?.display_name}</p>
      <p>Email: {user.email}</p>
    </div>
  );
}

export default Profile;
