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
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-700 to-blue-900 py-10 px-6">
      <motion.div initial={{ y: -20 }} animate={{ y: 0 }} transition={{ duration: 0.5 }} className="max-w-2xl w-full bg-white p-10 rounded-3xl shadow-2xl">
        <h2 className="text-4xl font-bold text-center text-blue-800">🌟 You're Invited to the Hollard Group Risk Concussion Workshop</h2>
        <p className="text-center text-gray-600 mt-4 mb-6">Join us for an insightful event featuring top industry experts discussing concussion management in sports.</p>
        
        <div className="mb-6 bg-gray-100 p-4 rounded-lg">
          <h3 className="text-xl font-semibold text-blue-700">📅 Event Details</h3>
          <p className="text-gray-700">🗓 <strong>Date:</strong> 09 April 2025</p>
          <p className="text-gray-700">⏰ <strong>Time:</strong> 10:00 AM - 3:00 PM</p>
          <p className="text-gray-700">📍 <strong>Venue:</strong> The Villa Arcadia, No. 22 Oxford Road, Parktown, 2193</p>
          <a href="https://maps.google.com/?q=-26.174562,28.041109" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold underline block mt-2 text-center">📍 View on Google Maps</a>
        </div>

        <div className="mb-6 bg-gray-100 p-4 rounded-lg">
          <h3 className="text-xl font-semibold text-blue-700">🎤 Speaker Line-up</h3>
          <ul className="list-disc pl-6 text-gray-700">
            <li><strong>Clint Readhead</strong>: SA Rugby concussion management (10:30 – 11:00)</li>
            <li><strong>Isma-eel Dolie</strong>: Player Welfare and rest arrangements (11:05 – 11:35)</li>
            <li><strong>Prof Jon Patricios</strong>: Concussion research & management (11:40 – 12:00)</li>
            <li><strong>Rudi Van Rooyen</strong>: Insurance solutions for players (13:05 – 13:25)</li>
            <li><strong>Prof Ross Tucker</strong>: IMG technology & player safety (13:30 – 14:00)</li>
          </ul>
        </div>

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
            {attendanceStatus === 'Yes' && (
              <div className="mb-4">
                <label className="block text-gray-700">Dietary Preferences (Optional)</label>
                <textarea name="dietaryPreferences" value={dietaryPreferences} onChange={(e) => setDietaryPreferences(e.target.value)} className="w-full px-4 py-3 border rounded-lg mt-2" placeholder="Any dietary requirements?" />
              </div>
            )}
            <button type="submit" className="w-full py-3 px-4 bg-blue-700 text-white rounded-lg mt-4 text-lg font-semibold">Submit RSVP</button>
          </motion.form>
        )}

        {formMessage && <div className="mt-4 text-center text-green-600 font-semibold">{formMessage}</div>}
      </motion.div>
    </motion.div>
  );
}
