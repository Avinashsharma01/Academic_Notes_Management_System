import React from 'react'
import styles from './Phase5.module.css'
import { Phase5Info } from './Data_Storage_Con'

function Phase5() {
  return (
    <>
    {Phase5Info.map((items)=>(
  <div className={styles.Phase5_main_container}>
    <h1 className={styles.cheat_sheet1}>{items.heading1}</h1>
    <p className={styles.cheat_sheet2}>{items.heading2}</p>
      <div className={styles.info_container}>
        <div className={styles.image_box1}></div>
        <div className={styles.info_box1}></div>
      </div>
      <div className={styles.info_container}>
        <div className={styles.info_box2}></div>
        <div className={styles.image_box2}></div>
      </div>
      <div className={styles.info_container}>
        <div className={styles.image_box3}></div>
        <div className={styles.info_box3}></div>
      </div>
  </div>
    ))} 
    </>
  )
}

export default Phase5