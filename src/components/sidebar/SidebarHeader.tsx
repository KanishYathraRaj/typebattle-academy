
import React from 'react';
import { Code } from 'lucide-react';

const SidebarHeader: React.FC = () => {
  return (
    <div className="flex items-center mb-6">
      <Code className="h-5 w-5 mr-2 text-primary" />
      <h2 className="text-xl font-bold">NeetCode DSA</h2>
    </div>
  );
};

export default SidebarHeader;
