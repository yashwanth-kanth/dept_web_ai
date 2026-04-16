import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { apiFetch } from '../lib/api';

const WHATSAPP_LINK = 'https://chat.whatsapp.com/KmHdPs7hSdz5dr5O1DPEsD';

const inputClass =
  'w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent transition placeholder-gray-400';

const labelClass = 'block text-sm font-bold text-gray-800 mb-1 uppercase tracking-wide';

export default function SchoolProgramRegForm() {
  const [form, setForm] = useState({
    expected_cutoff: '',
    name: '',
    dob: '',
    email: '',
    student_mobile: '',
    parent_mobile: '',
    school_name: '',
    residential_address: '',
    referred_by: '',
    group_studied: '',
    joined_whatsapp: false,
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await apiFetch.post('/api/school-reg', form);
      setSuccess(true);
    } catch (err) {
      setError(err?.error || 'Submission failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl p-10 max-w-md w-full text-center"
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight mb-2">
            Registration Successful!
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Thank you for registering. We will get in touch with you soon.
          </p>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block w-full py-3 bg-green-500 hover:bg-green-600 text-white font-black rounded-xl text-sm uppercase tracking-wide transition"
          >
            Join WhatsApp Group
          </a>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-2xl mx-auto"
      >
        {/* Header */}
        <div className="bg-red-900 rounded-t-2xl px-8 py-8 text-white text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-red-300 mb-2">
            Organized by
          </p>
          <h1 className="text-xl md:text-2xl font-black uppercase tracking-tight leading-tight">
            Department of Artificial Intelligence and Data Science
          </h1>
          <p className="text-sm font-bold text-red-200 mt-1 uppercase tracking-widest">
            RAMCO INSTITUTE OF TECHNOLOGY
          </p>
          <div className="mt-4 pt-4 border-t border-red-700">
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter">
              School Program Registration
            </h2>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-b-2xl shadow-xl px-8 py-8 space-y-6"
        >
          {/* Expected Cutoff */}
          <div>
            <label className={labelClass}>
              Expected Engineering Cutoff <span className="text-red-600">*</span>
            </label>
            <p className="text-xs text-gray-400 mb-2">e.g. 175</p>
            <input
              type="text"
              name="expected_cutoff"
              value={form.expected_cutoff}
              onChange={handleChange}
              required
              placeholder="175"
              className={inputClass}
            />
          </div>

          {/* Name */}
          <div>
            <label className={labelClass}>
              Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Your full name"
              className={inputClass}
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label className={labelClass}>
              Date of Birth <span className="text-red-600">*</span>
            </label>
            <p className="text-xs text-gray-400 mb-2">e.g. 01.01.2001</p>
            <input
              type="text"
              name="dob"
              value={form.dob}
              onChange={handleChange}
              required
              placeholder="DD.MM.YYYY"
              className={inputClass}
            />
          </div>

          {/* Email */}
          <div>
            <label className={labelClass}>
              Email Id <span className="text-red-600">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
              className={inputClass}
            />
          </div>

          {/* Student Mobile */}
          <div>
            <label className={labelClass}>
              Student Mobile Number <span className="text-red-600">*</span>
            </label>
            <input
              type="tel"
              name="student_mobile"
              value={form.student_mobile}
              onChange={handleChange}
              required
              placeholder="10-digit mobile number"
              className={inputClass}
            />
          </div>

          {/* Parent Mobile */}
          <div>
            <label className={labelClass}>
              Parent Mobile Number <span className="text-red-600">*</span>
            </label>
            <input
              type="tel"
              name="parent_mobile"
              value={form.parent_mobile}
              onChange={handleChange}
              required
              placeholder="10-digit mobile number"
              className={inputClass}
            />
          </div>

          {/* School Name */}
          <div>
            <label className={labelClass}>
              School Name, Location <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="school_name"
              value={form.school_name}
              onChange={handleChange}
              required
              placeholder="e.g. Government Higher Secondary School, Sivakasi"
              className={inputClass}
            />
          </div>

          {/* Residential Address */}
          <div>
            <label className={labelClass}>
              Residential Address with Exact Location <span className="text-red-600">*</span>
            </label>
            <p className="text-xs text-gray-400 mb-2">
              Transport arrangement purpose &mdash; e.g. Reserve line, Sivakasi
            </p>
            <textarea
              name="residential_address"
              value={form.residential_address}
              onChange={handleChange}
              required
              rows={3}
              placeholder="e.g. Reserve line, Sivakasi"
              className={inputClass + ' resize-none'}
            />
          </div>

          {/* Referred By */}
          <div>
            <label className={labelClass}>
              Referred By
            </label>
            <p className="text-xs text-gray-400 mb-2">e.g. Name, II year, RIT</p>
            <input
              type="text"
              name="referred_by"
              value={form.referred_by}
              onChange={handleChange}
              placeholder="e.g. Karthik, II year, RIT"
              className={inputClass}
            />
          </div>

          {/* Group Studied */}
          <div>
            <label className={labelClass}>
              Group Studied <span className="text-red-600">*</span>
            </label>
            <div className="mt-2 space-y-3">
              {['Bio - Maths', 'Computer Science - Maths', 'Vocational'].map((group) => (
                <label
                  key={group}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer transition ${
                    form.group_studied === group
                      ? 'border-red-700 bg-red-50'
                      : 'border-gray-200 hover:border-red-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="group_studied"
                    value={group}
                    checked={form.group_studied === group}
                    onChange={handleChange}
                    required
                    className="accent-red-700 w-4 h-4"
                  />
                  <span className="text-sm font-bold text-gray-800">{group}</span>
                </label>
              ))}
            </div>
          </div>

          {/* WhatsApp */}
          <div className="border border-green-200 bg-green-50 rounded-xl p-5">
            <p className="text-sm font-black text-gray-800 uppercase tracking-wide mb-3">
              Join the WhatsApp Group <span className="text-red-600">*</span>
            </p>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-500 hover:bg-green-600 text-white font-black text-sm rounded-xl transition mb-3"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Join WhatsApp Group
            </a>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="joined_whatsapp"
                checked={form.joined_whatsapp}
                onChange={handleChange}
                className="accent-green-600 w-4 h-4"
              />
              <span className="text-sm text-gray-700 font-medium">I have joined the WhatsApp group</span>
            </label>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm font-medium rounded-lg px-4 py-3">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 bg-red-900 hover:bg-red-800 disabled:opacity-60 text-white font-black text-sm uppercase tracking-widest rounded-xl transition shadow-lg"
          >
            {submitting ? 'Submitting...' : 'Submit Registration'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
