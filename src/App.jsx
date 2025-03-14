import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';

export default function RSVPForm() {
  const [attendanceStatus, setAttendanceStatus] = useState(null);
  const [fullName, setFullName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [dietaryPreferences, setDietaryPreferences] = useState('');
  const [formMessage, setFormMessage] = useState('');

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
        setFormMessage('RSVP submitted successfully!');
        Swal.fire('Success!', 'Your RSVP has been submitted.', 'success');
        event.target.reset();
      } else {
        setFormMessage(data.message);
        Swal.fire('Error!', data.message, 'error');
      }
    } catch (error) {
      setFormMessage('An error occurred. Please try again.');
      Swal.fire('Error!', 'Something went wrong. Please try again.', 'error');
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-10 px-6">
      <motion.div initial={{ y: -20 }} animate={{ y: 0 }} transition={{ duration: 0.5 }} className="max-w-lg w-full bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center text-blue-700">Event Details</h2>
        <div className="mt-4 text-gray-700 text-center">
          <h3 className="text-lg font-semibold">📢 Speaker Schedule</h3>
          <ul className="mt-2">
            <li>🔹 Clint - 10:30 - 11:00</li>
            <li>🔹 Isma - 11:05 - 11:35</li>
            <li>🔹 Prof Jon - 11:40 - 12:00</li>
            <li>🔹 Rudi - 13:05 - 13:25</li>
            <li>🔹 Prof Ross - 13:30 - 14:00</li>
          </ul>
        </div>

        <div className="text-center mt-6">
          <h3 className="text-lg font-semibold">📍 Event Location</h3>
          <p className="text-gray-700">Villa Arcadia, Parktown, Johannesburg, 2193</p>
          <a href="https://maps.google.com/?q=-26.174562,28.041109" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline mt-2 inline-block">View on Google Maps</a>
        </div>

        <h2 className="text-2xl font-bold text-center text-blue-700 mt-8">RSVP for the Event</h2>
        <p className="text-gray-600 text-center mb-4">Confirm your attendance below</p>

        <div className="mb-6 text-center">
          <button onClick={() => setAttendanceStatus('Yes')} className={`px-4 py-2 rounded-lg border ${attendanceStatus === 'Yes' ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 border-blue-600'} mr-4`}>Yes</button>
          <button onClick={() => setAttendanceStatus('No')} className={`px-4 py-2 rounded-lg border ${attendanceStatus === 'No' ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 border-blue-600'}`}>No</button>
        </div>

        {attendanceStatus && (
          <motion.form initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} onSubmit={handleSubmit} className="mt-4">
            <div className="mb-4">
              <label className="block text-gray-700">Full Name</label>
              <input type="text" name="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full px-4 py-2 border rounded-lg mt-2" placeholder="Enter your name" required />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email Address</label>
              <input type="email" name="emailAddress" value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)} className="w-full px-4 py-2 border rounded-lg mt-2" placeholder="Enter your email" required />
            </div>
            {attendanceStatus === 'Yes' && (
              <div className="mb-4">
                <label className="block text-gray-700">Dietary Preferences (Optional)</label>
                <textarea name="dietaryPreferences" value={dietaryPreferences} onChange={(e) => setDietaryPreferences(e.target.value)} className="w-full px-4 py-2 border rounded-lg mt-2" placeholder="Any dietary requirements?" />
              </div>
            )}
            {attendanceStatus === 'No' && (
              <p className="text-red-500 text-center">Please fill out the form to confirm your non-attendance.</p>
            )}
            <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg mt-4">Submit RSVP</button>
          </motion.form>
        )}

        {formMessage && <div className="mt-4 text-center text-gray-700">{formMessage}</div>}
      </motion.div>
    </motion.div>
  );
}