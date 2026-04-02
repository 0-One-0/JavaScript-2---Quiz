import { useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";

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
          scale: 1.2,
          transformOrigin: "50% 50%",
          duration: 0.6,
          ease: "circ.inOut",
        });
        gsap.fromTo(".popup-menu", {
          x: -400,
          display: "none"
        }, { duration: 1, x: 0, display: "flex", ease: "power2.inOut" });
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
        gsap.fromTo(".popup-menu", {
          x: 0,

        }, { duration: 1, x: -400, display: "none", ease: "power2.inOut" });
      }
    },
    { dependencies: [show] },
  );

  return (
    <>
      <svg
        onClick={() => setShow(!show)}
        viewBox="0 -2 32 32"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"
        fill="#000000"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <g
            id="Page-1"
            stroke="none"
            stroke-width="1"
            fill="none"
            fill-rule="evenodd"
            sketch:type="MSPage"
          >
            <g
              id="Icon-Set"
              sketch:type="MSLayerGroup"
              transform="translate(-308.000000, -1037.000000)"
              fill="#ffffff"
            >
              <path
                className="Ham-Menu"
                d="M336,1063 L312,1063 C310.896,1063 310,1062.1 310,1061 C310,1059.9 310.896,1059 312,1059 L336,1059 C337.104,1059 338,1059.9 338,1061 C338,1062.1 337.104,1063 336,1063 L336,1063 Z M336,1057 L312,1057 C309.791,1057 308,1058.79 308,1061 C308,1063.21 309.791,1065 312,1065 L336,1065 C338.209,1065 340,1063.21 340,1061 C340,1058.79 338.209,1057 336,1057 L336,1057 Z M336,1053 L312,1053 C310.896,1053 310,1052.1 310,1051 C310,1049.9 310.896,1049 312,1049 L336,1049 C337.104,1049 338,1049.9 338,1051 C338,1052.1 337.104,1053 336,1053 L336,1053 Z M336,1047 L312,1047 C309.791,1047 308,1048.79 308,1051 C308,1053.21 309.791,1055 312,1055 L336,1055 C338.209,1055 340,1053.21 340,1051 C340,1048.79 338.209,1047 336,1047 L336,1047 Z M312,1039 L336,1039 C337.104,1039 338,1039.9 338,1041 C338,1042.1 337.104,1043 336,1043 L312,1043 C310.896,1043 310,1042.1 310,1041 C310,1039.9 310.896,1039 312,1039 L312,1039 Z M312,1045 L336,1045 C338.209,1045 340,1043.21 340,1041 C340,1038.79 338.209,1037 336,1037 L312,1037 C309.791,1037 308,1038.79 308,1041 C308,1043.21 309.791,1045 312,1045 L312,1045 Z"
                id="hamburger-2"
                sketch:type="MSShapeGroup"
              ></path>
            </g>
          </g>
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
        <li>
          <a href="#">Dashboard</a>
        </li>
        <li>
          <a href="#">Quiz</a>
        </li>
        <li>
          <a href="#">How to play</a>
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
          <a href="#">Dashboard</a>
        </li>
        <li>
          <a href="#">Quiz</a>
        </li>
        <li>
          <a href="#">How to play</a>
        </li>
      </ul>
    </div>
  );
}

export default Links;
