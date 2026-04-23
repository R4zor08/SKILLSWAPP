export function DashboardStats({ stats }) {
  const items = [
    { label: 'Offered skills', value: stats?.offered ?? 0 },
    { label: 'Wanted skills', value: stats?.wanted ?? 0 },
    { label: 'Active swaps', value: stats?.activeSwaps ?? 0 },
    { label: 'Match score (best)', value: stats?.bestMatch ?? '—' },
  ];

  return (
    <div className="stats-grid">
      {items.map((i) => (
        <div key={i.label} className="stat-card card pad-md">
          <p className="muted sm">{i.label}</p>
          <p className="stat-xl">{i.value}</p>
        </div>
      ))}
    </div>
  );
}
