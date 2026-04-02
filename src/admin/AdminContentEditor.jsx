import { useState, useEffect } from 'react';
import { Edit3, Save, X, Eye, EyeOff, Upload, RotateCcw } from 'lucide-react';
import { loadPageContent, savePageContent, defaultPageContent } from '../data/storage';

const pages = [
  { id: 'homepage', label: 'Homepage' },
  { id: 'construction', label: 'Construction' },
  { id: 'cleaning', label: 'Cleaning' },
  { id: 'rentals', label: 'Rentals' },
];

export default function AdminContentEditor() {
  const [selectedPage, setSelectedPage] = useState('homepage');
  const [content, setContent] = useState(null);
  const [editingSection, setEditingSection] = useState(null);
  const [changes, setChanges] = useState({});
  const [success, setSuccess] = useState('');
  const [imagePreview, setImagePreview] = useState({});

  useEffect(() => {
    const loadedContent = loadPageContent();
    setContent(loadedContent);
  }, []);

  const currentPageSections = content?.[selectedPage] || {};

  const handleSectionClick = (sectionId) => {
    setEditingSection(editingSection === sectionId ? null : sectionId);
    setChanges({});
    setImagePreview({});
  };

  const handleFieldChange = (sectionId, field, value) => {
    setChanges((prev) => ({
      ...prev,
      [sectionId]: { ...prev[sectionId], [field]: value },
    }));
  };

  const handleToggleVisibility = (sectionId) => {
    handleFieldChange(sectionId, 'visible', !currentPageSections[sectionId]?.visible);
  };

  const handleImageUpload = (event, sectionId, imageField = 'image') => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      setImagePreview((prev) => ({
        ...prev,
        [sectionId]: dataUrl,
      }));
      handleFieldChange(sectionId, imageField, dataUrl);
    };
    reader.readAsDataURL(files[0]);
  };

  const handleSave = () => {
    if (!content) return;

    const updatedContent = { ...content };
    Object.keys(changes).forEach((sectionId) => {
      updatedContent[selectedPage][sectionId] = {
        ...updatedContent[selectedPage][sectionId],
        ...changes[sectionId],
      };
    });

    savePageContent(updatedContent);
    setContent(updatedContent);
    setChanges({});
    setEditingSection(null);
    setImagePreview({});
    setSuccess('Changes saved successfully!');
    window.dispatchEvent(new Event('content-updated'));
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleReset = () => {
    const defaultContent = defaultPageContent;
    savePageContent(defaultContent);
    setContent(defaultContent);
    setChanges({});
    setEditingSection(null);
    setImagePreview({});
    setSuccess('Content reset to defaults!');
    window.dispatchEvent(new Event('content-updated'));
    setTimeout(() => setSuccess(''), 3000);
  };

  if (!content) return <div className="p-6 text-center">Loading...</div>;

  const renderSectionEditor = (sectionId, sectionData) => {
    const editedData = changes[sectionId] || sectionData || {};

    return (
      <div key={sectionId} className="rounded-2xl border border-gray-200 bg-white p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold text-navy capitalize">{sectionId}</h3>
            <button
              onClick={() => handleToggleVisibility(sectionId)}
              className={`p-2 rounded-lg transition ${
                (editedData.visible ?? sectionData?.visible) ? 'bg-green-100 text-green-700' : 'bg-primary-100 text-primary-700'
              }`}
              title={`Click to ${(editedData.visible ?? sectionData?.visible) ? 'hide' : 'show'} section`}
            >
              {(editedData.visible ?? sectionData?.visible) ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
            </button>
          </div>
          <button
            onClick={() => handleSectionClick(sectionId)}
            className="text-primary-600 hover:text-primary-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          {/* Text Fields */}
          {['title', 'subtitle', 'description', 'description1', 'description2', 'description3', 'buttonText'].map(
            (field) => {
              if (!(field in sectionData || field in editedData)) return null;
              const value = editedData[field] ?? sectionData?.[field] ?? '';

              return (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                    {field}
                  </label>
                  <textarea
                    value={value}
                    onChange={(e) => handleFieldChange(sectionId, field, e.target.value)}
                    rows={field === 'description' || field.includes('description') ? 3 : 1}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              );
            }
          )}

          {/* Image Fields */}
          {['image', 'buttonLink'].map((field) => {
            if (!(field in sectionData || field in editedData)) return null;
            if (field === 'buttonLink') {
              return (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Link</label>
                  <input
                    type="text"
                    value={editedData[field] ?? sectionData?.[field] ?? ''}
                    onChange={(e) => handleFieldChange(sectionId, field, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              );
            }

            const imageUrl = imagePreview[sectionId] || editedData[field] || sectionData?.[field];
            return (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                  {field}
                </label>
                <div className="space-y-3">
                  {imageUrl && (
                    <div className="relative rounded-lg overflow-hidden h-48 bg-gray-100">
                      <img src={imageUrl} alt={field} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <label className="cursor-pointer inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-white hover:bg-primary-700">
                    <Upload className="w-4 h-4" />
                    Upload Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, sectionId, field)}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-navy">Content Manager (CMS)</h2>
          <p className="text-gray-600 mt-2 max-w-2xl">
            Edit all website content without touching code. Changes update instantly across the site.
          </p>
        </div>
      </div>

      {success && (
        <div className="rounded-2xl border border-green-200 bg-green-50 p-4 text-green-700 flex items-center gap-2">
          <span>✓ {success}</span>
        </div>
      )}

      {/* Page Selector */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <h3 className="text-lg font-semibold text-navy mb-4">Select Page</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {pages.map((page) => (
            <button
              key={page.id}
              onClick={() => {
                setSelectedPage(page.id);
                setEditingSection(null);
                setChanges({});
              }}
              className={`rounded-lg px-4 py-3 font-medium transition ${
                selectedPage === page.id
                  ? 'bg-primary-600 text-white'
                  : 'border border-gray-200 bg-white text-navy hover:border-primary-400'
              }`}
            >
              {page.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sections Editor */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-navy">Page Sections</h3>
          <button
            onClick={handleReset}
            className="flex items-center gap-2 rounded-lg bg-orange-100 px-4 py-2 text-orange-700 hover:bg-orange-200"
          >
            <RotateCcw className="w-4 h-4" />
            Reset to Defaults
          </button>
        </div>

        {Object.keys(currentPageSections).length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 p-8 text-center text-gray-500">
            No sections available for this page.
          </div>
        ) : (
          <div className="grid gap-4 lg:grid-cols-2">
            {Object.entries(currentPageSections).map(([sectionId, sectionData]) => (
              <div key={sectionId}>
                {editingSection === sectionId ? (
                  renderSectionEditor(sectionId, sectionData)
                ) : (
                  <div className="rounded-2xl border border-gray-200 bg-white p-6 cursor-pointer hover:border-primary-400 transition"
                    onClick={() => handleSectionClick(sectionId)}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-semibold text-navy capitalize">{sectionId}</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {sectionData?.title || sectionData?.description || 'No title'}
                        </p>
                        <span className={`inline-block mt-2 px-2 py-1 rounded text-xs font-medium ${
                          sectionData?.visible ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {sectionData?.visible ? 'Visible' : 'Hidden'}
                        </span>
                      </div>
                      <Edit3 className="w-5 h-5 text-primary-600 mt-1" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Save Button */}
      {Object.keys(changes).length > 0 && (
        <div className="fixed bottom-6 right-6 flex gap-3">
          <button
            onClick={() => {
              setChanges({});
              setEditingSection(null);
            }}
            className="rounded-lg border border-gray-300 px-6 py-3 font-medium text-navy hover:bg-gray-50"
          >
            Discard
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 rounded-lg bg-primary-600 px-6 py-3 font-medium text-white hover:bg-primary-700"
          >
            <Save className="w-5 h-5" />
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
}
