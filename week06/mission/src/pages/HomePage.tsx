import { useEffect, useState } from 'react';
import useGetInfiniteLpList from '../hooks/queries/useGetInfiniteLpList';
import { PAGINATION_ORDER } from '../enums/common';
import { InView, useInView } from 'react-intersection-observer';
import LpCard from '../components/LpCard/LpCard';
import LpCardSkeleton from '../components/LpCard/LpCardSkeleton';
import LpCardSkeletonList from '../components/LpCard/LpCardSkeletonList';

function HomePage() {
  const [search, setSearch] = useState('');
  // const { data, isPending, isError } = useGetLpList({});
  const { data: lps, isFetching, hasNextPage, isPending, isError, fetchNextPage } = useGetInfiniteLpList(50, search, PAGINATION_ORDER.desc);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, isFinite, hasNextPage, fetchNextPage]);

  if (isError) {
    return <div>Error...</div>;
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <input
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <div className="grid gird-cols1 sm:gird-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {isPending && <LpCardSkeletonList count={20} />}
        {lps?.pages
          ?.map((page) => page.data.data)
          ?.flat()
          ?.map((lp) => (
            <LpCard
              key={lp.id}
              lp={lp}></LpCard>
          ))}
        {isFetching && <LpCardSkeletonList count={20} />}
        <div
          ref={ref}
          className="h-2"></div>
      </div>
    </div>
  );
}

export default HomePage;
