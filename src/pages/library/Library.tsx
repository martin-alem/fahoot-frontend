/* eslint-disable react-hooks/exhaustive-deps */
import { DocumentPlusIcon, ListBulletIcon, PencilIcon, Squares2X2Icon } from '@heroicons/react/24/outline';
import Button from '../../components/button/Button';
import useTitle from '../../hooks/useTitle';
import { useEffect, useState } from 'react';
import QuizGridContainer from '../../components/quiz_grid_container/QuizGridContainer';
import QuizListContainer from '../../components/quiz_list_container/QuizListContainer';
import { handleServerError } from '../../utils/util';
import Pagination from '../../components/pagination/Pagination';
import { ICreateQuizPayload, IQuizResult } from '../../utils/types';
import { toast } from 'react-toastify';
import { useCreateQuizMutation, useGetQuizzesQuery } from '../../api/quiz.api';
import EmptyState from '../../components/empty_state/EmptyState';
import Shimmer from '../../components/shimmer/Shimmer';
import { debounce } from 'lodash';
import { PAGE_SIZE, QuestionType, QuizStatus, ColorList, GameMusicList, LobbyMusicList, PodiumMusicList } from '../../utils/constant';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { saveQuiz } from '../../slices/quiz.slice';
import ObjectID from 'bson-objectid';
import { LIBRARY_CREATE_QUIZ_ERROR, LIBRARY_GET_QUIZZES_ERROR } from '../../utils/error_messages';
import { RootState } from '../../store';

