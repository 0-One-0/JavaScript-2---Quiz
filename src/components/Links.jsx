import { useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { Link } from "react-router-dom";

gsap.registerPlugin(useGSAP, MorphSVGPlugin);

function Links() {
  const [show, setShow] = useState(false);
  useGSAP(
    () => {
      if (show) {
        gsap.to(".Ham-Menu", {
          opacity: 0,
          display: "none",
          rotation: 360,
          transformOrigin: "50% 50%",
          duration: 0.6,

          scale: 0.1,
          ease: "circ.inOut",
        });
        gsap.to(".close-svg", {
          opacity: 1,
          display: "flex",
          rotation: 0,
          scale: 1.8,
          transformOrigin: "50% 50%",
          duration: 0.6,
          ease: "circ.inOut",
        });
        gsap.fromTo(
          ".popup-menu",
          {
            display: "none",
            opacity: 0.7,
          },
          {
            duration: 0.8,
            x: 0,
            display: "flex",
            ease: "power2.inOut",
            opacity: 1,
          },
        );
      } else {
        gsap.to(".Ham-Menu", {
          display: "flex",
          opacity: 1,
          rotation: 0,
          duration: 0.8,
          transformOrigin: "50% 50%",

          scale: 1,
          ease: "circ.inOut",
        });
        gsap.to(".close-svg", {
          opacity: 0,
          display: "none",
          rotation: -360,
          duration: 0.6,
          scale: 0,
          transformOrigin: "50% 50%",
          ease: "circ.inOut",
        });
        gsap.to(".popup-menu", {
          duration: 0.8,
          x: -800,
          display: "none",
          ease: "power2.inOut",
          opacity: 0.2,
        });
      }
    },
    { dependencies: [show] },
  );

  return (
    <>
      <svg
        id="hamburger"
        onClick={() => setShow(!show)}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          {" "}
          <g clip-path="url(#clip0_429_11066)">
            {" "}
            <path
              className="Ham-Menu"
              d="M3 6.00092H21M3 12.0009H21M3 18.0009H21"
              stroke="#fffafa"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>{" "}
          </g>{" "}
          <defs>
            {" "}
            <clipPath id="clip0_429_11066">
              {" "}
              <rect
                width="24"
                height="24"
                fill="white"
                transform="translate(0 0.000915527)"
              ></rect>{" "}
            </clipPath>{" "}
          </defs>{" "}
        </g>
      </svg>

      <svg
        onClick={() => setShow(!show)}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          {" "}
          <g id="Menu / Close_SM">
            {" "}
            <path
              className="close-svg"
              style={{ display: "none" }}
              id="Vector"
              d="M16 16L12 12M12 12L8 8M12 12L16 8M12 12L8 16"
              stroke="#ffffff"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>{" "}
          </g>{" "}
        </g>
      </svg>
      <ul className="link-list-big">
        <Link to="/">
          <li>
            Dashboard
          </li>
        </Link>
        <Link to="/">
          <li>
            Quiz
          </li>
        </Link>
        <Link to="/">
          <li>
            How to play
          </li>
        </Link>
      </ul>
      <PopUpMenu show={show} setShow={setShow} />
    </>
  );
}

function PopUpMenu() {
  return (
    <div className="popup-menu">
      <ul className="link-list-small">
        <Link to="/">
          <li>
            <a href="#">
              {" "}
              <img
                className="menu-logos"
                id="dashboard-logo"
                src="src\assets\dashboard-logo.png"
                alt="Dashboard"
              />
              Dashboard
            </a>
          </li>
        </Link>
        <Link to="/">
          <li>
            <a href="#">
              {" "}
              <img
                className="menu-logos"
                src="src\assets\Quiz-logo.png"
                alt="Quiz"
              />
              Quiz
            </a>
          </li>
        </Link>
        <Link to="/">
          <li>
            <a href="#">
              <img
                className="menu-logos"
                src="src\assets\howto-logo.png"
                alt="How to"
              />
              How to play
            </a>
          </li>
        </Link>
      </ul>
    </div>
  );
}

export default Links;
