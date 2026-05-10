"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Spinner from "@/components/Spinner";
import { recordDefaultValues } from "@/utils/constants";
import { getRecordById, updateRecord } from "@/utils/recordsFunctions";
import RecordForm from "@/components/RecordForm";

const EditContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [entry, setEntry] = useState(recordDefaultValues);

  const getRecord = async (id) => {
    const data = await getRecordById(id);
    console.log('Record primit:', JSON.stringify(data));
    if (data) {
      setEntry(data);
    }
    setIsLoading(false);
  };

  const onSubmit = async (data) => {
    const response = await updateRecord(data);
    if (response) {
      router.push("/");
      router.refresh();
    } else {
      alert("Failed to update record");
    }
  };

  useEffect(() => {
    const id = searchParams.get("id");
    if (!id) {
      router.push("/");
      return;
    }
    getRecord(id);
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Edit Record</h1>
      <RecordForm data={entry} onSubmit={onSubmit} />
    </div>
  );
};

const Edit = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <EditContent />
    </Suspense>
  );
};

export default Edit;