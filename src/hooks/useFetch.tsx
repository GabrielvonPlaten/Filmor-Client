import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface URL {
  url: string;
}

const useFetch: React.FC<URL> = (props): any => {
  console.log(props.url);
  const [data, setData]: any = useState(null);

  const fetchData = async () => {
    const response: any = await axios.get(props.url);
    setData(response.data);
  };

  useEffect(() => {
    fetchData();
  }, [props.url]);

  return data;
};

export default useFetch;
