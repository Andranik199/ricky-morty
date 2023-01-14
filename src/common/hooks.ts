import { useState } from 'react';

export const useActionDelay = (action: (args: any) => void): ((args: any) => void) => {
  const [timer, setTimer] = useState<NodeJS.Timeout>();
  return (args) => {
    clearTimeout(timer);

    const newTimer = setTimeout(() => action(args), 500);

    setTimer(newTimer);
  };
};
