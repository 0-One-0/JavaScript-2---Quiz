import "../widget.css";


function Widget({ widgetTitle, widgetSubTitle, widgetText, image, variant }) {
  return (
    // Apply variant as a CSS class to allow for different styling based on the type of widget
    <div className={`widget widget-${variant}`}>
      {/* The heading section contains the title and optional image, styled together */}
      <div className="widgetHeading"> 
        <h2 className="widgetTitle">{widgetTitle}</h2>
        {image && <img src={image} alt="widget" className="widgetImg" />}
      </div>

      {widgetSubTitle && ( // subtitle is optional, only render if provided
        <h3 className="widgetSubTitle">
          {variant === "hpSpell"
            ? `“${widgetSubTitle}”`
            : widgetSubTitle}
        </h3>
      )}

      <p className="widgetText">
        {variant === "hpSpell"
          ? `- ${widgetText}`
          : widgetText}
      </p>
    </div>
  );
}



export default Widget;