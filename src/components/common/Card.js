export default function Card({ children }) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      {children}
    </div>
  );
}