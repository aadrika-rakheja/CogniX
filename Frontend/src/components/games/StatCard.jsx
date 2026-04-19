function StatCard({ title, value }) {
  return (
    <div className="p-4 bg-white rounded-xl shadow">
      <h3 className="text-gray-500 text-sm">{title}</h3>
      <h2 className="text-xl font-bold">{value}</h2>
    </div>
  );
}

export default StatCard;