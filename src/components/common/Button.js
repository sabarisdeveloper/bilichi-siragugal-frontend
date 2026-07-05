export default function Button({
  text,
  type = "button",
  loading = false,
}) {
  return (
    <button
      type={type}
      disabled={loading}
      style={{
        background: "#15803d",
        color: "#fff",
        padding: "12px 20px",
        width: "100%",
        borderRadius: "8px",
        cursor: "pointer",
        border: "none",
        fontSize: "16px",
        fontWeight: "600",
      }}
    >
      {loading ? "Please Wait..." : text}
    </button>
  );
}