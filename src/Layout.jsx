import NavBar from "./components/NavBar";
import { Outlet } from "react-router-dom";

{/* Layout determines how the page will be structured. Outlet renders all route components that are children to the route Layout is in */}
function Layout() {
  return (
    <>
      <NavBar/>
      <main>
        <Outlet/>
      </main>
    </>
  );
}

export default Layout;