// /components/RecordForm.jsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const RecordForm = ({ data, onSubmit }) => {
  const [formData, setFormData] = useState({ name: '', type: '', description: '', title: '', ...data });
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleCancel = () => {
    router.push('/');
  };

  const isEdit = formData._id && formData._id !== '';

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="title" className="font-medium">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          value={formData.title || ''}
          onChange={handleChange}
          className="border rounded px-3 py-2"
          placeholder="Title"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="font-medium">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          className="border rounded px-3 py-2"
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="type" className="font-medium">Type</label>
        <input
          id="type"
          name="type"
          type="text"
          value={formData.type}
          onChange={handleChange}
          className="border rounded px-3 py-2"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="description" className="font-medium">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="border rounded px-3 py-2"
          rows={3}
          placeholder="Write your thoughts here..."
        />
      </div>

      <div className="flex justify-center gap-4">
        <button
          type="button"
          onClick={handleCancel}
          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="focus:outline-none text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          {isEdit ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  );
};

export default RecordForm;