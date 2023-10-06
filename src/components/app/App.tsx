import { Route, Routes } from 'react-router-dom';
import Dashboard from '../../pages/dashboard/Dashboard';
import SignUp from '../../pages/signup/Signup';
import Login from '../../pages/login/login';
import NotFound from '../../pages/not_found/NotFound';
import Library from '../../pages/library/Library';
import Report from '../../pages/report/Report';
import ResetPasswordRequest from '../../pages/reset_password_request/ResetPasswordRequest';
import ResetPassword from '../../pages/reset_password/ResetPassword';
import JoinGame from '../../pages/join_game/JoinGame';
import Lobby from '../../pages/lobby/Lobby';
import GameRoom from '../../pages/game_room/GameRoom';
import Podium from '../../pages/podium/Podium';
import Editor from '../../pages/editor/Editor';
import ReportDetail from '../../pages/report_detail/ReportDetail';
import Profile from '../../pages/profile/Profile';
import { AuthGuard } from '../../container/auth_guard/AuthGuard';
import Logout from '../../pages/logout/Logout';
import VerifyEmail from '../../pages/verify_email/VerifyEmail';
import { ErrorBoundary } from 'react-error-boundary';
import FallBackUIOnError from '../fallback_ui_on_error/FallbackUIOnError';
import { useLogMutation } from '../../api/log.api';
import { useEffect } from 'react';
import { handleServerError } from '../../utils/util';
import { toast } from 'react-toastify';
import { APP_COMPONENT_LOG_ERROR } from '../../utils/error_messages';
import Preview from '../../pages/preview/Preview';
import { USER_ROLE } from '../../utils/constant';
import CreatePlay from '../../pages/create_play/CreatePlay';

const App: React.FC = () => {
  const [log, { isError, error }] = useLogMutation();

  const handleOnError = (error: Error) => {
    const payload = { description: error.message, event: 'frontend_error' };
    log(payload);
  };

  useEffect(() => {
    if (isError && error) {
      if ('status' in error) {
        const message = handleServerError(error.status, APP_COMPONENT_LOG_ERROR);
        toast.error(message, { position: toast.POSITION.TOP_CENTER });
      }
    }
  }, [isError, error]);
  return (
    <ErrorBoundary fallbackRender={FallBackUIOnError} onReset={() => location.reload()} onError={handleOnError}>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="/password_reset_request" element={<ResetPasswordRequest />} />
        <Route path="/password_reset" element={<ResetPassword />} />
        <Route path="/verify_email" element={<VerifyEmail />} />
        <Route path="/join" element={<JoinGame />} />

        {/* Protected routes */}
        <Route
          path="/podium"
          element={
            <AuthGuard roles={[USER_ROLE.CREATOR, USER_ROLE.PLAYER]}>
              <Podium />
            </AuthGuard>
          }
        />
        <Route
          path="/game_room"
          element={
            <AuthGuard roles={[USER_ROLE.CREATOR, USER_ROLE.PLAYER]}>
              <GameRoom />
            </AuthGuard>
          }
        />
        <Route
          path="/lobby/:playId"
          element={
            <AuthGuard roles={[USER_ROLE.CREATOR, USER_ROLE.PLAYER]}>
              <Lobby />
            </AuthGuard>
          }
        />

        <Route
          path="/create_play/:quizId"
          element={
            <AuthGuard roles={[USER_ROLE.CREATOR]}>
              <CreatePlay />
            </AuthGuard>
          }
        />

        <Route
          path="/preview"
          element={
            <AuthGuard roles={[USER_ROLE.CREATOR]}>
              <Preview />
            </AuthGuard>
          }
        />

        <Route path="dashboard" element={<Dashboard />}>
          <Route
            index
            element={
              <AuthGuard roles={[USER_ROLE.CREATOR]}>
                <Library />
              </AuthGuard>
            }
          />
          <Route
            path="report"
            element={
              <AuthGuard roles={[USER_ROLE.CREATOR]}>
                <Report />
              </AuthGuard>
            }
          />
          <Route
            path="profile"
            element={
              <AuthGuard roles={[USER_ROLE.CREATOR]}>
                <Profile />
              </AuthGuard>
            }
          />
          <Route
            path="report/:id"
            element={
              <AuthGuard roles={[USER_ROLE.CREATOR]}>
                <ReportDetail />
              </AuthGuard>
            }
          />
          <Route
            path="logout"
            element={
              <AuthGuard roles={[USER_ROLE.CREATOR]}>
                <Logout />
              </AuthGuard>
            }
          />
        </Route>
        <Route
          path="/editor/:quizId"
          element={
            <AuthGuard roles={[USER_ROLE.CREATOR]}>
              <Editor />
            </AuthGuard>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ErrorBoundary>
  );
};

export default App;
