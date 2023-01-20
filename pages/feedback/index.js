import { buildFilePath, extractFeedback } from "../api/feedback";
import { Fragment, useState } from "react";

const FeedbackPage = (props) => {
  const [feedbackdata, setFeedbackdata] = useState();

  const loadFeedbackHandler = (id) => {
    fetch(`/api/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFeedbackdata(data.feedback);
      });
  };
  return (
    <Fragment>
      {feedbackdata && <p>{feedbackdata.email}</p>}
      <ul>
        {props.feedbackItems.map((item) => (
          <li key={item.id}>
            {item.text}
            <button onClick={loadFeedbackHandler.bind(null, item.id)}>
              Show Details
            </button>
          </li>
        ))}
      </ul>
    </Fragment>
  );
};

export const getStaticProps = async () => {
  const filePath = buildFilePath();
  const data = extractFeedback(filePath);
  return {
    props: {
      feedbackItems: data,
    },
  };
};
export default FeedbackPage;
