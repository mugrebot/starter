import { useEffect, useState } from 'react';

export default function Page() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/welcome');
      const json = await res.json();
      setData(json);
    };

    fetchData();
  }, []);

  console.log(data, "yoyoy");

  return (
    <div>
      {data?.user == true && "its true"}
      {data?.user == false && <h1>{data?.user} False </h1>}
      <h1>{data?.user}</h1>
      <h1>{data?.user}</h1>

    </div>
  );
}
