import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import eventImage from '/src/assets/SARU-07.jpg';  // Adjust the path based on the folder structure

export default function RSVPForm() {
  const [attendanceStatus, setAttendanceStatus] = useState(null);
  const [fullName, setFullName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    Swal.fire({
      title: 'Submitting RSVP...',
      text: 'Please wait while we process your submission.',
      icon: 'info',
      showConfirmButton: false,
      willOpen: () => Swal.showLoading(),
    });

    const formData = new FormData(event.target);
    formData.append('access_key', 'e4ed5312-c63a-4b40-9e85-f92aa6fde0d4');
    formData.append('attendanceStatus', attendanceStatus);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();

      if (data.success) {
        Swal.fire('Success!', 'Your RSVP has been submitted.', 'success');
        event.target.reset();
      } else {
        Swal.fire('Error!', data.message, 'error');
      }
    } catch (error) {
      Swal.fire('Error!', 'Something went wrong. Please try again.', 'error');
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-10 px-6">
      <img src={eventImage} alt="Event Invitation" className="w-full max-w-3xl rounded-xl shadow-lg mb-6" />
      <motion.div initial={{ y: -20 }} animate={{ y: 0 }} transition={{ duration: 0.5 }} className="max-w-2xl w-full bg-white p-10 rounded-3xl shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-blue-800">🎤 Speaker Line-up</h2>
        <ul className="list-disc pl-6 text-gray-700 mt-4">
          <li><strong>Clint Readhead</strong> - 10:30 – 11:00</li>
          <li><strong>Isma-eel Dolie</strong> - 11:05 – 11:35</li>
          <li><strong>Prof Jon Patricios</strong> - 11:40 – 12:00</li>
          <li><strong>Rudi Van Rooyen</strong> - 13:05 – 13:25</li>
          <li><strong>Prof Ross Tucker</strong> - 13:30 – 14:00</li>
        </ul>
        <h2 className="text-3xl font-bold text-center text-blue-700 mt-8">📍 Event Location</h2>
        <p className="text-gray-700 text-center">📅 Date: 09 April 2025</p>
        <p className="text-gray-700 text-center">⏰ Time: 10:00 AM to 3:00 PM</p>
        <p className="text-gray-700 text-center">📍 Venue: The Villa Arcadia, No. 22 Oxford Road, Parktown, 2193</p>
        <a href="https://maps.google.com/?q=-26.174562,28.041109" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline mt-2 block text-center">View on Google Maps</a>
        <h2 className="text-3xl font-bold text-center text-blue-700 mt-8">✨ RSVP Now</h2>
        <p className="text-gray-600 text-center mb-4">Confirm your attendance below</p>
        <div className="mb-6 flex justify-center gap-6">
          <button onClick={() => setAttendanceStatus('Yes')} className={`px-6 py-3 rounded-lg border ${attendanceStatus === 'Yes' ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 border-blue-600'}`}>✅ Attending</button>
          <button onClick={() => setAttendanceStatus('No')} className={`px-6 py-3 rounded-lg border ${attendanceStatus === 'No' ? 'bg-red-600 text-white' : 'bg-white text-red-600 border-red-600'}`}>❌ Not Attending</button>
        </div>
        {attendanceStatus && (
          <motion.form initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} onSubmit={handleSubmit} className="mt-4">
            <div className="mb-4">
              <label className="block text-gray-700">Full Name</label>
              <input type="text" name="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full px-4 py-3 border rounded-lg mt-2" placeholder="Enter your name" required />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email Address</label>
              <input type="email" name="emailAddress" value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)} className="w-full px-4 py-3 border rounded-lg mt-2" placeholder="Enter your email" required />
            </div>
            <button type="submit" className="w-full py-3 px-4 bg-blue-700 text-white rounded-lg mt-4 text-lg font-semibold">Submit RSVP</button>
          </motion.form>
        )}
      </motion.div>
    </motion.div>
  );
}