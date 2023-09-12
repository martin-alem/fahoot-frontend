import { PresentationChartBarIcon } from "@heroicons/react/24/outline";
import SelectInput from "../../components/select_input/SelectInput";
import useTitle from "../../hooks/useTitle";
import Pagination from "../../components/pagination/Pagination";
import { Link } from "react-router-dom";

const people = [
  { name: "JavaScript Quiz", date: "Aug 12, 2023, 12:09 PM", players: 12, status: "Ready" },
  { name: "JavaScript Quiz", date: "Aug 12, 2023, 12:09 PM", players: 12, status: "Ready" },
  { name: "JavaScript Quiz", date: "Aug 12, 2023, 12:09 PM", players: 12, status: "Ready" },
  { name: "JavaScript Quiz", date: "Aug 12, 2023, 12:09 PM", players: 12, status: "Ready" },
  { name: "JavaScript Quiz", date: "Aug 12, 2023, 12:09 PM", players: 12, status: "Ready" },
];

const Report: React.FC = () => {
  useTitle("Reports");
  return (
    <>
      <header className="bg-white shadow-sm h-[82px]">
        <div className="flex items-center h-full mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold leading-6 text-gray-900">Report</h1>
        </div>
      </header>

      <div className="mx-auto max-w-7xl py-6 px-4 md:px-8">
        <div className="md:w-1/4 w-full">
          <SelectInput />
        </div>
        <div className="mt-8 flow-root">
          <div className=" overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                        Name
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Date
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Number of players
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Status
                      </th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {people.map((person, index) => (
                      <tr key={index}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 underline sm:pl-6">
                          <Link to={`${index}`}>{person.name}</Link>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.date}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.players}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-green-500">{person.status}</td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <Link to="/podium">
                            <PresentationChartBarIcon className="w-5 text-primary-500 cursor-pointer" />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <Pagination />
      </div>
    </>
  );
};

export default Report;
