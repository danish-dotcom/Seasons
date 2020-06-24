import React from 'react'

const seasonConfig = {
    summer: {
        text: "It's Summer",
        iconName: 'sun'
    },
    winter: {
        text: "It's Winter",
        iconName: 'snowflake'
    }
}

const Season = (props) => {
    const { text, iconName } = seasonConfig[props.season()];
    // console.log (props.season)

    return (
        <div>
            <i className={`icon-left massive ${iconName} icon`}></i>
            <p className="px-2 pt-4"> {text} </p>
        </div>
    )
}

export default Season;