export default function AppointmentForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Construction consultation request submitted successfully! We will contact you soon.');
  };

  return (
    <form className="bg-white p-6 rounded-2xl shadow-soft space-y-4 max-w-xl" onSubmit={handleSubmit}>
      <h3 className="text-xl font-semibold text-navy">Request Consultation</h3>
      <div className="grid gap-3 md:grid-cols-2">
        <input type="text" placeholder="Name" className="rounded-lg border px-3 py-2" />
        <input type="tel" placeholder="Phone" className="rounded-lg border px-3 py-2" />
        <input type="email" placeholder="Email" className="rounded-lg border px-3 py-2" />
        <select className="rounded-lg border px-3 py-2">
          <option>Construction</option>
          <option>Renovation</option>
        </select>
        <input type="date" className="rounded-lg border px-3 py-2" />
      </div>
      <textarea placeholder="Project description" rows="4" className="w-full rounded-lg border px-3 py-2" />
      <button type="submit" className="bg-bordeaux text-white rounded-lg px-4 py-2 font-semibold">Submit Request</button>
    </form>
  );
}
