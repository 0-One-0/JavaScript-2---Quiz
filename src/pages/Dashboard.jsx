import { useEffect, useState } from "react";
import Widget from "../components/Widget";
import { fetchKanyeQuote } from "../lib/kanyeQoute";
import { fetchUselessFact } from "../lib/uselessFact";
import { fetchHpSpell } from "../lib/hpSpells";
import { fetchTitan } from "../lib/aot";
import "../dashboard.css";
import kanyeImg from "../assets/kanye.png";
import lightBulb from "../assets/light-bulb.png";
import hpImg from "../assets/harry-potter.png";

import ScoreboardWidget from "../components/ScoreboardWidget";
import avatar1 from "../assets/profile-woman.png";
import avatar2 from "../assets/profile-man.png";

const players = [
  { id: 1, rank: 1, name: "Johan", score: 980, avatar: avatar1 },
  { id: 2, rank: 2, name: "Anna", score: 920, avatar: avatar2 },
  { id: 3, rank: 3, name: "Svante", score: 870, avatar: avatar2 },
  { id: 4, rank: 4, name: "Gunilla", score: 860, avatar: avatar1 },
  { id: 5, rank: 8, name: "Me", score: 610, avatar: avatar1 },
];

function Dashboard() {
  // State for Kanye Quote Widget
  const [kanyeQoute, setKanyeQoute] = useState("");
  const [kanyeLoading, setKanyeLoading] = useState(true);
  const [kanyeError, setKanyeError] = useState("");

  // State for Useless Fact Widget
  const [uselessFact, setUselessFact] = useState("");
  const [factLoading, setFactLoading] = useState(true);
  const [factError, setFactError] = useState("");

  // State for Harry Potter Spell Widget
  const [spellTitle, setSpellTitle] = useState("");
  const [spellText, setSpellText] = useState("");
  const [spellLoading, setSpellLoading] = useState(true);
  const [spellError, setSpellError] = useState("");

  // State for Attack on Titan Widget
  const [titanTitle, setTitanTitle] = useState("");
  const [titanText, setTitanText] = useState("");
  const [titanImage, setTitanImage] = useState("");
  const [titanLoading, setTitanLoading] = useState(true);
  const [titanError, setTitanError] = useState("");

  // Kanye Quote Widget
  const loadQoute = async () => {
    try {
      setKanyeLoading(true);
      setKanyeError("");

      const quote = await fetchKanyeQuote();
      setKanyeQoute(quote);
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
      setSpellError("Could not load spell.");
    } finally {
      setSpellLoading(false);
    }
  };

  // Attack on Titan Widget
  const loadTitan = async () => {
    try {
      setTitanLoading(true);
      setTitanError("");
  
      const titan = await fetchTitan();
  
      setTitanTitle(titan.title);
      setTitanText(titan.text);
      setTitanImage(titan.image);
    } catch (err) {
      setTitanError("Could not load titan.");
    } finally {
      setTitanLoading(false);
    }
  };

  // Load all widgets on component mount
  useEffect(() => {
    loadQoute();
    loadFact();
    loadSpell();
    loadTitan();
  }, []);

  return (
    <div className="dashboard">
      <div className="dashboard-item dashboard-item-small">
        <Widget // Kanye Quote Widget
          widgetTitle="Random Kanye Quote"
          widgetText={
            kanyeLoading
              ? "Loading..."
              : kanyeError
              ? kanyeError
              : kanyeQoute
          }
          image={kanyeImg}
          variant="kanye"
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
          widgetSubTitle={spellTitle}
          widgetText={spellText}
          image={hpImg}
          variant="hpSpell"
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
        <ScoreboardWidget
          title="Scoreboard"
          players={players}
          currentUserId={5}
        />
      </div>
    </div>
  );
}

export default Dashboard;