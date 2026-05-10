'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { getRecords, deleteRecord } from '@/utils/recordsFunctions';

const MainPage = () => {
  const [records, setRecords] = useState([]);
  const router = useRouter();
  const pathname = usePathname();

  const fetchRecords = useCallback(async () => {
    const data = await getRecords();
    if (data) {
      setRecords(data);
    }
  }, []);

  const handleDelete = async (id) => {
    const success = await deleteRecord(id);
    if (success) {
      setRecords((prev) => prev.filter((r) => r._id !== id));
    } else {
      alert('Failed to delete car listing');
    }
  };

  useEffect(() => {
    fetchRecords();
  }, [pathname, fetchRecords]);

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="flex flex-col justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">🚗 Car Marketplace</h1>
        <p className="text-gray-500 text-sm mt-1 mb-4">Browse and manage car listings</p>
        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="bg-gray-700 text-white rounded px-4 py-2 hover:bg-gray-800 transition-colors"
          >
            Contact
          </Link>
          <Link
            href="/chat"
            className="bg-purple-600 text-white rounded px-4 py-2 hover:bg-purple-700 transition-colors"
          >
            💬 Chat
          </Link>
          <Link
            href="/records/create"
            className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition-colors"
          >
            + Add Listing
          </Link>
        </div>
      </div>

      {records.length === 0 ? (
        <p className="text-gray-500">No car listings found.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {records.map((record) => (
            <div
              key={record._id}
              className="border rounded-lg p-4 flex justify-between items-start shadow-sm hover:shadow-md transition-shadow"
            >
              <div>
                <h2 className="text-xl font-semibold">🚘 {record.name}</h2>
                {record.type && (
                  <p className="text-blue-500 text-sm font-medium">{record.type}</p>
                )}
                {record.description && (
                  <p className="mt-1 text-gray-700">{record.description}</p>
                )}
              </div>

              <div className="flex gap-2">
                <Link
                  href={`/records/edit?id=${record._id}`}
                  className="bg-yellow-400 text-white rounded px-3 py-1 hover:bg-yellow-500 transition-colors text-sm"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(record._id)}
                  className="bg-red-500 text-white rounded px-3 py-1 hover:bg-red-600 transition-colors text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MainPage;