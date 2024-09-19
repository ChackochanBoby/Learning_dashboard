import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div
      id="error-page"
      className="flex flex-col items-center justify-center h-screen bg-light-background dark:bg-dark-background text-light-primary-text dark:text-dark-primary-text"
    >
      <h1 className="text-4xl font-bold">Oops!</h1>
      <p className="mt-4">Sorry, an unexpected error has occurred.</p>
      <p className="mt-2">
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
