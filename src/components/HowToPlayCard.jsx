function HowToPlayCard({ title, text, video, step, totalSteps, onNext }) {
  return (
    <div className="how-card">
      <h3>How to play</h3>

      <video className="how-video" autoPlay muted loop playsInline>
        <source src={video} type="video/mp4" />
      </video>

      <h2>{title}</h2>
      <p>{text}</p>

      <div className="dots">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <span
            key={index}
            className={index === step ? "dot active" : "dot"}
          />
        ))}
      </div>

      <button onClick={onNext}>
        {step === totalSteps - 1 ? "Done" : "Next"}
      </button>
    </div>
  );
}

export default HowToPlayCard;