import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Slider from './Components/Slider';
import Timelapse from './Components/Timelapse';
import Info from './Components/Info';

import gData from './Variables/Variables';
import './Styles/index.css';

import { useMediaQuery } from 'react-responsive';
import { calculateDatas } from './Components/Calculations';

const DesktopView = () => {
    return (
        <>
            <div className='block'>
                <div className="upperBlock">
                    <div className="upLeftBlock">
                        <h2>Timelapse</h2>
                        <Info/>
                    </div>
                    <Timelapse />
                </div>
                <Slider slides={gData.timelapseData}/>
            </div>
        </>
    )
}
const MobileView = () => {
    const [title, setTitle] = React.useState("");

    React.useEffect(() => {
        setInterval(() => setTitle(
            calculateDatas(gData.chosenIndex - 1).beginData + "-" +
            calculateDatas(gData.chosenIndex - 1).endData
        ))
    })

    return (
        <>
            <h1>Timelapse</h1>
            <div className='timelapse-mobile'>
                <h1>{title}</h1>
            </div>
            <Slider slides={gData.timelapseData}/>
            <Info/>
        </>
    )
}

const App = () => {
    const isDesktop = useMediaQuery({
        query: "(min-width: 786px)"
    });

    return (
        <>
            {
                isDesktop ? <DesktopView /> : <MobileView />
            }
        </>
    )
}

ReactDOM.render(
    <><App/></>
    ,document.getElementById("root")
)