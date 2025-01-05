import React from 'react';
import { GitHub, Linkedin, FileText } from 'react-feather';

const Profile = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
          <span className="text-4xl text-gray-500">JD</span>
        </div>
        <h2 className="text-xl font-semibold text-theme-light-text-primary dark:text-theme-dark-text-primary">
          John Doe
        </h2>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm text-theme-light-text-secondary dark:text-theme-dark-text-secondary">
            Phone
          </label>
          <input
            type="tel"
            value="+1 (555) 123-4567"
            readOnly
            className="w-full px-3 py-2 bg-theme-light-bg-secondary dark:bg-theme-dark-bg-secondary 
              text-theme-light-text-primary dark:text-theme-dark-text-primary
              border border-theme-light-border-primary dark:border-theme-dark-border-primary rounded"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-theme-light-text-secondary dark:text-theme-dark-text-secondary">
            Email
          </label>
          <input
            type="email"
            value="john.doe@example.com"
            readOnly
            className="w-full px-3 py-2 bg-theme-light-bg-secondary dark:bg-theme-dark-bg-secondary 
              text-theme-light-text-primary dark:text-theme-dark-text-primary
              border border-theme-light-border-primary dark:border-theme-dark-border-primary rounded"
          />
        </div>

        <div className="flex justify-center space-x-6 pt-4">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer"
            className="text-theme-light-text-secondary dark:text-theme-dark-text-secondary hover:text-primary">
            <GitHub className="w-6 h-6" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
            className="text-theme-light-text-secondary dark:text-theme-dark-text-secondary hover:text-primary">
            <Linkedin className="w-6 h-6" />
          </a>
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer"
            className="text-theme-light-text-secondary dark:text-theme-dark-text-secondary hover:text-primary">
            <FileText className="w-6 h-6" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Profile; 