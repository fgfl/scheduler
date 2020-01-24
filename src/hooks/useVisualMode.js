import {useState} from 'react';

const useVisualMode = (initialMode) => {
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);

  /**
   * 
   * @param {''} newMode
   * @param {Boolean} replace=false - replace the last element in history?
   */
  const transition = (newMode, replace = false) => {
    setMode(newMode);
    setHistory(prev => {
      const newHistory = [...prev]
      
      if (replace) {
        newHistory.splice(-1, 1, newMode);
      } else {
        newHistory.push(newMode);
      }

      return newHistory;
    });
  };

  const back = () => {
    if (history.length <= 1) {
      return;
    }
    const newHistory = [...history];
    newHistory.pop();
    setMode(newHistory[newHistory.length - 1]);
    setHistory(newHistory);
  };
  
  return {
    mode,
    transition,
    back,
  };
};

export default useVisualMode;