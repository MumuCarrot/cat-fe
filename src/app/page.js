"use client";
import {useEffect, useState} from "react";
import {api} from "@/app/api/client";

/**
 * @typedef {Object} Cat
 * @property {number} id
 * @property {string} name
 * @property {string} breed
 * @property {number} years_of_experience
 * @property {number} salary
 */

export default function Home() {
    const [cats, setCats] = useState([]);
    const [form, setForm] = useState({ name: "", breed: "", years_of_experience: 0, salary: 0 });
    const [loading, setLoading] = useState(true);

    const fetchCats = () => {
        setLoading(true);
        api.get("/api/cats/").then(res => setCats(res.data)).finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchCats();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await api.post("/api/cats/", {
            ...form,
            years_of_experience: Number(form.years_of_experience),
            salary: Number(form.salary),
        });
        setForm({ name: "", breed: "", years_of_experience: 0, salary: 0 });
        fetchCats();
    };

    const handleChangeTable = (id, field, value) => {
        setCats(cats.map(cat => cat.id === id ? { ...cat, [field]: value } : cat));
    };
    
    const handleBlur = async (cat) => {
        await api.put(`/api/cats/${cat.id}/`, cat);
        fetchCats();
    };

    return (
      <main className='flex-1 flex justify-center items-center'>
          <div className="p-6">
              {/* Form for adding a new cat */}
              <form onSubmit={handleSubmit} className="mb-6">
                  <input name="name" placeholder="Name" value={form.name} onChange={handleChange} className="border p-1 mr-2" />
                  <input name="breed" placeholder="Breed" value={form.breed} onChange={handleChange} className="border p-1 mr-2" />
                  <input name="years_of_experience" placeholder="Experience" type="number" value={form.years_of_experience} onChange={handleChange} className="border p-1 mr-2" />
                  <input name="salary" placeholder="Salary" type="number" value={form.salary} onChange={handleChange} className="border p-1 mr-2" />
                  <button type="submit" className="bg-blue-500 text-white px-2 py-1">Add Cat</button>
              </form>

              {/* Table */}
              {loading ? <p>Loading...</p> : (
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
                                      onChange={e => handleChangeTable(cat.id, "name", e.target.value)}
                                      onBlur={() => handleBlur(cat)}
                                  />
                              </td>
                              <td className="border border-gray-400 px-4 py-2">
                                  <input
                                      className="w-full"
                                      value={cat.breed}
                                      onChange={e => handleChangeTable(cat.id, "breed", e.target.value)}
                                      onBlur={() => handleBlur(cat)}
                                  />
                              </td>
                              <td className="border border-gray-400 px-4 py-2">
                                  <input
                                      type="number"
                                      className="w-full"
                                      value={cat.years_of_experience}
                                      onChange={e => handleChangeTable(cat.id, "years_of_experience", e.target.value)}
                                      onBlur={() => handleBlur(cat)}
                                  />
                              </td>
                              <td className="border border-gray-400 px-4 py-2">
                                  <input
                                      type="number"
                                      className="w-full"
                                      value={cat.salary}
                                      onChange={e => handleChangeTable(cat.id, "salary", e.target.value)}
                                      onBlur={() => handleBlur(cat)}
                                  />
                              </td>
                          </tr>
                      ))}
                      </tbody>
                  </table>
              )}
          </div>
      </main>
  );
}
