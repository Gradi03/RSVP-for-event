import React, { useState } from 'react';
import Swal from 'sweetalert2';

export default function Contact() {
  const [attending, setAttending] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dietary, setDietary] = useState('');
  const [result, setResult] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();

    // Show SweetAlert during processing
    Swal.fire({
      title: 'Processing...',
      text: 'Please wait while we submit your information.',
      icon: 'info',
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading();
      },
    });

    const formData = new FormData(event.target);
    formData.append("access_key", "e4ed5312-c63a-4b40-9e85-f92aa6fde0d4");  // Replace with your Web3Forms access key

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setResult("Form Submitted Successfully");
        Swal.fire({
          title: 'Success!',
          text: 'Your RSVP has been successfully submitted.',
          icon: 'success',
          confirmButtonText: 'OK',
        });
      } else {
        console.log("Error", data);
        setResult(data.message);
        Swal.fire({
          title: 'Error!',
          text: data.message,
          icon: 'error',
          confirmButtonText: 'Try Again',
        });
      }
    } catch (error) {
      console.log("Error", error);
      setResult("Something went wrong. Please try again later.");
      Swal.fire({
        title: 'Error!',
        text: 'Something went wrong. Please try again later.',
        icon: 'error',
        confirmButtonText: 'Try Again',
      });
    }

    // Reset the form
    event.target.reset();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-6">
      <div className="max-w-md w-full bg-white p-6 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-4">RSVP for Event</h1>
        <p className="text-gray-600 text-center mb-4">Please confirm your attendance</p>

        <div className="mb-6 text-center">
          <button
            className={`px-4 py-2 rounded-lg border ${attending === 'Yes' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'} mr-4`}
            onClick={() => setAttending('Yes')}
          >
            Yes
          </button>
          <button
            className={`px-4 py-2 rounded-lg border ${attending === 'No' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
            onClick={() => setAttending('No')}
          >
            No
          </button>
        </div>

        {attending === 'Yes' && (
          <form onSubmit={onSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Your Name</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg mt-2"
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Email Address</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg mt-2"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Dietary Requirements (Optional)</label>
              <textarea
                name="dietary"
                value={dietary}
                onChange={(e) => setDietary(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg mt-2"
                placeholder="Any dietary requirements?"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg mt-4"
            >
              Submit RSVP
            </button>
          </form>
        )}

        {result && (
          <div className="mt-4 text-center text-gray-700">
            <span>{result}</span>
          </div>
        )}
      </div>
    </div>
  );
}
