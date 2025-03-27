import React from 'react'
import styles from './Phase3.module.css'
import { Phase3Info } from './Data_Storage_Con'

function Phase3() {
  return (
    <>
    {Phase3Info.map((items, index)=>(
  <div key={index} className={styles.Phase3_main_container}>  
    <div className={styles.info_container1}>
     <div className={styles.info_box1}>
      <p className={styles.cheat_sheet1}>{items.heading1}</p>
      <h1 className={styles.cheat_sheet2}>{items.heading2}</h1>
      <p className={styles.cheat_sheet3}>{items.heading3}</p>
      <p className={styles.cheat_sheet3}>{items.heading4}</p>
     </div>
      <div className={styles.info_box2}>
        <div className={styles.icon_box1}></div>
          <h1 className={styles.cheat_sheet4}>{items.heading5}</h1>
      </div>
      <div className={styles.info_box2}>
        <div className={styles.icon_box1}></div>
          <h1 className={styles.cheat_sheet4}>{items.heading6}</h1>
      </div>
      <div className={styles.info_box2}>
        <div className={styles.icon_box1}></div>
          <h1 className={styles.cheat_sheet4}>{items.heading7}</h1>
      </div>
      <div className={styles.info_box2}>
        <div className={styles.icon_box1}></div>
          <h1 className={styles.cheat_sheet4}>{items.heading8}</h1>
      </div>
    </div>
    <div className={styles.info_container2}>
      <div className={styles.info_container2_part1}>
       <div className={styles.info_boxx1}></div>
    <div className={styles.info_boxx2}></div>
      </div>
      <div className={styles.info_container2_part2}>
      <div className={styles.info_boxx3}></div>
    <div className={styles.info_boxx4}></div>
      </div>
    </div>
  </div>
    ))}
    </>
  )
}

export default Phase3;