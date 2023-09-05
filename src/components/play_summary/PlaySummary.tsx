import Bar from "../bar/Bar";

const options = [
  {
    color: "bg-blue-600",
    total: 150,
    correct: true,
  },

  {
    color: "bg-red-600",
    total: 120,
    correct: false, 
  },

  {
    color: "bg-green-600",
    total: 86,
    correct: false,
  },
  {
    color: "bg-yellow-600",
    total: 250,
    correct: false,
  },
];

const PlaySummary: React.FC = () => {
  return (
    <>
      <div className="w-full flex gap-4 justify-center items-end">
        {options.map((option) => (
          <Bar bgColor={option.color} score={option.total} status={option.correct} />
        ))}
      </div>
    </>
  );
};

export default PlaySummary;
