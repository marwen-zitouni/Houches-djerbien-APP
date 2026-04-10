import { users } from '../data/mockData';
import DataTable from '../components/DataTable';

export default function AdminUsers() {
  const columns = [
    { label: 'ID', key: 'id' },
    { label: 'Name', key: 'name' },
    { label: 'Email', key: 'email' },
    { label: 'Role', key: 'role' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3 text-navy">Manage Users</h2>
      <DataTable columns={columns} rows={users} />
    </div>
  );
}
