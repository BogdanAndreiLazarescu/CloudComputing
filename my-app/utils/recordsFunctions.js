// /utils/recordsFunctions.js

const getId = (record) => {
  if (!record._id) return null;
  if (typeof record._id === 'string') return record._id;
  if (record._id.$oid) return record._id.$oid;
  return record._id.toString();
};

export const getRecords = async () => {
  const response = await fetch('/api/records');
  if (!response.ok) return null;
  const data = await response.json();
  return data.map(record => ({ ...record, _id: getId(record) }));
};

export const getRecordById = async (id) => {
  const response = await fetch(`/api/records/${id}`);
  if (!response.ok) return null;
  const record = await response.json();
  return { ...record, _id: getId(record) };
};

export const createRecord = async (data) => {
  const response = await fetch('/api/records', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) return null;
  return response.json();
};

export const updateRecord = async (data) => {
  const _id = getId(data);
  const { _id: _, ...body } = data;
  const response = await fetch(`/api/records/${_id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!response.ok) return null;
  return response.json();
};

export const deleteRecord = async (id) => {
  const response = await fetch(`/api/records/${id}`, { method: 'DELETE' });
  return response.ok;
};