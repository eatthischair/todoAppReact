import {useState} from 'react';


const PowerMode = ({taskArr, setTaskArr, unfilteredTaskArr, setUnfilteredTaskArr}) => {


  // console.log('unfiltered task arr', unfilteredTaskArr, 'aaa', [...unfilteredTaskArr].sort((a, b) => {return b.powerLevel - a.powerLevel}));

  const [powerModeOn, setPowerModeOn] = useState(false);

  const handlePowerMode = () => {
    setPowerModeOn(!powerModeOn);

    const powerModeTaskArr = [...unfilteredTaskArr].filter((task) => task.done !== true).sort((a, b) => {return b.powerLevel - a.powerLevel}).slice(0, 1);

    setTaskArr((prevTaskArr) => {
      if (!powerModeOn) {
        // console.log('power mode', powerModeOn, powerModeTaskArr)
        return powerModeTaskArr
      } else {
        return unfilteredTaskArr;
      }
    });

  }


  return (
    <div class='powerMode'>
    <button onClick={() => handlePowerMode()}>Power Mode</button>
    </div>
  )

}

export default PowerMode;
