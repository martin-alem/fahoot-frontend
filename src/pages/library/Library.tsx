import { PencilIcon } from "@heroicons/react/24/outline";
import Button from "../../components/button/Button";
import useTitle from "../../hooks/useTitle";

const Library: React.FC = () => {
  useTitle("Library");
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
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">{/* Your content */}</div>
      </main>
    </>
  );
};

export default Library;
