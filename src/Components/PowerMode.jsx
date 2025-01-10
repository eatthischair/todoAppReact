import { useState } from 'react';
import { useTaskContext } from '../context/TaskContext';

const PowerMode = () => {
  const { setTaskArr, unfilteredTaskArr } = useTaskContext();
  const [powerModeOn, setPowerModeOn] = useState(false);

  const handlePowerMode = () => {
    setPowerModeOn(!powerModeOn);

    const powerModeTaskArr = [...unfilteredTaskArr]
      .filter((task) => task.done !== true)
      .sort((a, b) => {
        return b.powerLevel - a.powerLevel;
      })
      .slice(0, 1);

    setTaskArr((prevTaskArr) => {
      if (!powerModeOn) {
        return powerModeTaskArr;
      } else {
        return unfilteredTaskArr;
      }
    });
  };

  return (
    <div className="powerMode">
      <button onClick={() => handlePowerMode()}>Power Mode</button>
    </div>
  );
};

export default PowerMode;
