import { useState } from 'react';
import { constructionRequests } from '../data/mockData';
import DataTable from '../components/DataTable';

export default function AdminConstruction() {
  const [constructionData, setConstructionData] = useState(constructionRequests);

  const columns = [
    { label: 'ID', key: 'id' },
    { label: 'Name', key: 'name', editable: true },
    { label: 'Project Type', key: 'type', editable: true },
    { label: 'Date', key: 'date', editable: true, type: 'date' },
    { label: 'Phone', key: 'phone', editable: true, type: 'tel' },
    { label: 'Email', key: 'email', editable: true, type: 'email' },
  ];

  const handleEdit = (updatedRequest) => {
    setConstructionData(prev => prev.map(request =>
      request.id === updatedRequest.id ? updatedRequest : request
    ));
  };

  const handleDelete = (requestId) => {
    setConstructionData(prev => prev.filter(request => request.id !== requestId));
  };

  const handleStatusChange = (requestId, newStatus) => {
    setConstructionData(prev => prev.map(request =>
      request.id === requestId ? { ...request, status: newStatus } : request
    ));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3 text-navy">Manage Construction Requests</h2>
      <DataTable
        columns={columns}
        rows={constructionData}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
}
