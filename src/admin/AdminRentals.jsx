import { useState } from 'react';
import { loadListings, saveListings } from '../data/storage';
import DataTable from '../components/DataTable';
import { X, Plus, Edit2, Trash2 } from 'lucide-react';

export default function AdminRentals() {
  const [allListings, setAllListings] = useState(() => loadListings());
  const [editing, setEditing] = useState(null);
  const [imagePreview, setImagePreview] = useState([]);
  const [success, setSuccess] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [form, setForm] = useState({
    title: '',
    location: '',
    price: '',
    rating: '',
    images: [],
    amenities: '',
    description: '',
    host: '',
  });

  const columns = [
    { label: 'Title', key: 'title' },
    { label: 'Location', key: 'location' },
    { label: 'Price', key: 'price', render: (row) => `$${row.price}` },
    { label: 'Rating', key: 'rating', render: (row) => `⭐ ${row.rating}` },
    {
      label: 'Actions',
      key: 'actions',
      render: (row) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleEdit(row)}
            className="px-3 py-1 bg-primary-500 text-white rounded text-xs hover:bg-primary-600 flex items-center gap-1"
          >
            <Edit2 className="w-3 h-3" /> Edit
          </button>
          <button
            onClick={() => handleDelete(row.id)}
            className="px-3 py-1 bg-primary-500 text-white rounded text-xs hover:bg-primary-600 flex items-center gap-1"
          >
            <Trash2 className="w-3 h-3" /> Delete
          </button>
        </div>
      ),
    },
  ];

  const handleEdit = (listing) => {
    setEditing(listing.id);
    setImagePreview(listing.images || []);
    setForm({
      title: listing.title,
      location: listing.location,
      price: listing.price,
      rating: listing.rating,
      images: listing.images || [],
      amenities: listing.amenities.join(', '),
      description: listing.description,
      host: `${listing.host.name} (${listing.host.avatar})`,
    });
    window.scrollTo(0, 0);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this listing?')) {
      const updated = allListings.filter((l) => l.id !== id);
      setAllListings(updated);
      saveListings(updated);
      setSuccess('Listing deleted successfully!');
      setTimeout(() => setSuccess(''), 3000);
    }
  };

  const handleCancel = () => {
    setEditing(null);
    setForm({ title: '', location: '', price: '', rating: '', images: [], amenities: '', description: '', host: '' });
    setImagePreview([]);
  };

  const handleSave = async () => {
    if (isUploading) {
      alert('Please wait for the image upload to finish before saving.');
      return;
    }

    if (!form.title || !form.location || !form.price) {
      alert('Please fill in all required fields (Title, Location, Price)');
      return;
    }

    setIsSaving(true);
    try {
      const updatedListing = {
        title: form.title,
        location: form.location,
        price: parseFloat(form.price),
        rating: parseFloat(form.rating) || 0,
        images: form.images,
        amenities: form.amenities.split(',').map((s) => s.trim()).filter(Boolean),
        description: form.description,
        host: {
          name: form.host.split(' (')[0] || 'Host',
          avatar: form.host.split(' (')[1]?.replace(')', '') || '',
        },
      };

      let updated;
      if (editing && editing !== 'new') {
        updated = allListings.map((l) =>
          l.id === editing ? { ...l, ...updatedListing } : l
        );
        setSuccess('Listing updated successfully!');
      } else {
        const newListing = {
          id: Date.now().toString(),
          ...updatedListing,
          coordinates: { lat: 33.876, lng: 10.858 },
        };
        updated = [...allListings, newListing];
        setSuccess('Listing created successfully!');
      }

      setAllListings(updated);
      saveListings(updated);
      handleCancel();
      setTimeout(() => setSuccess(''), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setIsUploading(true);
    const promises = files.map(
      (file) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (event) => resolve(event.target.result);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        })
    );

    Promise.all(promises)
      .then((urls) => {
        const currentImages = form.images || [];
        const mergedImages = [...currentImages, ...urls];
        setImagePreview(mergedImages);
        setForm({ ...form, images: mergedImages });
      })
      .catch(() => {
        alert('One or more images could not be uploaded. Please try again.');
      })
      .finally(() => {
        setIsUploading(false);
      });
  };

  const removeImage = (index) => {
    const newPreview = imagePreview.filter((_, i) => i !== index);
    setImagePreview(newPreview);
    setForm({ ...form, images: newPreview });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-navy">Manage Rentals</h2>
        <button
          onClick={() => {
            setEditing('new');
            setForm({ title: '', location: '', price: '', rating: '', images: [], amenities: '', description: '', host: '' });
            setImagePreview([]);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
        >
          <Plus className="w-5 h-5" /> Add New Listing
        </button>
      </div>

      {success && (
        <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
          ✓ {success}
        </div>
      )}

      {editing && (
        <div className="p-6 bg-white rounded-lg shadow-lg border border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold">
              {editing === 'new' ? 'Add New Listing' : 'Edit Listing'}
            </h3>
            <button
              onClick={handleCancel}
              className="p-1 hover:bg-gray-200 rounded"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left Column */}
            <div>
              <label className="block text-sm font-medium text-navy mb-2">
                Title *
              </label>
              <input
                type="text"
                placeholder="Property title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />

              <label className="block text-sm font-medium text-navy mt-4 mb-2">
                Location *
              </label>
              <input
                type="text"
                placeholder="Property location"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />

              <label className="block text-sm font-medium text-navy mt-4 mb-2">
                Price (per night) *
              </label>
              <input
                type="number"
                placeholder="Price"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />

              <label className="block text-sm font-medium text-navy mt-4 mb-2">
                Rating
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="5"
                placeholder="Rating (0-5)"
                value={form.rating}
                onChange={(e) => setForm({ ...form, rating: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />

              <label className="block text-sm font-medium text-navy mt-4 mb-2">
                Host Name
              </label>
              <input
                type="text"
                placeholder="Host name"
                value={form.host}
                onChange={(e) => setForm({ ...form, host: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            {/* Right Column */}
            <div>
              <label className="block text-sm font-medium text-navy mb-2">
                Amenities (comma separated)
              </label>
              <textarea
                placeholder="WiFi, Pool, Kitchen..."
                value={form.amenities}
                onChange={(e) => setForm({ ...form, amenities: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 h-24 resize-none"
              />

              <label className="block text-sm font-medium text-navy mt-4 mb-2">
                Description
              </label>
              <textarea
                placeholder="Property description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 h-24 resize-none"
              />

              <label className="block text-sm font-medium text-navy mt-4 mb-2">
                Upload Images
              </label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          {/* Image Preview */}
          {imagePreview.length > 0 && (
            <div className="mt-6">
              <label className="block text-sm font-medium text-navy mb-3">
                Image Preview ({imagePreview.length})
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {imagePreview.map((img, idx) => (
                  <div key={idx} className="relative group">
                    <img
                      src={img}
                      alt={`Preview ${idx}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => removeImage(idx)}
                      className="absolute top-1 right-1 bg-primary-500 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6 pt-6 border-t">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? 'Saving...' : 'Save Listing'}
            </button>
            <button
              onClick={handleCancel}
              className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <DataTable columns={columns} rows={allListings} />
      </div>
    </div>
  );
}
