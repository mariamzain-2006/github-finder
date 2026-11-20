import { useEffect, useState } from "react";
import SearchForm from "./components/SearchForm";
import UserCard from "./components/UserCard";
import Spinner from "./components/Spinner";
import ErrorMessage from "./components/ErrorMessage";

export default function App() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!username) return;

    const controller = new AbortController();

    async function fetchUser() {
      setLoading(true);
      setError("");
      setUser(null);

      try {
        const res = await fetch(`https://api.github.com/users/${username}`, {
          signal: controller.signal,
        });

        if (res.status === 404) throw new Error("User not found");
        if (res.status === 403 || res.status === 429)
          throw new Error("Rate limit exceeded, try again later");
        if (!res.ok) throw new Error("Something went wrong");

        const data = await res.json();
        setUser(data);
      } catch (err) {
        if (err.name === "AbortError") return;
        setError(err.message);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    fetchUser();

    return () => controller.abort();
  }, [username]);

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="mx-auto max-w-xl">
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
          GitHub Finder
        </h1>

        <SearchForm onSearch={setUsername} />

        <div className="mt-8">
          {loading && <Spinner />}
          {error && <ErrorMessage message={error} />}
          {user && <UserCard user={user} />}
          {!loading && !error && !user && (
            <p className="text-center text-gray-500">
              Search for a GitHub username to get started.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}