const Library: React.FC = () => {
  useTitle('Library');
  const user = useSelector((state: RootState) => state.authUser.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [view, setView] = useState('list');
  const [quizzes, setQuizzes] = useState<IQuizResult | null>(null);
  const [quizStatus, setQuizStatus] = useState<QuizStatus>(QuizStatus.PUBLISHED);
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);

  const [createQuiz, { data: dataCreateQuiz, error: errorCreateQuiz, isLoading: isLoadingCreateQuiz, isSuccess: isSuccessCreateQuiz, isError: isErrorCreateQuiz }] = useCreateQuizMutation();

  const {
    data: dataGetQuizzes,
    error: errorGetQuizzes,
    isLoading: isLoadingGetQuizzes,
    isFetching: isFetchingGetQuizzes,
    isSuccess: isSuccessGetQuizzes,
    isError: isErrorGetQuizzes,
  } = useGetQuizzesQuery(
    {
      page: page,
      pageSize: PAGE_SIZE,
      sortField: quizStatus,
      sortOrder: 'desc',
      query: query,
    },
    { skip: user?.verified !== true },
  );

  const handleCreateQuiz = () => {
    const payload: ICreateQuizPayload = {
      title: 'Fahoot Quiz Game',
      questions: [
        {
          _id: new ObjectID().toHexString(),
          title: 'Fahoot Is The Best Online Quiz Game',
          questionType: QuestionType.BOOLEAN,
          points: 100,
          duration: 30,
          mediaUrl: null,
          options: [
            {
              isCorrect: false,
              option: 'True',
              _id: new ObjectID().toHexString(),
              colorLabel: ColorList[0].value,
            },
            {
              isCorrect: false,
              option: 'False',
              _id: new ObjectID().toHexString(),
              colorLabel: ColorList[1].value,
            },
          ],
        },
      ],
      settings: {
        _id: new ObjectID().toHexString(),
        colorLabel: 'bg-rose-500',
        gameMusic: GameMusicList[0].value,
        lobbyMusic: LobbyMusicList[0].value,
        podiumMusic: PodiumMusicList[0].value,
      },
    };

    createQuiz(payload);
  };

  useEffect(() => {
    if (isSuccessGetQuizzes) {
      setQuizzes(dataGetQuizzes);
    }
  }, [isSuccessGetQuizzes, dataGetQuizzes, page, query]);

  useEffect(() => {
    if (isErrorGetQuizzes && errorGetQuizzes) {
      if ('status' in errorGetQuizzes) {
        const message = handleServerError(errorGetQuizzes.status, LIBRARY_GET_QUIZZES_ERROR);
        toast.error(message, { position: toast.POSITION.TOP_CENTER });
      }
    }
  }, [isErrorGetQuizzes, errorGetQuizzes]);

  useEffect(() => {
    if (isSuccessCreateQuiz) {
      if (dataCreateQuiz) {
        dispatch(saveQuiz(dataCreateQuiz));
        navigate(`/editor/${dataCreateQuiz._id}`);
      }
    }
  }, [isSuccessCreateQuiz]);

  useEffect(() => {
    if (isErrorCreateQuiz && errorCreateQuiz) {
      if ('status' in errorCreateQuiz) {
        const errorMessage = handleServerError(errorCreateQuiz.status, LIBRARY_CREATE_QUIZ_ERROR);
        toast.error(errorMessage, { position: toast.POSITION.TOP_CENTER });
      }
    }
  }, [isErrorCreateQuiz, errorCreateQuiz]);
  return (
    <>
      <header className="bg-white shadow-sm">
        <div className="mx-auto flex justify-between items-center max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold leading-6 text-gray-900">Library</h1>
          <div>
            <Button handleClick={handleCreateQuiz} loading={isLoadingCreateQuiz} type="primary" label="Create" disabled={isLoadingCreateQuiz} prefixIcon={<PencilIcon className="w-6" />} />
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
                onChange={debounce((e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value), 500)}
                placeholder="search..."
                className="block w-full rounded-md border-0 py-1.5 pr-14 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6"
              />
              <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
                <kbd className="inline-flex items-center rounded border border-gray-200 px-1 font-sans text-xs text-gray-400">⌘K</kbd>
              </div>
            </div>

            <span className="isolate inline-flex rounded-md shadow-sm">
              <button
                type="button"
                onClick={() => setQuizStatus(QuizStatus.PUBLISHED)}
                className={`${
                  quizStatus === QuizStatus.PUBLISHED
                    ? 'bg-gray-600 text-white hover:bg-gray-500 relative inline-flex items-center rounded-l-md  px-3 py-2 text-sm font-semibold  focus:z-10'
                    : 'bg-white text-gray-900 relative inline-flex items-center rounded-l-md  px-3 py-2 text-sm font-semibold  focus:z-10'
                }`}
              >
                Publish
              </button>
              <button
                type="button"
                onClick={() => setQuizStatus(QuizStatus.DRAFT)}
                className={`${
                  quizStatus === QuizStatus.DRAFT
                    ? 'bg-gray-600 text-white hover:bg-gray-500 relative inline-flex items-center rounded-r-md  px-3 py-2 text-sm font-semibold  focus:z-10'
                    : 'bg-white text-gray-900 relative inline-flex items-center rounded-r-md  px-3 py-2 text-sm font-semibold  focus:z-10'
                }`}
              >
                Draft
              </button>
            </span>

            <span className="hidden isolate md:inline-flex rounded-md shadow-sm">
              <button
                onClick={() => setView('list')}
                type="button"
                className={`relative inline-flex items-center rounded-l-md ${
                  view == 'list' ? 'bg-gray-600 text-white hover:bg-gray-500' : 'bg-white text-gray-900'
                } px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:z-10 transition-all duration-300 ease-linear`}
              >
                <ListBulletIcon className="w-6" />
              </button>
              <button
                onClick={() => setView('grid')}
                type="button"
                className={`relative -ml-px inline-flex items-center rounded-r-md ${
                  view == 'grid' ? 'bg-gray-600 text-white hover:bg-gray-500' : 'bg-white text-gray-900'
                } px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:z-10 transition-all duration-300 ease-linear`}
              >
                <Squares2X2Icon className="w-6" />
              </button>
            </span>
          </div>

          {isLoadingGetQuizzes || isFetchingGetQuizzes ? (
            <Shimmer count={PAGE_SIZE} />
          ) : (
            <>
              {quizzes?.results && quizzes.results.length > 0 ? (
                <div className="w-full p-2 md:p-0">
                  {/* Always show QuizGridContainer on mobile */}
                  <div className="block md:hidden">
                    <QuizGridContainer quizzes={quizzes.results} />
                  </div>

                  {/* On desktop, switch based on the 'view' */}
                  <div className="hidden md:block">{view === 'grid' ? <QuizGridContainer quizzes={quizzes.results} /> : <QuizListContainer quizzes={quizzes.results} />}</div>
                </div>
              ) : (
                <EmptyState icon={<DocumentPlusIcon className="w-12 text-primary-500" />} heading="No quizzes found" description="Get started by creating a new quiz" action={handleCreateQuiz} />
              )}
            </>
          )}

          {quizzes?.results && quizzes.results.length > 0 && (
            <div className="w-full mt-6 flex items-center">
              <Pagination total={quizzes.total} totalPages={quizzes.totalPages} currentNumberOfResults={quizzes.results.length} page={page} setPage={setPage} />
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Library;
