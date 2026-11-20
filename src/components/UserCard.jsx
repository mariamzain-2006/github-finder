export default function UserCard({ user }) {
  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
        <img
          src={user.avatar_url}
          alt={user.login}
          className="h-28 w-28 rounded-full border-4 border-gray-100"
        />

        <div className="text-center sm:text-left">
          <h2 className="text-2xl font-bold text-gray-800">
            {user.name || user.login}
          </h2>
          <p className="text-gray-500">@{user.login}</p>

          {user.bio && <p className="mt-3 text-gray-700">{user.bio}</p>}

          <div className="mt-3 space-y-1 text-sm text-gray-600">
            {user.location && <p>📍 {user.location}</p>}
            {user.company && <p>🏢 {user.company}</p>}
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3 text-center">
        <Stat label="Repos" value={user.public_repos} />
        <Stat label="Followers" value={user.followers} />
        <Stat label="Following" value={user.following} />
      </div>

      <a
        href={user.html_url}
        target="_blank"
        rel="noreferrer"
        className="mt-6 block rounded-lg bg-gray-900 py-2 text-center font-medium text-white transition hover:bg-gray-700"
      >
        View Profile
      </a>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-lg bg-gray-50 p-3">
      <p className="text-xl font-bold text-gray-800">{value}</p>
      <p className="text-xs uppercase text-gray-500">{label}</p>
    </div>
  );
}