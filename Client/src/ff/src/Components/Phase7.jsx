import React from 'react'
import styles from './Phase7.module.css'
import { phase7Info } from './CarouselData'

function Phase7() {
  return (
    <>
    {phase7Info.map((items, index)=>(
    <div key={index} className={styles.Phase5_main_container}>
      <div className={styles.container1}>
       <h1 className={styles.titel1}>{items.heading1}</h1>
       <p className={styles.titel2}>{items.heading2}</p>
       <div className={styles.info_box_element}>
        <div className={styles.info_box1}>
          <div className={styles.icon_info_box1}>
            <div className={styles.icon_box1}></div>
            <div className={styles.infoElement}>
              <h1 className={styles.titel3}>{items.heading3}</h1>
              <p className={styles.titel4}>{items.heading4}</p>
            </div>
          </div>
          <div className={styles.icon_info_box2}>
          <div className={styles.icon_box1}></div>
            <div className={styles.infoElement}>
            <h1 className={styles.titel3}>{items.heading5}</h1>
              <p className={styles.titel4}>{items.heading6}</p>
            </div>
          </div>
        </div>
        <div className={styles.info_box2}>
          <div className={styles.info_page}>
          <p className={styles.titel5}>{items.heading7}</p>
          </div>
        </div>
       </div>
      </div>
      <div className={styles.container2}>
        <div className={styles.slider_boxes}>
        <div className={styles.main_box}>
          <div className={styles.boxes}>
            <div className={styles.box1}></div>
            <div className={styles.box1}></div>
            <div className={styles.box1}></div>
            <div className={styles.box1}></div>
            <div className={styles.box1}></div>
            <div className={styles.box1}></div>
          </div>
        </div>
        </div>
      </div>
    </div> 
    ))}
    </>
  )
}

export default Phase7