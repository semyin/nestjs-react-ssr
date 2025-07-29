export { About, aboutQueryKey, fetchAbout };

import { useQuery } from "@tanstack/react-query";

function About() {

  const { data, isLoading, isError, error } = useQuery({
    queryKey: aboutQueryKey,
    queryFn: fetchAbout,
  });
  
 
  if (isLoading) return <div>Loading posts...</div>;
  if (isError) return <div>Error: {(error as Error).message}</div>;

  return (
    <div>
      <h1>About Page</h1>
      <p>{JSON.stringify(data)}</p>
    </div>
  );
}

const aboutQueryKey = ['about'];

const fetchAbout = async () => {
  const res = await fetch('http://localhost:5173/api/about');
  return res.json();
}
