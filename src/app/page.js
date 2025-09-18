"use client";
import {useEffect, useState} from "react";
import {api} from "@/app/api/client";
import PropTypes from 'prop-types';

/**
 * @typedef {Object} Cat
 * @property {number} id
 * @property {string} name
 * @property {string} breed
 * @property {number} years_of_experience
 * @property {number} salary
 */

/**
 * Form input component
 * @param name - name of the input
 * @param placeholder - placeholder text
 * @param value - value of the input
 * @param onChange - change handler
 */
function FormInput({ name, placeholder, value, onChange }) {
    return <input name={name} placeholder={placeholder} value={value} onChange={onChange} className="border p-1 mr-2 flex-1" />
}

FormInput.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired || PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
}

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

    // Handle form input changes
    const handleChangeForm = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Add a new cat
    const handleAddCat = async (e) => {
        e.preventDefault();
        await api.post("/api/cats/", {
            ...form,
            years_of_experience: Number(form.years_of_experience),
            salary: Number(form.salary),
        });
        setForm({ name: "", breed: "", years_of_experience: 0, salary: 0 });
        fetchCats();
    };

    // Handle table input changes
    const handleChangeTable = (id, field, value) => {
        setCats(cats.map(cat => cat.id === id ? { ...cat, [field]: value } : cat));
    };

    // Update a cat
    const handleSave = async (cat) => {
        await api.put(`/api/cats/${cat.id}/`, cat);
        fetchCats();
    };

    // Delete a cat
    const handleDelete = async (id) => {
        await api.delete(`/api/cats/${id}/`);
        setCats(cats.filter(cat => cat.id !== id));
    };

    return (
      <main className='flex-1 flex justify-center items-center'>
          <div className="p-6">
              {/* Form for adding a new cat */}
              <form onSubmit={handleAddCat} className="mb-6 flex">
                  <FormInput name="name" placeholder="Name" value={form.name} onChange={handleChangeForm} />
                  <FormInput name="breed" placeholder="Breed" value={form.breed} onChange={handleChangeForm} />
                  <FormInput name="years_of_experience" placeholder="Experience" type="number" value={form.years_of_experience} onChange={handleChangeForm} />
                  <FormInput name="salary" placeholder="Salary" type="number" value={form.salary} onChange={handleChangeForm} />
                  <button type="submit" className="bg-blue-500 text-white px-2 py-1">Add Cat</button>
              </form>

              {/* Table */}
              {loading ? <p>Loading...</p> : (
                  <table className="border-collapse border border-gray-400 w-full">
                      <thead>
                      <tr className="bg-gray-900">
                          <th className="border px-4 py-2">ID</th>
                          <th className="border px-4 py-2">Name</th>
                          <th className="border px-4 py-2">Breed</th>
                          <th className="border px-4 py-2">Experience</th>
                          <th className="border px-4 py-2">Salary</th>
                          <th className="border px-4 py-2">Actions</th>
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
                                  />
                              </td>
                              <td className="border border-gray-400 px-4 py-2">
                                  <input
                                      className="w-full"
                                      value={cat.breed}
                                      onChange={e => handleChangeTable(cat.id, "breed", e.target.value)}
                                  />
                              </td>
                              <td className="border border-gray-400 px-4 py-2">
                                  <input
                                      type="number"
                                      className="w-full"
                                      value={cat.years_of_experience}
                                      onChange={e => handleChangeTable(cat.id, "years_of_experience", e.target.value)}
                                  />
                              </td>
                              <td className="border border-gray-400 px-4 py-2">
                                  <input
                                      type="number"
                                      className="w-full"
                                      value={cat.salary}
                                      onChange={e => handleChangeTable(cat.id, "salary", e.target.value)}
                                  />
                              </td>
                              <td className="border px-4 py-2">
                                  <button className="bg-green-500 text-white w-[100px] h-full cursor-pointer hover:bg-green-600"
                                          onClick={() => handleSave(cat)}>
                                      Update
                                  </button>
                                  <button className="bg-red-500 text-white w-[100px] h-full cursor-pointer hover:bg-red-600"
                                          onClick={() => handleDelete(cat.id)}>
                                      Delete
                                  </button>
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
