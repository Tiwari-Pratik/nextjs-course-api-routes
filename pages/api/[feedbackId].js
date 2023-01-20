import { buildFilePath, buildFilepath, extractFeedback } from "./feedback";

const handler = (req, res) => {
  const feedbackId = req.query.feedbackId;
  const filePath = buildFilePath();
  const feedbackdata = extractFeedback(filePath);
  const selectedFeedback = feedbackdata.find(
    (feedback) => feedback.id === feedbackId
  );
  res.status(200).json({ feedback: selectedFeedback });
};

export default handler;
