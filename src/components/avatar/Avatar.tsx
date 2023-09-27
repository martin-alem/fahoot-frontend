import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface AvatarProps {
  height: string;
  width: string;
  rounded?: string;
  src: string | undefined;
  alt: string;
}

const Avatar: React.FC<AvatarProps> = ({ height, width, src, alt, rounded = 'rounded-full' }) => {
  const user = useSelector((state: RootState) => state.authUser.user);
  return (
    <>
      {user?.avatarUrl ? (
        <img className={`${height} ${width} ${rounded}`} src={src} alt={alt} />
      ) : (
        <span
          className={`inline-block ${height} ${width} overflow-hidden ${rounded} bg-secondary-500`}
        >
          <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </span>
      )}
    </>
  );
};

export default Avatar;
