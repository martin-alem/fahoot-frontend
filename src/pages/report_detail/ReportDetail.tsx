import { ChevronRightIcon } from "@heroicons/react/24/outline";
import useTitle from "../../hooks/useTitle";
// import Pagination from "../../components/pagination/Pagination";
import Modal from "../../components/modal/Modal";
import PlayerQuestionList from "../../components/player_question_list/PlayerQuestionList";
import { useState } from "react";
const stats = [
  { name: "Mean", value: "56" },
  { name: "Median", value: "57" },
  { name: "Mode", value: "55" },
  { name: "Standard Deviation", value: "58" },
];

const people = [
  {
    name: "Leslie Alexander",
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    points: 4567,
  },
  {
    name: "Michael Foster",
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    points: 4567,
  },
  {
    name: "Dries Vincent",
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    points: 4567,
  },
  {
    name: "Lindsay Walton",
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    points: 4567,
  },
  {
    name: "Courtney Henry",
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    points: 4567,
  },
  {
    name: "Tom Cook",
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    points: 4567,
  },
];

const people2 = [
  { question: "What is JavaScript", NoPassed: 4, NoFailed: 3, Performance: 45, Difficulty: "Medium" },
  // More people...
];
const ReportDetail: React.FC = () => {
  useTitle("Javascript Report Details");
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <header className="bg-white shadow-sm h-[82px]">
        <div className="flex items-center h-full mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold leading-6 text-secondary-500">JavaScript Report</h1>
        </div>
      </header>
      <main className="mt-8 w-full flex flex-col gap-6 p-2">
        <div className="w-full mx-auto max-w-7xl py-6 px-6 lg:px-8 bg-white shadow-md">
          <h3 className="mb-4 text-xl font-bold leading-6 text-secondary-500">Statistics</h3>
          <dl className="mx-auto grid grid-cols-1 gap-px bg-secondary-500/5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.name} className="flex flex-col items-center justify-center gap-x-4 gap-y-2 bg-secondary-500 px-4 py-10 sm:px-6 xl:px-8">
                <dt className="text-xl font-black text-white">{stat.name}</dt>
                <dd className="text-3xl font-medium leading-10 tracking-tight text-white">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <ul role="list" className="w-full divide-y divide-gray-100 bg-white shadow-md mx-auto max-w-7xl py-6 px-6 lg:px-8 cursor-pointer">
          <h3 className="mb-4 text-xl font-bold leading-6 text-secondary-500">Players</h3>
          {people.map((person, index) => (
            <li key={index} className="relative flex justify-between gap-x-6 py-5" onClick={() => setIsOpen(true)}>
              <div className="flex items-center justify-center min-w-0 gap-x-4">
                <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={person.imageUrl} alt="" />
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-secondary-500">
                    <span className="absolute inset-x-0 -top-px bottom-0" />
                    {person.name}
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-x-4">
                <div className="hidden sm:flex sm:flex-col sm:items-end">
                  <p className="mt-1 text-xl leading-5 text-secondary-500">{person.points}</p>
                </div>
                <ChevronRightIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
              </div>
            </li>
          ))}
          {/* <Pagination /> */}
        </ul>

        <div className="w-full mx-auto max-w-7xl px-6 lg:px-8 bg-white shadow-md">
          <div className="mt-8 flow-root">
            <h3 className="text-xl font-bold leading-6 text-secondary-500">Questions</h3>
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                          Question
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          No Passed
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          No Failed
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Performance
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Difficulty Level
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {people2.map((person, index) => (
                        <tr key={index}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{person.question}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.NoPassed}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.NoFailed}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.Performance}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.Difficulty}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          {/* <Pagination /> */}
        </div>
      </main>

      {/* Modal */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <PlayerQuestionList />
      </Modal>
    </>
  );
};

export default ReportDetail;
