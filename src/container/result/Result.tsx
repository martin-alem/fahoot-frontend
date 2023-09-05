import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Button from "../../components/button/Button";
import LeaderBoard from "../../components/leader_board/LeaderBoard";
import PlaySummary from "../../components/play_summary/PlaySummary";
import StatusCircle from "../../components/status_circle/StatusCircle";

const Result: React.FC = () => {
  return (
    <>
      <div className="flex justify-end">
        <div>
          <Button type="primary" label="Next" suffixIcon={<ChevronRightIcon className="w-6" />} />
        </div>
      </div>
      <div className="mx-auto mt-4 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl flex justify-center">
          <StatusCircle status={false} />
        </div>
        <div className="mt-4 mx-auto max-w-4xl">
          <h1 className="mb-2 text-3xl font-bold">Leadership board</h1>
          <LeaderBoard />
          <div className="mt-4">
            <PlaySummary />
          </div>
        </div>
      </div>
    </>
  );
};

export default Result;
