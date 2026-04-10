export default function ImageGallery({ images }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
      {images.map((src, index) => (
        <img key={index} src={src} alt={`gallery-${index}`} className="h-48 w-full object-cover rounded-xl" />
      ))}
    </div>
  );
}
