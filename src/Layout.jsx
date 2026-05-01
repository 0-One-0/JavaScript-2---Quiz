import NavBar from "./components/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";

{
  /* Layout determines how the page will be structured. Outlet renders all route components that are children to the route Layout is in */
}
function Layout({setQuizArray, setScore}) {
  return (
    <>
      <NavBar setQuizArray={setQuizArray} setScore={setScore} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Layout;
