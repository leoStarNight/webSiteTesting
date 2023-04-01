import * as React from 'react';
import gData from '../Variables/Variables';
import '../Styles/Info.css';
import { clickResponse, move } from './Calculations';

const Info = () => {
    const [number, setNumber] = React.useState(gData.chosenIndex);

    React.useEffect(() => {
        setInterval(() => setNumber(gData.chosenIndex))
    })
    
    const onClickLeft = () => {
        move(gData.chosenIndex - 1);
    }
    const onClickRight = () => {
        move(gData.chosenIndex + 1);
    }

    return (
        <>
            <div className="downLeftBlock">
                <h2>{gData.chosenIndex} / {gData.timelapseData.Slides.length}</h2>
                <div className='buttonSlides'>
                    <span onClick={onClickLeft}><p>{"<"}</p></span>
                    <span onClick={onClickRight}><p>{">"}</p></span>
                </div>
           </div>
        </>
    )
}

export default Info;