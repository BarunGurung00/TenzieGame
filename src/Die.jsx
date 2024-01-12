import React from 'react'

const Die = (props) => {
    const styles = {
        backgroundColor: props.isHeld ? "skyblue" : "white"
    }
  return (
    <div style={styles} onClick={props.hold} className="w-[18%] h-14 flex justify-center items-center shadow rounded-md cursor-pointer bg-slate-50">
        <h2 className="text-2xl">{props.value}</h2>
    </div>
  )
}

export default Die
