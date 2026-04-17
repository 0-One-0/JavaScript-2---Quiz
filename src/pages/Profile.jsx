import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

function Profile() {
  //State to store the logged in user
  const [user, setUser] = useState(null);

  //State to store error mesages
  const [errorMessage, setErrorMessage] = useState("");

  //State to track loading status
  const [isLoading, setIsLoading] = useState(true);

  //Function to fetch the current logged in user from Supabase
  async function fetchUser() {
    setErrorMessage("");

    //Get the user from Supabase
    const { data, error } = await supabase.auth.getUser();

    //If error = store and stop loading.
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

  //Show loading state while fetching datga
  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  //Show error message if something wen  wrong.
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
