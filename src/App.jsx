import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';

export default function Contact() {
  const [attending, setAttending] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dietary, setDietary] = useState('');
  const [result, setResult] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();

    Swal.fire({
      title: 'Processing...',
      text: 'Please wait while we submit your RSVP.',
      icon: 'info',
      showConfirmButton: false,
      willOpen: () => Swal.showLoading(),
    });

    const formData = new FormData(event.target);
    formData.append("access_key", "e4ed5312-c63a-4b40-9e85-f92aa6fde0d4");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (data.success) {
        setResult("Form Submitted Successfully");
        Swal.fire('Success!', 'Your RSVP has been submitted.', 'success');
        event.target.reset();
      } else {
        setResult(data.message);
        Swal.fire('Error!', data.message, 'error');
      }
    } catch (error) {
      setResult("Something went wrong. Please try again.");
      Swal.fire('Error!', 'Something went wrong. Please try again.', 'error');
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-6 px-4">
      <motion.div initial={{ y: -20 }} animate={{ y: 0 }} transition={{ duration: 0.5 }} className="max-w-lg w-full bg-white p-6 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-4">RSVP for Event</h1>
        <p className="text-gray-600 text-center mb-4">Please confirm your attendance</p>

        <div className="mb-6 text-center">
          <button onClick={() => setAttending('Yes')} className={`px-4 py-2 rounded-lg border ${attending === 'Yes' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'} mr-4`}>Yes</button>
          <button onClick={() => setAttending('No')} className={`px-4 py-2 rounded-lg border ${attending === 'No' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}>No</button>
        </div>

        {attending === 'Yes' && (
          <motion.form initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} onSubmit={onSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Your Name</label>
              <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-2 border rounded-lg mt-2" placeholder="Enter your name" required />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email Address</label>
              <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 border rounded-lg mt-2" placeholder="Enter your email" required />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Dietary Requirements (Optional)</label>
              <textarea name="dietary" value={dietary} onChange={(e) => setDietary(e.target.value)} className="w-full px-4 py-2 border rounded-lg mt-2" placeholder="Any dietary requirements?" />
            </div>
            <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg mt-4">Submit RSVP</button>
          </motion.form>
        )}

        {result && <div className="mt-4 text-center text-gray-700">{result}</div>}
      </motion.div>

      {/* Speaker Schedule */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="max-w-lg w-full bg-white p-6 rounded-xl shadow-lg mt-6">
        <h2 className="text-xl font-semibold text-center text-blue-600">Speaker Schedule</h2>
        <ul className="mt-4 text-gray-700 text-center">
          <li>🔹 Clint - 10:30 - 11:00</li>
          <li>🔹 Isma - 11:05 - 11:35</li>
          <li>🔹 Prof Jon - 11:40 - 12:00</li>
          <li>🔹 Rudi - 13:05 - 13:25</li>
          <li>🔹 Prof Ross - 13:30 - 14:00</li>
        </ul>
      </motion.div>

      {/* Event Location */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="max-w-lg w-full bg-white p-6 rounded-xl shadow-lg mt-6">
        <h2 className="text-xl font-semibold text-center text-blue-600">Event Location</h2>
        <p className="text-center text-gray-700 mt-2">📍 Villa Arcadia, Parktown, Johannesburg, 2193</p>
        <div className="text-center mt-2">
          <a href="https://maps.google.com/?q=-26.174562,28.041109" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">View on Google Maps</a>
        </div>
      </motion.div>
    </motion.div>
  );
}