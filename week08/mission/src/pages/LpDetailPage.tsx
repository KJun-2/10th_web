import { useParams } from 'react-router-dom';
import useGetLpDetail from '../hooks/queries/useGetLpDetail';
import { Heart } from 'lucide-react';
import useGetMyInfo from '../hooks/queries/useGetMyInfo';
import { useAuth } from '../context/AuthContext';
import useDeleteLike from '../hooks/mutations/useDeleteLike';
import usePostLike from '../hooks/mutations/usePostLike';
const LpDetailPage = () => {
  const { lpId } = useParams();
  const { accessToken } = useAuth();
  const { data: lp, isPending, isError } = useGetLpDetail({ lpId: Number(lpId) });
  const { data: me } = useGetMyInfo(accessToken);
  const { mutate: likeMutate } = usePostLike();
  const { mutate: dislikeMutate } = useDeleteLike();

  const isLiked = lp?.data.likes.some((like) => like.userId === me?.data.id);
  const handleLikeLp = () => {
    likeMutate({ lpId: Number(lpId) });
  };
  const handleDislikeLp = () => {
    dislikeMutate({ lpId: Number(lpId) });
  };
  if (isPending) {
    return <div>로딩중...</div>;
  }
  if (isError || !lp) {
    return <div>에러가 발생했습니다.</div>;
  }
  return (
    <div className="mt-12">
      <h1>{lp?.data.title}</h1>
      <img
        width={200}
        src={lp?.data.thumbnail}
        alt={lp?.data.title}
      />
      <p>{lp?.data.content}</p>
      <button onClick={isLiked ? handleDislikeLp : handleLikeLp}>
        <Heart
          color={isLiked ? 'red' : 'black'}
          fill={isLiked ? 'red' : 'transparent'}
        />
      </button>
    </div>
  );
};
export default LpDetailPage;
