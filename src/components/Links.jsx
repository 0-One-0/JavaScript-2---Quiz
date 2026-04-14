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
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          {" "}
          <g clipPath="url(#clip0_429_11066)">
            {" "}
            <path
              className="Ham-Menu"
              d="M3 6.00092H21M3 12.0009H21M3 18.0009H21"
              stroke="#fffafa"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
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
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
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
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>{" "}
          </g>{" "}
        </g>
      </svg>
      <ul className="link-list-big">
        <li>
          <Link to="/">Dashboard </Link>
        </li>

        <li>
          <Link to="/Quiz">Quiz</Link>
        </li>

        <li>
          <Link to="/">How to play</Link>
        </li>
      </ul>
      <PopUpMenu show={show} setShow={setShow} />
    </>
  );
}

function PopUpMenu() {
  return (
    <div className="popup-menu">
      <ul className="link-list-small">
        <li>
          <Link to="/">
            <img
              className="menu-logos"
              id="dashboard-logo"
              src="src\assets\dashboard-logo.png"
              alt="Dashboard"
            />
            Dashboard
          </Link>
        </li>

        <li>
          <Link to="/Quiz">
            {" "}
            <img
              className="menu-logos"
              src="src\assets\Quiz-logo.png"
              alt="Quiz"
            />
            Quiz
          </Link>
        </li>

        <li>
          <Link to="/">
            <img
              className="menu-logos"
              src="src\assets\howto-logo.png"
              alt="How to"
            />
            How to play
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Links;
