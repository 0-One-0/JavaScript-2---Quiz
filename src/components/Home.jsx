import { useGSAP } from "@gsap/react";
import { FrontHeader } from "./FrontHeader";
import { FrontPageDaily } from "./FrontPageDaily";
import RandomQuizContainer from "./FrontQuizContainer";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, SplitText);

export function Home({ setCategory }) {
  let title1 = "Daily inspiration";
  let content1 = (
    <p className="daily-content">
      "We must form a union.
      <br /> We must unify"
    </p>
  );
  let title2 = "Daily Score";
  let content2 = <p className="daily-content">420 points</p>;

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(".think-img", {
          y: -8,
          duration: 4,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });

        gsap.to(".random-btn", {
          boxShadow: "0 0 20px 6px rgba(199, 84, 160, 0.6)",
          duration: 2,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      },
    });
    let split = SplitText.create(".page-title", {
      type: "chars",
    });
    let splitQuote = SplitText.create(".quote", {
      type: "words",
    });
    gsap.set(".flex-div, .header-div, .daily-div , .random-container", {
      opacity: 0,
    });
    gsap.set(".header-div, .daily-div , .random-container", {
      scale: 0,
      y: 150,
      xPercent: "random([-50,50])",
    });
    gsap.set(".page-title", {
      y: 200,
    });

    tl.from(split.chars, {
      yPercent: "random([-50,50])",
      rotate: -30,
      opacity: 0,
      repeat: 2,
      repeatDelay: 1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: {
        amount: 0.5,
        from: "random",
      },
    })
      .to(".page-title", {
        y: 0,
        duration: 1.8,
        ease: "bounce.in",
      })
      .to(".flex-div", {
        opacity: 1,
      })
      .to(".header-div", {
        scale: 1,
        opacity: 1,
        y: 0,
        xPercent: 0,
        ease: "power2.inOut",
        duration: 1,
      })
      .from(splitQuote.words, {
        opacity: 0,

        stagger: {
          each: 0.1,
          amount: 2,
        },
        ease: "power2.out",
      })
      .from(".quote-auth", {
        opacity: 0,
        direction: 2,
        ease: "power2.out",
      })
      .to(".daily-div, .random-container", {
        scale: 1,
        opacity: 1,
        y: 0,
        xPercent: 0,
        ease: "power2.inOut",
        duration: 1,
        stagger: {
          each: 0.4,
        },
      })
      .to(".page-title", {
        scale: 0,
        opacity: 0,
        y: -100,
        height: 0,
        margin: 0,
        display: "none",
        duration: 1,
        ease: "power3.inOut",
      });
  }, []);
  return (
    <>
      <h1 className="page-title">
        Fl<span className="text-blue">o</span>wly
      </h1>
      <div className="flex-div">
        <FrontHeader />
        <div className="daily-continer">
          <FrontPageDaily title={title1} content={content1} />
          <FrontPageDaily title={title2} content={content2} />
        </div>

        <RandomQuizContainer setCategory={setCategory} />
      </div>
    </>
  );
}
