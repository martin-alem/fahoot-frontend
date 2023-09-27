import { ClockIcon, DocumentTextIcon, GlobeAltIcon, LightBulbIcon, PencilIcon, PlayIcon } from '@heroicons/react/24/outline';
import Button from '../button/Button';
import { IQuizProps } from '../../utils/types';
import { Link, useNavigate } from 'react-router-dom';
import { RootState } from '../../store';
import { useSelector } from 'react-redux';
import Avatar from '../avatar/Avatar';
import { formatDistanceToNow } from 'date-fns';
import { QuizStatus } from '../../utils/constant';

const QuizListView: React.FC<IQuizProps> = ({ quiz }) => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.authUser.user);
  return (
    <>
      <div className="w-full flex shadow-lg rounded-md">
        <div className={`relative w-1/5 ${quiz.settings.colorLabel}`}>
          {quiz.status === QuizStatus.PUBLISHED ? (
            <GlobeAltIcon className="absolute  w-6 text-white top-2 left-2" />
          ) : (
            <LightBulbIcon className="absolute  w-6 text-white top-2 left-2" />
          )}
        </div>
        <div className="flex-grow space-y-16 bg-white p-4">
          <div className="flex justify-between items-center">
            <h1 className="w-80 truncate text-secondary-500 text-xl md:text-3xl font-bold capitalize">
              {quiz.title}
            </h1>
            <Link to={`/editor/${quiz._id}`}>
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
              <h3 className="w-48 font-bold capitalize truncate">
                {user?.firstName} {user?.lastName}
              </h3>
            </div>
            <h2 className="font-bold flex gap-2">
              <ClockIcon className="w-6" />
              {`${formatDistanceToNow(new Date(quiz.updatedAt), { addSuffix: true })}`}
            </h2>
            <h2 className="font-bold flex gap-2">
              <DocumentTextIcon className="w-6" />
              {`${quiz.questions.length}`}
            </h2>
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

export default QuizListView;
