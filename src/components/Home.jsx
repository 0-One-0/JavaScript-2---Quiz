import { useGSAP } from "@gsap/react";
import { FrontHeader } from "./FrontHeader";
import { FrontPageDaily } from "./FrontPageDaily";
import RandomQuizContainer from "./FrontQuizContainer";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, SplitText);

export function Home({ setCategory }) {
  //values from CSS mediaquery to only do the changes when we want.
  function mediaCss() {
    gsap.set(".flex-div", {
      display: "grid",
      gridTemplateColumns: "2fr 1fr",
      gridTemplateRows: "auto auto",
      gap: "1.5rem",
      rowGap: "3rem",
      alignItems: "start",
      boxSizing: "border-box",
      width: "760px",
      marginTop: "4rem",
    });
    gsap.set(".random-container", {
      gridColumn: "1 / -1",
      alignItems: "center",
      maxWidth: "100rem",
      width: "30rem",
      height: "10rem",
      justifyContent: "center",
      justifySelf: "center",
    });
    gsap.set(".random-btn", {
      width: "20rem",
      height: "5rem",
      alignItems: "center",
      fontSize: "20px",
      fontWeight: 700,
    });
    gsap.set(".daily-continer", {
      flexDirection: "column",
    });
  }
  //Reverts Css on leaving the params
  function revertMedia() {
    gsap.set(".flex-div", { clearProps: "all" });
    gsap.set(".random-container", { clearProps: "all" });
    gsap.set(".random-btn", { clearProps: "all" });
    gsap.set(".daily-continer", { clearProps: "all" });
  }

  //Temp values for veribals real values added later.
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
        //Animate hover on statue
        gsap.to(".think-img", {
          y: -8,
          duration: 4,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
        //Animate glow on button
        gsap.to(".random-btn", {
          boxShadow: "0 0 20px 6px rgba(199, 84, 160, 0.6)",
          duration: 2,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
        let mm = gsap.matchMedia();

        mm.add("(min-width: 768px)", () => {
          const tl2 = gsap.timeline();

          tl2 //make sure we se the elements before we animate
            .set(".header-div, .daily-div, .random-container", {
              scale: 1,
              opacity: 1,
              y: 0,
              xPercent: 0,
            })
            //Aminate the elements away
            .to(".header-div, .daily-div, .random-container", {
              y: 50,
              xPercent: "random([-50,50])",
              scale: 0,
              opacity: 0,
              ease: "power2.inOut",
              stagger: {
                each: 0.04,
                from: "start",
              },
              duration: 0.6,
            })
            .call(mediaCss) //Call function that changes properties when we cant see the elemnts
            //Show elemenets
            .to(".header-div, .daily-div, .random-container", {
              scale: 1,
              opacity: 1,
              y: 0,
              xPercent: 0,
              ease: "power2.inOut",
              stagger: {
                each: 0.04,
                from: "start",
              },
              duration: 0.6,
            });
          //happens when we go under the 768px
          return () => {
            // Kill any progess in the timeline
            tl2.kill();

            // Revert mediaCss changes
            revertMedia();

            //Sets the popertys so that we can animate them out.
            gsap.set(".header-div, .daily-div, .random-container", {
              scale: 0,
              opacity: 0,
              y: 50,
            });

            // Animate back smoothly and then clear all props from this set.
            gsap.to(".header-div, .daily-div, .random-container", {
              scale: 1,
              opacity: 1,
              y: 0,
              xPercent: 0,
              ease: "power2.inOut",
              duration: 0.4,
              clearProps: "scale,opacity,y,xPercent",
              onComplete: () => {
                gsap.set(".header-div, .daily-div, .random-container", {
                  clearProps: "all",
                });
              },
            });
          };
        });
      },
    });

    //Split text for aminatons on chars or words
    let split = SplitText.create(".page-title", {
      type: "chars",
    });
    let splitQuote = SplitText.create(".quote", {
      type: "words",
    });

    //Sets values before animation
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


    //timeline starts here and animations happens after oneanother
    //This animation creates a "loading" aniamtion without loading.
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
