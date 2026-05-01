import { useEffect, useState } from "react";
import Widget from "../components/Widget";
import "../dashboard.css";

import { fetchKanyeQuote } from "../lib/kanyeQuote";
import { fetchUselessFact } from "../lib/uselessFact";
import { fetchHpSpell } from "../lib/hpSpells";
import { fetchJoke } from "../lib/joke";
import { fetchTitan } from "../lib/aot";
import { fetchCat } from "../lib/cat";

import kanyeImg from "../assets/kanye.png";
import lightBulb from "../assets/light-bulb.png";
import hpImg from "../assets/harry-potter.png";
import jokeImg from "../assets/laughing-emoji.png";
import ScoreboardWidget from "../components/ScoreboardWidget";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { supabase } from "../lib/supabase";


function Dashboard() {
  // Kanye Quote State
  const [kanyeQuote, setKanyeQuote] = useState("");
  const [kanyeLoading, setKanyeLoading] = useState(true);
  const [kanyeError, setKanyeError] = useState("");

  // Useless Fact State
  const [uselessFact, setUselessFact] = useState("");
  const [factLoading, setFactLoading] = useState(true);
  const [factError, setFactError] = useState("");

  // Harry Potter Spell State
  const [spellTitle, setSpellTitle] = useState("");
  const [spellText, setSpellText] = useState("");
  const [spellLoading, setSpellLoading] = useState(true);
  const [spellError, setSpellError] = useState("");

  // Joke State
  const [jokeSetup, setJokeSetup] = useState("");
  const [jokePunchline, setJokePunchline] = useState("");
  const [jokeLoading, setJokeLoading] = useState(true);
  const [jokeError, setJokeError] = useState("");

  // Attack on Titan State
  const [titanTitle, setTitanTitle] = useState("");
  const [titanImage, setTitanImage] = useState("");
  const [titanLoading, setTitanLoading] = useState(true);
  const [titanError, setTitanError] = useState("");

  // Cat Image State
  const [catImage, setCatImage] = useState("");
  const [catLoading, setCatLoading] = useState(true);
  const [catError, setCatError] = useState("");

  // Store leaderboard players from Supabase profiles table
  const [players, setPlayers] = useState([]);

  // Store logged-in user id to highlight current user in scoreboard
  const [currentUserId, setCurrentUserId] = useState(null);

  // Kanye Quote Widget
  const loadQuote = async () => {
    try {
      setKanyeLoading(true);
      setKanyeError("");

      const quote = await fetchKanyeQuote();
      setKanyeQuote(quote);
    } catch (err) {
      setKanyeError("Could not load Kanye quote. Please try again later.");
    } finally {
      setKanyeLoading(false);
    }
  };

  // Useless Fact Widget
  const loadFact = async () => {
    try {
      setFactLoading(true);
      setFactError("");

      const fact = await fetchUselessFact();
      setUselessFact(fact);
    } catch (err) {
      setFactError("Could not load Useless Fact. Please try again later.");
    } finally {
      setFactLoading(false);
    }
  };

  // Harry Potter Spell Widget
  const loadSpell = async () => {
    try {
      setSpellLoading(true);
      setSpellError("");

      const spell = await fetchHpSpell();

      setSpellTitle(spell.title);
      setSpellText(spell.text);
    } catch (err) {
      setSpellError("Could not load spell, please try again later.");
    } finally {
      setSpellLoading(false);
    }
  };

  // Joke Widget
  const loadJoke = async () => {
    try {
      setJokeLoading(true);
      setJokeError("");

      const joke = await fetchJoke();

      setJokeSetup(joke.setup);
      setJokePunchline(joke.punchline);
    } catch (err) {
      setJokeError("Could not load joke, please try again later.");
    } finally {
      setJokeLoading(false);
    }
  };

  // Attack on Titan Widget
  const loadTitan = async () => {
    try {
      setTitanLoading(true);
      setTitanError("");

      const titan = await fetchTitan();

      setTitanTitle(titan.title);
      setTitanImage(titan.image);
    } catch (err) {
      setTitanError("Could not load titan, please try again later.");
    } finally {
      setTitanLoading(false);
    }
  };

  // Cat Image Widget
  const loadCat = async () => {
    try {
      setCatLoading(true);
      setCatError("");

      const cat = await fetchCat();
      setCatImage(cat.image);
    } catch (err) {
      setCatError("Could not load cat, please try again later.");
    } finally {
      setCatLoading(false);
    }
  };

  // Fetch leaderboard players from profiles table and format them for ScoreboardWidget
  const loadPlayers = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    setCurrentUserId(user?.id || null);

    const { data, error } = await supabase
      .from("profiles")
      .select("id, username, avatar_url, points")
      .order("points", { ascending: false });

    if (error) {
      console.log(error.message);
      return;
    }

    const formattedPlayers = data.map((profile, index) => ({
      id: profile.id,
      rank: index + 1,
      name: profile.username,
      score: profile.points ?? 0,
      avatar: profile.avatar_url,
    }));

    setPlayers(formattedPlayers);
  };

  // Load all widgets and leaderboard on component mount
  useEffect(() => {
    loadQuote();
    loadFact();
    loadSpell();
    loadJoke();
    loadTitan();
    loadCat();
    loadPlayers();
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => {
         tl.set(".dashboard", {
      overflow: "visible",
    })
      },
    });
    tl.set(".dashboard", {
      overflow: "hidden",
    }).from(".dashboard-item", {
      opacity: 0,
      autoAlpha: 0,
      yPercent: -10,
      xPercent: -10,
      stagger: {
        each: 0.2,
      },
      ease: "power3.inOut",
    });
  }, []);

  return (
    <div className="dashboard">
      <div className="dashboard-item dashboard-item-small">
        <Widget // Kanye Quote Widget
          widgetTitle="Random Kanye Quote" // Title of the widget
          widgetText={
            // The main content of the widget, which will show the quote or loading/error message
            kanyeLoading ? "Loading..." : kanyeError ? kanyeError : kanyeQuote
          }
          image={kanyeImg}
          variant="kanye"
        />
      </div>

      <div className="dashboard-item dashboard-item-small">
        <Widget
          widgetTitle="Today's Useless Fact"
          widgetText={
            factLoading ? "Loading..." : factError ? factError : uselessFact
          }
          image={lightBulb}
          variant="uselessFact"
        />
      </div>

      <div className="dashboard-item dashboard-item-small">
        <Widget
          widgetTitle="Harry Potter Spell"
          widgetSubTitle={spellLoading || spellError ? "" : spellTitle}
          widgetText={
            spellLoading ? "Loading..." : spellError ? spellError : spellText
          }
          image={hpImg}
          variant="hpSpell"
        />
      </div>

      <div className="dashboard-item dashboard-item-small">
        <Widget
          widgetTitle="Random Joke"
          widgetSubTitle={
            jokeLoading ? "Loading..." : jokeError ? "" : jokeSetup
          }
          widgetText={
            jokeLoading ? "Loading..." : jokeError ? jokeError : jokePunchline
          }
          image={jokeImg}
          variant="joke"
        />
      </div>

      <div className="dashboard-item dashboard-item-large">
        <Widget
          widgetTitle="Random titan from Attack on Titan"
          widgetText={
            titanLoading ? "Loading..." : titanError ? titanError : titanTitle
          }
          image={titanImage}
          variant="aot"
        />
      </div>

      <div className="dashboard-item dashboard-item-large">
        <Widget
          widgetTitle="Random Cat"
          widgetText={
            catLoading
              ? "Loading..."
              : catError
                ? catError
                : "Enjoy this random cat"
          }
          image={catImage}
          variant="cat"
        />
      </div>

      <div className="dashboard-item dashboard-item-large">
        <ScoreboardWidget // Scoreboard Widget
          title="Scoreboard"
          players={players}
          currentUserId={currentUserId}
        />
      </div>
    </div>
  );
}

export default Dashboard;
