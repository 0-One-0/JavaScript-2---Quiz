import { Home } from "../components/Home";
import "../front-page.css";


function FrontPage({ setCategory }) {
  return <>
  <section className="front-page-section">
  <Home setCategory={setCategory}/>
  </section>
  </>
}

export default FrontPage;
