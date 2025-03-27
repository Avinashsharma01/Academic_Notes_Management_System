import React from 'react'
import styles from './Phase4.module.css'
import { Phase4Info } from './Data_Storage_con'

function Phase4() {
  return (
    <>
    {Phase4Info.map((items)=>(
    <div className={styles.Phase4_main_container}>
      <div className={styles.info_container1}>
        <div className={styles.image_par1}>
          <div className={styles.image_box1}></div>
          <div className={styles.image_box2}></div>
        </div>
        <div className={styles.image_par2}>
        <div className={styles.image_box3}></div>
        </div>
      </div>
      <div className={styles.info_container2}>
        <h1 className={styles.cheat_sheet1}>{items.heading1}</h1>
        <p className={styles.cheat_sheet2}>{items.heading2}</p>
        <p className={styles.cheat_sheet2}>{items.heading3}</p>
        <p className={styles.cheat_sheet2}>{items.heading4}</p>
      </div>
    </div>

    ))}
    </>
  )
}

export default Phase4