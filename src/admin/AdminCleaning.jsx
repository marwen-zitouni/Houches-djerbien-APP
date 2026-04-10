import { useState } from 'react';
import { cleaningRequests } from '../data/mockData';
import DataTable from '../components/DataTable';

export default function AdminCleaning() {
  const [cleaningData, setCleaningData] = useState(cleaningRequests);

  const columns = [
    { label: 'ID', key: 'id' },
    { label: 'Client', key: 'client', editable: true },
    { label: 'Type', key: 'type', editable: true },
    { label: 'Frequency', key: 'frequency', editable: true },
    { label: 'Status', key: 'status' },
    { label: 'Team', key: 'team', editable: true },
  ];

  const handleEdit = (updatedRequest) => {
    setCleaningData(prev => prev.map(request =>
      request.id === updatedRequest.id ? updatedRequest : request
    ));
  };

  const handleDelete = (requestId) => {
    setCleaningData(prev => prev.filter(request => request.id !== requestId));
  };

  const handleStatusChange = (requestId, newStatus) => {
    setCleaningData(prev => prev.map(request =>
      request.id === requestId ? { ...request, status: newStatus } : request
    ));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3 text-navy">Manage Cleaning Requests</h2>
      <DataTable
        columns={columns}
        rows={cleaningData}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
}
