import { useEffect, useState } from 'react';
import useGetInfiniteLpList from '../hooks/queries/useGetInfiniteLpList';
import { PAGINATION_ORDER } from '../enums/common';
import { useInView } from 'react-intersection-observer';
import LpCard from '../components/LpCard/LpCard';
import LpCardSkeletonList from '../components/LpCard/LpCardSkeletonList';
import useDebounce from '../hooks/useDebounce';
import { useThrottledCallback } from '../hooks/useThrottle';
import { SEARCH_DEBOUNCE_DELAY, SCROLL_THROTTLE_DELAY } from '../constants/delay';

function HomePage() {
  const [search, setSearch] = useState('');
  // string 타입인 경우 공백 제거
  const debouncedSearch = useDebounce(search, SEARCH_DEBOUNCE_DELAY).trim();


  const { data: lps, isFetchingNextPage, hasNextPage, isPending, isError, fetchNextPage } =
    useGetInfiniteLpList(50, debouncedSearch, PAGINATION_ORDER.desc);

  const { ref, inView } = useInView({ threshold: 0 });

  const loadMore = useThrottledCallback(() => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, SCROLL_THROTTLE_DELAY, debouncedSearch);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) loadMore();
  }, [inView, hasNextPage, isFetchingNextPage, loadMore]);

  if (isError) {
    return <div>Error...</div>;
  }
  return (
    <div>
      <div className=" top-16 z-[9] border-b border-gray-200 bg-white px-4 py-3 dark:border-gray-700 dark:bg-gray-900">
        <div className="container mx-auto">
          <label
            htmlFor="lp-search"
            className="relative flex items-center">
          
            <input
              id="lp-search"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="LP 제목, 아티스트 검색..."
              className="w-full rounded-lg border border-gray-300 bg-gray-50 py-2.5 pl-10 pr-4 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
            />
          </label>
        </div>
      </div>
      <div className="container mx-auto px-4 py-6">
        <div className="grid gird-cols1 sm:gird-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {isPending && <LpCardSkeletonList count={20} />}
          {lps?.pages
            ?.map((page) => page.data.data)
            ?.flat()
            ?.map((lp) => (
              <LpCard
                key={lp.id}
                lp={lp}></LpCard>
            ))}
          {isFetchingNextPage && <LpCardSkeletonList count={20} />}
          <div ref={ref} className="h-2" />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
