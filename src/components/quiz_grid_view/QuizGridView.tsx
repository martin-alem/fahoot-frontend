import { ClockIcon, GlobeAltIcon, LightBulbIcon, PencilIcon, PlayIcon } from '@heroicons/react/24/outline';
import Button from '../button/Button';
import { IQuizProps } from '../../utils/types';
import { Link, useNavigate } from 'react-router-dom';
import Avatar from '../avatar/Avatar';
import { RootState } from '../../store';
import { useSelector } from 'react-redux';
import { formatDistanceToNow } from 'date-fns';
import { QuizStatus } from '../../utils/constant';

const QuizGridView: React.FC<IQuizProps> = ({ quiz }) => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.authUser.user);
  return (
    <>
      <div className="w-full col-span-1 flex flex-col shadow-lg rounded-md">
        <div className={`relative h-48 ${quiz.settings.colorLabel}`}>
          {quiz.status === QuizStatus.PUBLISHED ? (
            <GlobeAltIcon className="absolute  w-6 text-white top-2 left-2" />
          ) : (
            <LightBulbIcon className="absolute  w-6 text-white top-2 left-2" />
          )}
          <div className="absolute bottom-4 left-4 rounded-md p-2 shadow-md bg-white">
            <h2 className="font-bold text-secondary-500 w-full flex gap-2">
              <ClockIcon className="w-6" />
              {` ${formatDistanceToNow(new Date(quiz.updatedAt), { addSuffix: true })}`}
            </h2>
          </div>
        </div>
        <div className="flex-grow space-y-4 bg-white p-4">
          <div className="flex justify-between items-center">
            <h1 className="w-60 text-secondary-500 text-xl md:text-2xl font-bold capitalize truncate">
              {quiz.title}
            </h1>
            <Link to="/editor">
              <PencilIcon className="w-6 cursor-pointer" />
            </Link>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex justify-center gap-2 items-center">
              <Avatar
                height="h-10"
                width="w-10"
                src={user?.avatarUrl ?? undefined}
                alt={user?.lastName ?? ''}
              />
            </div>
            <div>
              <Button
                label="Start"
                type="primary"
                disabled={quiz.status === QuizStatus.DRAFT}
                suffixIcon={<PlayIcon className="w-8" />}
                handleClick={() => navigate('/lobby')}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuizGridView;
