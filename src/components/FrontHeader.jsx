import think from "../assets/thinking.png";
export function FrontHeader() {
  return (
    <>
      <div className="header-div">
        <p className="quote">
          The important thing is<br/> not to stop{" "}
          <span className="text-blue">questioning</span>.<br/> 
          <span className="text-blue">Curiosity</span> has its own<br/> {" "}
          reason for existing
        </p>
        <p className="quote-auth">— Albert Einstein</p>
        <img className="think-img" src={think} alt="statue thinking" />
      </div>
    </>
  );
}
