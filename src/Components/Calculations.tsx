import gData from '../Variables/Variables'

const calculateDatas = (ind) => {
    const beginData = gData.timelapseData.Slides[ind].Data[0].Title;
    const endData = gData.timelapseData.Slides[ind].Data[
        gData.timelapseData.Slides[ind].Data.length - 1
    ].Title;

    return {beginData, endData};
}

const clickResponse = (index) => {
    console.log(`You've clicked on ${index}\n
                 Chosen Index is ${gData.chosenIndex}`);

    let lastTaughtIndex = gData.chosenIndex;  
    let difIndex = index - gData.chosenIndex;
    
    console.log(` lastTaught is ${lastTaughtIndex}
                  chosenIndex is ${gData.chosenIndex}                        
                  difIndex is ${difIndex}`);
    
    if (index == gData.timelapseData.Slides.length && lastTaughtIndex == 1) {
        gData.currentRadian -= gData.partOfCircle*1;
        gData.currentDegree -= (360 / gData.timelapseData.Slides.length)*1;  
    } else if(index == 1 && lastTaughtIndex == gData.timelapseData.Slides.length) {
        gData.currentRadian += gData.partOfCircle*1;
        gData.currentDegree += (360 / gData.timelapseData.Slides.length)*1;
    }
    else {
        gData.currentRadian += gData.partOfCircle*difIndex;
        gData.currentDegree += (360 / gData.timelapseData.Slides.length)*difIndex;   // IT WORKS AS LONG AS WE ROTATE FROM BELOW!            
    }
    gData.chosenIndex = index;   
    
    console.log(`Radian evaluated to ${gData.currentRadian} and ${gData.currentDegree}`);

}

const move = (ind) => {
    let toMove = 0;
    if (ind > gData.timelapseData.Slides.length) {
        toMove = 1;
    } 
    else if (ind < 1) {
        toMove = gData.timelapseData.Slides.length;
    }
    else {
        toMove = ind;
    }
    clickResponse(toMove);
}

export { calculateDatas, clickResponse, move };