import React, { createContext, useContext, useState } from 'react';

interface ForumContextType {
  campus: string | undefined;
  category: string | undefined;
  setCampus: (campus: string | undefined) => void;
  setCategory: (category: string | undefined) => void;
}

const ForumContext = createContext<ForumContextType | undefined>(undefined);

export const ForumProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [campus, setCampus] = useState<string | undefined>(undefined);
  const [category, setCategory] = useState<string | undefined>(undefined);

  return (
    <ForumContext.Provider value={{ campus, category, setCampus, setCategory }}>
      {children}
    </ForumContext.Provider>
  );
};

export const useForum = () => {
  const context = useContext(ForumContext);
  if (!context) {
    throw new Error('useForum must be used within a ForumProvider');
  }
  return context;
};