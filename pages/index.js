import { useRef, useState } from "react";

function HomePage() {
  const [feedbackItems, setFeedBackItems] = useState([]);
  const emailInputRef = useRef();
  const feedbackInputRef = useRef();
  const submitFormHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredFeedback = feedbackInputRef.current.value;

    fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        text: enteredFeedback,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  const loadFeedbackHandler = () => {
    fetch("/api/feedback")
      .then((res) => res.json())
      .then((data) => setFeedBackItems(data.feedback));
  };
  return (
    <div>
      <h1>The Home Page</h1>
      <form onSubmit={submitFormHandler}>
        <div>
          <label htmlFor="email">Your Email Address</label>
          <input type="email" id="email" ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor="feedback">Your Feedback</label>
          <textarea id="feedback" rows="5" ref={feedbackInputRef}></textarea>
        </div>
        <button>Submit Feedback</button>
      </form>
      <hr />
      <button onClick={loadFeedbackHandler}>Load Feedback</button>
      <ul>
        {feedbackItems.map((item) => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
