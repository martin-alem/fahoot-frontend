import { ListBulletIcon, PencilIcon, Squares2X2Icon } from "@heroicons/react/24/outline";
import Button from "../../components/button/Button";
import useTitle from "../../hooks/useTitle";
import { useState } from "react";
import QuizGridContainer from "../../components/quiz_grid_container/QuizGridContainer";
import QuizListContainer from "../../components/quiz_list_container/QuizListContainer";
import { randomColorGenerator } from "../../utils/util";
import Pagination from "../../components/pagination/Paginaton";

const quizzes = [
  {
    name: "Javascript Quiz",
    numberOfPlays: 4,
    numberOfQuestions: 6,
    lastUpdated: "8 years ago",
    bgColor: randomColorGenerator(),
  },
  {
    name: "Javascript Quiz",
    numberOfPlays: 4,
    numberOfQuestions: 6,
    lastUpdated: "8 years ago",
    bgColor: randomColorGenerator(),
  },
  {
    name: "Javascript Quiz",
    numberOfPlays: 4,
    numberOfQuestions: 6,
    lastUpdated: "8 years ago",
    bgColor: randomColorGenerator(),
  },
  {
    name: "Javascript Quiz",
    numberOfPlays: 4,
    numberOfQuestions: 6,
    lastUpdated: "8 years ago",
    bgColor: randomColorGenerator(),
  },
];

const Library: React.FC = () => {
  useTitle("Library");
  const [view, setView] = useState("grid");
  return (
    <>
      <header className="bg-white shadow-sm">
        <div className="mx-auto flex justify-between items-center max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold leading-6 text-gray-900">Library</h1>
          <div>
            <Button type="primary" label="Create" prefixIcon={<PencilIcon className="w-6" />} />
          </div>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className="mb-4 flex flex-col space-y-6 items-center md:flex md:flex-row md:space-y-0 md:justify-between md:items-center p-2 md:p-0">
            <div className="w-full md:w-1/4 relative flex items-center">
              <input
                type="text"
                name="search"
                id="search"
                placeholder="search..."
                className="block w-full rounded-md border-0 py-1.5 pr-14 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6"
              />
              <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
                <kbd className="inline-flex items-center rounded border border-gray-200 px-1 font-sans text-xs text-gray-400">⌘K</kbd>
              </div>
            </div>

            <span className="isolate inline-flex rounded-md shadow-sm">
              <button
                onClick={() => setView("list")}
                type="button"
                className={`relative inline-flex items-center rounded-l-md ${
                  view == "list" ? "bg-gray-600 text-white hover:bg-gray-500" : "bg-white text-gray-900"
                } px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:z-10 transition-all duration-300 ease-linear`}>
                <ListBulletIcon className="w-6" />
              </button>
              <button
                onClick={() => setView("grid")}
                type="button"
                className={`relative -ml-px inline-flex items-center rounded-r-md ${
                  view == "grid" ? "bg-gray-600 text-white hover:bg-gray-500" : "bg-white text-gray-900"
                } px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:z-10 transition-all duration-300 ease-linear`}>
                <Squares2X2Icon className="w-6" />
              </button>
            </span>
          </div>
          <div className="w-full p-2 md:p-0">{view == "grid" ? <QuizGridContainer quizzes={quizzes} /> : <QuizListContainer quizzes={quizzes} />}</div>
          <div className="w-full mt-6 flex items-center">
            <Pagination />
          </div>
        </div>
      </main>
    </>
  );
};

export default Library;
