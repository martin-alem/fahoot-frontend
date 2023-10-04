const AnswerCount: React.FC = () => {
  return (
    <div className="relative w-full flex flex-col gap-4 justify-center items-center">
      <div className="w-32 h-32 bg-primary-500 rounded-full flex items-center justify-center">
        <span className="text-white text-5xl font-bold">0</span>
      </div>
      <div className="hidden md:block absolute -top-10 right-auto rotate-12 w-fit p-4 bg-white shadow-lg text-secondary-500">Answers</div>
    </div>
  );
};

export default AnswerCount;
