import { useEffect, useState } from 'react';
import { getMyInfo } from '../apis/auth';
import { set } from 'zod';

const MyPage = () => {
  const [data, setDate] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await getMyInfo();
      console.log(response);
      setDate(response.data);
    };

    getData();
  }, []);
  return <div>{data.name}</div>;
};

export default MyPage;
