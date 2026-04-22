export function FrontPageDaily({title, content}){
    return<>
    <div className="daily-div">
        <h3 className="daily-title">{title}</h3>
        {content}
        <div className="spacer-div"></div>
    </div>
    </>
}