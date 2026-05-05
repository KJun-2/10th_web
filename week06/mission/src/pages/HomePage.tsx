import useGetLpList from '../hooks/queries/useGetLpList';

function HomePage() {
  const { data, isPending, isError } = useGetLpList({});
  if (isPending) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error...</div>;
  }
  return (
    <div>
      {data?.data.data.map((lp) => (
        <h1>{lp.title}</h1>
      ))}
    </div>
  );
}

export default HomePage;
