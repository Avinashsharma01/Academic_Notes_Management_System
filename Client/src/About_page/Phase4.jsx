import React from 'react'
import styles from './Phase4.module.css'
import { Phase4Info } from './Data_Storage_Con'

function Phase4() {
  return (
    <>
    {Phase4Info.map((items)=>(
      <div className={styles.Phase4_main_container}>
        <div className={styles.info_container1}>
          <div className={styles.image_box1}>
            <img className={styles.image} src={items.image1} alt="" />
          </div>
          <div className={styles.image_box2}>
          <img className={styles.image} src={items.image2} alt="" />
          </div>
          <div className={styles.image_box3}>
          <img className={styles.image} src={items.image3} alt="" />
          </div>
          <div className={styles.image_box4}>
          <img className={styles.image} src={items.image4} alt="" />
          </div>
        </div>
        <div className={styles.info_container2}>
         <h1 className={styles.cheat_sheet1}>{items.heading1}</h1>
         <p className={styles.cheat_sheet2}>{items.heading2}</p>
         <h1 className={styles.cheat_sheet1}>Using The Latest</h1><h1 className={styles.cheat_sheet3}>Technology</h1>
         <p className={styles.cheat_sheet2}>{items.heading4}</p>
        
        </div>
      </div>
    ))}
    </>
  )
}

export default Phase4