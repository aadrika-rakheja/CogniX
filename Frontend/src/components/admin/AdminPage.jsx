import {useState,useEffect} from 'react'
import CreateSubj from './CreateSubj'
import CreateTopic from './createTopic'
import DeleteSubject from './DeleteSubject'
import DeleteTopic from './DeleteTopic'
import { getAllSubjects } from '../services/subjService';

export default function AdminPage() {
  const [data, setData] = useState([]);
  
    useEffect(() => {
      fetchData();
    });
  
    const fetchData = async () => {
      const res = await getAllSubjects();
      setData(res);
    }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-sky-50 p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm backdrop-blur-sm">
          <h1 className="text-3xl font-bold text-slate-800">Admin Console</h1>
          <p className="mt-1 text-slate-500">Create and manage subjects and topics in a classical dashboard style.</p>
        </header>

        <div className="grid gap-6 lg:grid-cols-2">
          <CreateSubj />
          <CreateTopic />
          <DeleteSubject data={data}/>
          <DeleteTopic data={data}/>
        </div>
      </div>
    </main>
  )
}
