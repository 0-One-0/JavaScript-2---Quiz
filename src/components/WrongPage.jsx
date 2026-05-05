import { useNavigate } from "react-router-dom";
import "../css/wrong-page.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function WrongPage() {
  const navigate = useNavigate();
  function handleClick() {
    navigate("/");
  }

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(".zero-animate", {
          yoyo: true,
          repeat: -1,
          repeatDelay: 0.5,
          color: "#FF0F0F",
          ease: "expo.inOut",
          duration: 1,
        });
        gsap.to(".notfound-title", {
          y: -12,
          duration: 1.5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
        gsap.to(".retun-btn", {
          y: -2,
          duration: 1.5,
          scale: 1.1,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      },
    });

    tl.from(".notfound-title, .notfound-desq, .retun-btn", {
      opacity: 0,
      scale: 0,
      y: 100,
      ease: "power3.inOut",
      xPercent: "random([-50,50])",
      stagger: {
        each: 0.4,
      },
    });
  }, []);

  return (
    <>
      <section className="notfound-section">
        <div className="notfound-continer">
          <h1 className="notfound-title">
            4<span className="zero-animate">0</span>4
          </h1>
          <h2 className="notfound-desq">Page not found</h2>
          <button className="retun-btn" onClick={handleClick}>
            Go Home
          </button>
        </div>
      </section>
    </>
  );
}
export default WrongPage;
