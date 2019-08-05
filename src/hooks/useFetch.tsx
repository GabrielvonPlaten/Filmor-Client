import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface URL {
  url: string;
}

const useFetch: React.FC<URL> = ({ url }): any => {
  const [data, setData] = useState<any>(null);

  const fetchData = async () => {
    const response: any = await axios.get(url);
    setData(response.data);
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return data && data.results ? data.results : data;
};

export default useFetch;
