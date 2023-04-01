import * as React from 'react';
import '../Styles/Timelapse.css';
import { gsap } from 'gsap';

import Circle from './Circle';
import gData from '../Variables/Variables';
import * as Calcs from './Calculations';

const Timelapse = () => {   
    // useEffect
    const elem = React.useRef(null);
    let [radian, setRadian] = React.useState<number>(0.0);
    let [data, setData] = React.useState<string>("");

    React.useEffect(() => {
        setInterval(() => setRadian(gData.currentRadian));
        setInterval(() => setData(Calcs.calculateDatas(gData.chosenIndex - 1).beginData 
        + " - " + Calcs.calculateDatas(gData.chosenIndex - 1).endData))
        gsap.to ((elem.current), {
            rotate: -gData.currentDegree + "deg"
        });
    })

    return(
        <div className='timelapse'>
            <div className="data-screen">
                <h1>{data}</h1>
            </div>
            <div className="timelapse-circle" ref={el => elem.current = el}>
                {gData.timelapseData.Slides.map((val, ind, arr) => (
                    <>
                        <Circle index={ind + 1} max={arr.length} 
                                currentRadian={radian} padding={4}
                                backIndex={arr.length - (arr.length - ind)}
                                forwardIndex={ind + 2}
                                />
                    </>
                ))
                }
            </div>
        </div>
    )
};

export default Timelapse;