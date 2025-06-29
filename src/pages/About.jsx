// src/pages/About.jsx
import React from 'react';

const About = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 text-gray-800">
      <h1 className="text-4xl font-bold text-orange-600 mb-6">About RecipeHub</h1>

      <p className="text-lg mb-6 leading-relaxed">
        <strong>RecipeHub</strong> is a full-stack recipe management web application developed as part of the Design Engineering – II subject (Code: 3160001) for the sixth semester of Gujarat Technological University (GTU). 
        The project was created by a group of students from SAL Institute of Technology and Engineering Research.
      </p>

      <div className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">👨‍🎓 Project Team & Responsibilities</h2>
        <ul className="list-disc list-inside text-gray-700 leading-loose">
          <li><strong>Anish Karlekar</strong> (230673131011) – Project Lead: Site map, backend development & routing</li>
          <li><strong>Vinit Modi</strong> (230673131015) – Frontend development using React.js and Tailwind CSS</li>
          <li><strong>Meet Panchal</strong> (230673131014) – Testing & validation of functionalities and user flows</li>
          <li><strong>Vidhi Patel</strong> (230673131021) – Canvas preparation and documentation</li>
        </ul>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">🌐 Frontend</h2>
        <ul className="list-disc list-inside text-gray-700 leading-loose">
          <li>React.js (with Vite)</li>
          <li>React Router DOM for dynamic routing</li>
          <li>Tailwind CSS for utility-first styling</li>
          <li>Lucide-react for iconography</li>
          <li>Component-based UI design (Header, Footer, Carousel, Modal, etc.)</li>
        </ul>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">⚙️ Backend</h2>
        <ul className="list-disc list-inside text-gray-700 leading-loose">
          <li>Node.js with Express.js framework</li>
          <li>MongoDB for database management (via Mongoose)</li>
          <li>Session-based authentication using express-session</li>
          <li>Custom OTP login flow implemented with Nodemailer</li>
          <li>RESTful API architecture with role-based access control</li>
        </ul>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">📦 Notable Packages Used</h2>
        <ul className="list-disc list-inside text-gray-700 leading-loose">
          <li><code>express</code>, <code>mongoose</code>, <code>dotenv</code>, <code>cors</code></li>
          <li><code>express-session</code> for session handling</li>
          <li><code>nodemailer</code> for email-based OTP system</li>
          <li><code>lucide-react</code> for clean and responsive icons</li>
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">🎓 Academic Context</h2>
        <p className="text-gray-700 leading-relaxed">
          This project was developed under the guidance of faculty as part of the subject <strong>Design Engineering – II</strong> (Course Code: <strong>3160001</strong>) during the sixth semester of the undergraduate program in Computer Engineering at SAL Institute of Technology and Engineering Research, affiliated with Gujarat Technological University (GTU).
        </p>
      </div>
    </div>
  );
};

export default About;
