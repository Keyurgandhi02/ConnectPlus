import "./Card.css";
const Card = () => {
  return (
    <>
      <div className="support-grid"></div>
      <div className="band">
        <div className="item-7">
          <a
            href="https://webdesign.tutsplus.com/articles/notes-from-behind-the-firewall-the-state-of-web-design-in-china--cms-22281"
            className="card"
          >
            <div
              className="thumb"
              style={{
                backgroundImage:
                  " url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/flex-1.jpg)",
              }}
            ></div>
            <article>
              <h1>
                Notes From Behind the Firewall: The State of Web Design in China
              </h1>
              <span>Kendra Schaefer</span>
            </article>
          </a>
        </div>
      </div>
    </>
  );
};

export default Card;
