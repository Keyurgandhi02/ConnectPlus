import React, { useRef } from "react";
import db from "../../Auth/Firbase";
import { useAuth } from "../../Store/AuthContext";
import "./Contact.css";

function Contact() {
  const { currentUser } = useAuth();
  const nameRef = useRef();
  const emailRef = useRef();
  const messageRef = useRef();
  let success = false;
  const submitContactFormHandler = (e) => {
    e.preventDefault();
    success = true;
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const message = messageRef.current.value;
    if (success) {
      try {
        const collectionRef = db.collection("contact");
        collectionRef.add({
          user: currentUser.email,
          name: name,
          email: email,
          message: message,
        });
      } catch {
        alert("Something went wrong!");
      }
    }
    nameRef.current.value = "";
    emailRef.current.value = "";
    messageRef.current.value = "";
    success = false;
  };
  return (
    <div className="contactcontainer">
      <form className="contactform" onSubmit={submitContactFormHandler}>
        <center>
          {" "}
          <h2>Conatct Us</h2>
        </center>
        <ul className="contactunorderlist">
          <li className="contactlist">
            <label htmlFor="name" className="contactlabel">
              <span className="contactspan">
                Name <span className="required-star">*</span>
              </span>
            </label>
            <input
              type="text"
              id="name"
              ref={nameRef}
              name="user_name"
              className="contactinput"
              required
            />
          </li>
          <li className="contactlist">
            <label htmlFor="mail" className="contactlabel">
              <span className="contactspan">
                Email <span className="required-star">*</span>
              </span>
            </label>
            <input
              type="email"
              ref={emailRef}
              id="mail"
              name="user_email"
              className="contactinput"
              required
            />
          </li>
          <li className="contactlist">
            <label htmlFor="msg" className="contactlabel">
              <span className="contactspan">Message</span>
            </label>
            <textarea
              required
              rows="4"
              cols="50"
              className="contacttextarea"
              ref={messageRef}
            ></textarea>
          </li>
          <li className="contactlist">
            <button type="submit" className="contactinput">
              Submit
            </button>
          </li>
        </ul>
      </form>
    </div>
  );
}

export default Contact;
