import { ChartPieIcon, ChatBubbleLeftRightIcon, ClockIcon } from "@heroicons/react/24/outline";

const questionList = [
  {
    question: "How does JavaScript Implement Object Oriented Programming?",
    points: 4567,
    time: 56,
    correct: true,
  },
  { question: "How does JavaScript Implement Object Oriented Programming?", points: 4567, time: 56, correct: true },
  { question: "How does JavaScript Implement Object Oriented Programming?", points: 4567, time: 56, correct: true },
  { question: "How does JavaScript Implement Object Oriented Programming?", points: 4567, time: 56, correct: true },
  { question: "How does JavaScript Implement Object Oriented Programming?", points: 4567, time: 56, correct: true },
  { question: "How does JavaScript Implement Object Oriented Programming?", points: 4567, time: 56, correct: true },
  { question: "How does JavaScript Implement Object Oriented Programming?", points: 4567, time: 56, correct: true },
  { question: "How does JavaScript Implement Object Oriented Programming?", points: 4567, time: 56, correct: true },
  { question: "How does JavaScript Implement Object Oriented Programming?", points: 4567, time: 56, correct: true },
];
const PlayerQuestionList: React.FC = () => {
  return (
    <>
      <div className="w-full p-6">
        <h1 className="mb-4 md:text-3xl text-2xl text-secondary-500 font-bold">Martin Alemajoh</h1>
        <div className="w-full flex flex-col gap-8 divide-y divide-gray-300 h-96 overflow-y-auto">
          {questionList.map((question, index) => {
            return (
              <div key={index} className="w-full flex flex-col gap-2">
                <h3 className="text-secondary-700 font-black">{question.question}</h3>
                <div className="w-full flex justify-between items-center">
                  <span className="w-full flex gap-2">
                    <ChartPieIcon className="w-4" />
                    {question.points}
                  </span>
                  <span className="w-full flex gap-2">
                    <ClockIcon className="w-4" />
                    {question.time}
                  </span>
                  <span className="w-full flex gap-2">
                    <ChatBubbleLeftRightIcon className="w-4" />
                    {question.correct ? "correct" : "wrong"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default PlayerQuestionList;
