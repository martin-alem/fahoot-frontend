const items = [
  { id: 1, name: "Martin Alemajoh", points: 4556 },
  { id: 2, name: "Collins Lekeaka", points: 4556 },
  { id: 3, name: "Kevin Akawung", points: 4556 },
  { id: 4, name: "Marcel Nkeng", points: 4556 },
  { id: 5, name: "Lydia Ndemazia", points: 4556 },
];

const LeaderBoard: React.FC = () => {
  return (
    <>
      <div className="overflow-hidden rounded-md border border-gray-300 bg-white">
        <ul role="list" className="divide-y divide-gray-300">
          {items.map((item) => (
            <li key={item.id} className="px-6 py-4 flex justify-between">
              <h1>{item.name}</h1>
              <p>{item.points}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default LeaderBoard;
