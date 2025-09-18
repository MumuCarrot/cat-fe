"use client";
import {useEffect, useState} from "react";
import {api} from "@/app/api/client";

export default function Home() {
    const [cats, setCats] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCats = () => {
        setLoading(true);
        api.get("/api/cats/").then(res => setCats(res.data)).finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchCats();
    }, []);

    const handleChange = (id, field, value) => {
        setCats(cats.map(cat => cat.id === id ? { ...cat, [field]: value } : cat));
    };

    const handleBlur = async (cat) => {
        await api.put(`/api/cats/${cat.id}/`, cat);
        fetchCats();
    };

    return (
      <main className='flex-1 flex justify-center items-center'>
          <div className="p-6 relative z-10">
              <h1 className="text-2xl font-bold mb-4">Cats List</h1>

              <table className="border-collapse border border-gray-400 w-full">
                  <thead>
                  <tr className="bg-gray-200">
                      <th className="border border-gray-400 px-4 py-2">ID</th>
                      <th className="border border-gray-400 px-4 py-2">Name</th>
                      <th className="border border-gray-400 px-4 py-2">Breed</th>
                      <th className="border border-gray-400 px-4 py-2">Experience</th>
                      <th className="border border-gray-400 px-4 py-2">Salary</th>
                  </tr>
                  </thead>
                  <tbody>
                  {cats.map(cat => (
                      <tr key={cat.id}>
                          <td className="border border-gray-400 px-4 py-2">{cat.id}</td>
                          <td className="border border-gray-400 px-4 py-2">
                              <input
                                  className="w-full"
                                  value={cat.name}
                                  onChange={e => handleChange(cat.id, "name", e.target.value)}
                                  onBlur={() => handleBlur(cat)}
                              />
                          </td>
                          <td className="border border-gray-400 px-4 py-2">
                              <input
                                  className="w-full"
                                  value={cat.breed}
                                  onChange={e => handleChange(cat.id, "breed", e.target.value)}
                                  onBlur={() => handleBlur(cat)}
                              />
                          </td>
                          <td className="border border-gray-400 px-4 py-2">
                              <input
                                  type="number"
                                  className="w-full"
                                  value={cat.years_of_experience}
                                  onChange={e => handleChange(cat.id, "years_of_experience", e.target.value)}
                                  onBlur={() => handleBlur(cat)}
                              />
                          </td>
                          <td className="border border-gray-400 px-4 py-2">
                              <input
                                  type="number"
                                  className="w-full"
                                  value={cat.salary}
                                  onChange={e => handleChange(cat.id, "salary", e.target.value)}
                                  onBlur={() => handleBlur(cat)}
                              />
                          </td>
                      </tr>
                  ))}
                  </tbody>
              </table>
          </div>
      </main>
  );
}
