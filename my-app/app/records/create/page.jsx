// /app/records/create/page.jsx

'use client';

import { useRouter } from 'next/navigation';
import { recordDefaultValues } from '@/utils/constants';
import { createRecord } from '@/utils/recordsFunctions';
import RecordForm from '@/components/RecordForm';

const Create = () => {
  const router = useRouter();

  const onSubmit = async (data) => {
    const response = await createRecord(data);
    if (response) {
      router.push('/');
    } else {
      alert('Failed to create record');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Create Record</h1>
      <RecordForm data={recordDefaultValues} onSubmit={onSubmit} />
    </div>
  );
};

export default Create;
