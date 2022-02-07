import React from 'react';

function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "lightgreen" : "grey"
    }
    function handleclick() {
        props.holdDice(props.id)
    }
    return (
        <div className="die-face" 
             style={styles}
             onClick={handleclick}>
            {props.num}
        </div>
    )
}

export default Die