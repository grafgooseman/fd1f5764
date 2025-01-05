import React from 'react';
import { GitHub, Linkedin, Globe } from 'react-feather';

const Profile = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col items-center space-y-4">
        <img 
          src="https://avatars.githubusercontent.com/u/56235052?v=4"
          alt="Artem Gusev"
          className="w-32 h-32 rounded-full"
        />
        <div className="text-center">
          <h2 className="text-xl font-semibold text-theme-light-text-primary dark:text-theme-dark-text-primary">
            Artem Gusev
          </h2>
          <p className="text-theme-light-text-secondary dark:text-theme-dark-text-secondary">
            Software Developer
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm text-theme-light-text-secondary dark:text-theme-dark-text-secondary">
            Email
          </label>
          <input
            type="email"
            value="artemgusev2100@gmail.com"
            readOnly
            className="w-full px-3 py-2 bg-theme-light-bg-secondary dark:bg-theme-dark-bg-secondary 
              text-theme-light-text-primary dark:text-theme-dark-text-primary
              border border-theme-light-border-primary dark:border-theme-dark-border-primary rounded"
          />
        </div>

        <div className="space-y-4 pt-4">
          <a href="https://github.com/grafgooseman" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center space-x-3 text-theme-light-text-secondary dark:text-theme-dark-text-secondary hover:text-primary group"
          >
            <GitHub className="w-6 h-6 group-hover:text-primary" />
            <span className="group-hover:text-primary">github.com/grafgooseman</span>
          </a>
          
          <a href="https://linkedin.com/in/artem-gusev" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center space-x-3 text-theme-light-text-secondary dark:text-theme-dark-text-secondary hover:text-primary group"
          >
            <Linkedin className="w-6 h-6 group-hover:text-primary" />
            <span className="group-hover:text-primary">linkedin.com/in/artem-gusev</span>
          </a>
          
          <a href="https://artembuilds.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center space-x-3 text-theme-light-text-secondary dark:text-theme-dark-text-secondary hover:text-primary group"
          >
            <Globe className="w-6 h-6 group-hover:text-primary" />
            <span className="group-hover:text-primary">artembuilds.com</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Profile; 