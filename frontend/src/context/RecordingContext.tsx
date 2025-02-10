import React, { createContext, useContext, useState } from 'react';

interface RecordingContextProps {
  isRecordingMode: boolean;
  enterRecordingMode: () => void;
  exitRecordingMode: () => void;
}

const RecordingContext = createContext<RecordingContextProps | undefined>(undefined);

export const RecordingProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [isRecordingMode, setIsRecordingMode] = useState(false);

  const enterRecordingMode = () => setIsRecordingMode(true);
  const exitRecordingMode = () => setIsRecordingMode(false);

  return (
    <RecordingContext.Provider value={{ isRecordingMode, enterRecordingMode, exitRecordingMode}}>
      {children}
    </RecordingContext.Provider>
  )
}

export const useRecordingContext = () => {
  const context = useContext(RecordingContext);
  if(!context) {
    throw new Error("useRecordingContext must be used within RecordingProvider");
  }
  return context;
}