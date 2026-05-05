import "../css/widget.css";

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
          {(
            variant === "hpSpell" // For the Harry Potter Spell widget, we add quotation marks around the subtitle (the spell name) for better styling. For other widgets, just show the subtitle as is.
          ) ?
            `“${widgetSubTitle}”`
          : widgetSubTitle}
        </h3>
      )}

      <p className="widgetText">
        {(
          variant === "hpSpell" // For the Harry Potter Spell widget, we add a dash before the text to make it look like a quote, since the spell description is essentially a quote describing what the spell does. For other widgets, just show the text as is.
        ) ?
          `- ${widgetText}`
        : widgetText}
      </p>
    </div>
  );
}

export default Widget;
