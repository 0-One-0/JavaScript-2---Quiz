import { useGSAP } from "@gsap/react";
import { FrontHeader } from "./FrontHeader";
import { FrontPageDaily } from "./FrontPageDaily";
import RandomQuizContainer from "./FrontQuizContainer";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { useEffect, useState } from "react";
import { fetchKanyeQuote } from "../lib/kanyeQuote";

gsap.registerPlugin(useGSAP, SplitText);

export function Home({ setCategory }) {
  const [loadingInspo, setLoadingInspo] = useState(true);
  const [inspo, setInspo] = useState("");
  const [inspoError, setInspoError] = useState("");
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
  // let content1 = (
  //   <p className="daily-content">
  //     "We must form a union.
  //     <br /> We must unify"
  //   </p>
  // );
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

          tl2 //make sure we set the elements before we animate
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
              duration: 0.2,
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
              duration: 0.2,
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
        duration: 1.5,
        ease: "bounce.in",
      })
      .to(".flex-div", {
        opacity: 1,
        duration: 0.02,
      })
      .to(".header-div", {
        scale: 1,
        opacity: 1,
        y: 0,
        xPercent: 0,
        ease: "power2.inOut",
        duration: 0.5,
      })
      .from(splitQuote.words, {
        opacity: 0,

        stagger: {
          each: 0.1,
          amount: 0.5,
        },
        ease: "power2.out",
      })
      .from(".quote-auth", {
        opacity: 0,
        direction: 1,
        ease: "power2.out",
      })
      .to(".daily-div, .random-container", {
        scale: 1,
        opacity: 1,
        y: 0,
        xPercent: 0,
        ease: "power2.inOut",
        duration: 0.5,
        stagger: {
          each: 0.04,
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

  const loadDailyInspo = async () => {
    // Function to call Kanye Quote
    try {
      setLoadingInspo(true); // Set loading to true before starting fetch
      setInspoError(""); // Clear any previous error messages before starting new fetch

      const quote = await fetchKanyeQuote(); // Call the function that fetches the Kanye quote from the API
      setInspo(quote); // Store the fetched quote in state to display it in the UI
    } catch (err) {
      // If an error occurs during fetch, catch it and set an error message in state to display in the UI
      setInspoError("Could not load Kanye quote. Please try again later.");
    } finally {
      // Finally block runs after try/catch
      setLoadingInspo(false); // Set loading to false after fetch is complete
    }
  };

  useEffect(() => {
    loadDailyInspo();
  }, []);

  return (
    <>
      <h1 className="page-title">
        Fl<span className="text-blue">o</span>wly
      </h1>
      <div className="flex-div">
        <FrontHeader />
        <div className="daily-continer">
          <FrontPageDaily
            title={title1}
            content={
              loadingInspo ? (
                <p className="daily-content">Loading...</p>
              ) : inspoError ? (
                <p className="daily-content">{inspoError}</p>
              ) : (
                <p className="daily-content"> " {inspo} "</p>
              )
            }
          />
          <FrontPageDaily title={title2} content={content2} />
        </div>

        <RandomQuizContainer setCategory={setCategory} />
      </div>
    </>
  );
}
