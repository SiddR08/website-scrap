import { useState } from "react";

export default function AmazonScraper() {
  const [url, setUrl] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchProductDetails = async () => {
    setLoading(true);
    setError("");
    setData(null);

    try {
      const response = await fetch(`https://amazon-scraper-wo4f.onrender.com?url=${encodeURIComponent(url)}`);
      const result = await response.json();

      if (response.ok) {
        setData(result);
      } else {
        setError(result.message || "Error fetching product details");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-bold text-gray-900">Amazon Product Scraper</h2>
      <input
        type="text"
        placeholder="Enter Amazon Product URL"
        className="w-full p-2 border rounded"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button
        onClick={fetchProductDetails}
        className="w-full p-2 bg-blue-500 text-white rounded"
        disabled={loading}
      >
        {loading ? "Fetching..." : "Get Product Info"}
      </button>

      {error && <p className="text-red-500">{error}</p>}
      {data && (
        <div className="mt-4 p-3 border rounded">
          <h3 className="text-lg font-bold">{data.title}</h3>
          <p><strong>Price:</strong> {data.price}</p>
          <img src={data.image} alt={data.title} className="w-full mt-2" />
        </div>
      )}
    </div>
  );
}
