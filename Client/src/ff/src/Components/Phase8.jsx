import React from 'react'
import styles from './Phase8.module.css'
import { phase8Info } from './CarouselData'

function Phase8() {
  return (
    <>
    {phase8Info.map((items, index)=>(
    <div key={index} className={styles.Phase8_main_container}>
      <div className={styles.info_container}>
      <h1 className={styles.info_cheat_sheet1}>{items.heading1}</h1>
      <h1 className={styles.info_cheat_sheet1}>{items.heading2}</h1>
      <p className={styles.info_cheat_sheet2}>
        {items.heading3}
      </p>
      </div>
      <div className={styles.icon_info_container}>
       <div className={styles.icon_info_container_element1}>
        <div className={styles.icon_info_box1}>
          <div className={styles.icon_box1}></div>
          <h1 className={styles.nfo_cheat_sheet1}>
            Shivam
          </h1>
          <p className={styles.nfo_cheat_sheet2}>
            Student
          </p>
        </div>
        <div className={styles.icon_info_box2}>
        <div className={styles.icon_box2}></div>
        </div>
        <div className={styles.icon_info_box3}>
        <div className={styles.icon_box3}></div>
        </div>
        <div className={styles.icon_info_box4}>
        <div className={styles.icon_box4}></div>
        </div>
       </div>
       <div className={styles.icon_info_container_element2}>
       <div className={styles.icon_info_box5}>
       <div className={styles.icon_box5}></div>
      
       </div>
        <div className={styles.icon_info_box6}>
        <div className={styles.icon_box6}></div>
        </div>
        <div className={styles.icon_info_box7}>
        <div className={styles.icon_box7}></div>
        </div>
        <div className={styles.icon_info_box8}>
        <div className={styles.icon_box8}></div>
        </div>
       </div>
       <div className={styles.icon_info_container_element3}>
       <div className={styles.icon_info_box9}>
       <div className={styles.icon_box9}></div>
       </div>
        <div className={styles.icon_info_box10}>
        <div className={styles.icon_box10}></div>
        </div>
        <div className={styles.icon_info_box11}>
        <div className={styles.icon_box11}></div>
        </div>
        <div className={styles.icon_info_box12}>
        <div className={styles.icon_box12}></div>
        </div>
       </div>
      </div>
    </div>
    ))}
    </>
  )
}
<h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo quis ut ducimus impedit voluptas consectetur dolorum accusantium asperiores minima repellat?</h1>

export default Phase8