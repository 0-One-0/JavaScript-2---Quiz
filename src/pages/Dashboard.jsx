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
import avatar1 from "../assets/profile-woman.png";
import avatar2 from "../assets/profile-man.png";

// Mock data for Scoreboard Widget - for now
const players = [
  { id: 1, rank: 1, name: "Johan", score: 980, avatar: avatar1 },
  { id: 2, rank: 2, name: "Anna", score: 920, avatar: avatar2 },
  { id: 3, rank: 3, name: "Svante", score: 870, avatar: avatar2 },
  { id: 4, rank: 4, name: "Gunilla", score: 860, avatar: avatar1 },
  { id: 5, rank: 8, name: "Me", score: 610, avatar: avatar1 },
];

function Dashboard() {
  // Kanye Quote State
  const [kanyeQuote, setKanyeQuote] = useState(""); // Store the fetched Kanye quote
  const [kanyeLoading, setKanyeLoading] = useState(true); // When data is being fetched, set to true to show loading state in UI
  const [kanyeError, setKanyeError] = useState(""); // If error occurs during fetch, store error message here

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

  // Kanye Quote Widget
  const loadQuote = async () => { // Function to call Kanye Quote
    try {
      setKanyeLoading(true); // Set loading to true before starting fetch
      setKanyeError(""); // Clear any previous error messages before starting new fetch

      const quote = await fetchKanyeQuote(); // Call the function that fetches the Kanye quote from the API
      setKanyeQuote(quote); // Store the fetched quote in state to display it in the UI
    } catch (err) { // If an error occurs during fetch, catch it and set an error message in state to display in the UI
      setKanyeError("Could not load Kanye quote. Please try again later.");
    } finally { // Finally block runs after try/catch
      setKanyeLoading(false); // Set loading to false after fetch is complete
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

  // Load all widgets on component mount
  useEffect(() => {
    loadQuote();
    loadFact();
    loadSpell();
    loadJoke();
    loadTitan();
    loadCat();
  }, []);

  return (
    <div className="dashboard">
      <div className="dashboard-item dashboard-item-small">
        <Widget // Kanye Quote Widget
          widgetTitle="Random Kanye Quote" // Title of the widget
          widgetText={ // The main content of the widget, which will show the quote or loading/error message
            kanyeLoading
              ? "Loading..."
              : kanyeError
              ? kanyeError
              : kanyeQuote
          }
          image={kanyeImg} // Image of the widget
          variant="kanye" // Variant prop to allow for specific styling based on the type of widget
        />
      </div>

      <div className="dashboard-item dashboard-item-small">
        <Widget // Useless Fact Widget
          widgetTitle="Today's Useless Fact"
          widgetText={
            factLoading
              ? "Loading..."
              : factError
              ? factError
              : uselessFact
          }
          image={lightBulb}
          variant="uselessFact"
        />
      </div>

      <div className="dashboard-item dashboard-item-small">
        <Widget // Harry Potter Spell Widget
          widgetTitle="Harry Potter Spell"
          widgetSubTitle={spellLoading || spellError ? "" : spellTitle} // Subtitle is optional, only show if spell is loaded successfully
          widgetText={
            spellLoading
              ? "Loading..."
              : spellError
              ? spellError
              : spellText
          }
          image={hpImg}
          variant="hpSpell"
        />
      </div>

      <div className="dashboard-item dashboard-item-small">
        <Widget
          widgetTitle="Random Joke"
          widgetSubTitle={
            jokeLoading
              ? "Loading..."
              : jokeError
              ? ""
              : jokeSetup
          }
          widgetText={
            jokeLoading
              ? "Loading..."
              : jokeError
              ? jokeError
              : jokePunchline
          }
          image={jokeImg}
          variant="joke"
        />
      </div>

      <div className="dashboard-item dashboard-item-large">
        <Widget // Attack on Titan Widget
          widgetTitle="Random titan from Attack on Titan"
          widgetText={
            titanLoading
              ? "Loading..."
              : titanError
              ? titanError
              : titanTitle
          }
          image={titanImage}
          variant="aot"
        />
      </div>

      <div className="dashboard-item dashboard-item-large">
        <Widget // Random Cat Image Widget
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
        <ScoreboardWidget  // Scoreboard Widget
          title="Scoreboard"
          players={players}
          currentUserId={5}
        />
      </div>
    </div>
  );
}

export default Dashboard;