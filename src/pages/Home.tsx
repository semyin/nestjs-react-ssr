export { Page, loader };

import { useAppContext } from "@/renderer/AppContext";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { LoaderFunction } from "react-router";

function Page() {

  const { state, dispatch } = useAppContext();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: homeQueryKey,
    queryFn: fetchHome,
  });

  if (isLoading) return <div>Loading posts...</div>;
  
  if (isError) return <div>Error: {(error as Error).message}</div>;

  return (
    <div>
      <h1>Home Page</h1>
      <p>{state.title} <button onClick={() => dispatch({ type: 'SET_TITLE', payload: 'New Title updated at:' + new Date().getTime() })}>Set Title</button> </p>
      <p>{JSON.stringify(data)}</p>
    </div>
  );
}

const homeQueryKey = ['home'];

const fetchHome = async () => {
  const res = await fetch('http://localhost:5173/api/home');
  return res.json();
}

const loader  = (queryClient: QueryClient): LoaderFunction => async () => {
  return queryClient.prefetchQuery({
    queryKey: homeQueryKey,
    queryFn: fetchHome,
  });
}
