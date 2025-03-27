import React from 'react'
import styles from './Phase6.module.css'
import { Phase6Info } from './Data_Storage_Con';
import { RiRoadMapFill } from "react-icons/ri";
import { FaQuora } from "react-icons/fa6";
import { IoIosContacts } from "react-icons/io";
import { RiTeamFill } from "react-icons/ri";

function Phase6() {
  return (
 <>
 {Phase6Info.map((items, index)=>(
    <div key={index} className={styles.Phase6_main_container}>
      <div className={styles.info_container1}>
        <div className={styles.icon_box}>
        <RiRoadMapFill  className={styles.Icon1}/>
        </div>
        <h1 className={styles.cheat_sheet1}>{items.heading1}</h1>
        <p className={styles.cheat_sheet2}>{items.heading2}</p>
      </div>
      <div className={styles.info_container1}>
      <div className={styles.icon_box}>
      <FaQuora className={styles.Icon1}/>
      </div>
        <h1 className={styles.cheat_sheet1}>{items.heading3}</h1>
        <p className={styles.cheat_sheet2}>{items.heading4}</p>
      </div>
      <div className={styles.info_container1}>
      <div className={styles.icon_box}>
      <IoIosContacts className={styles.Icon1}/>
      </div>
        <h1 className={styles.cheat_sheet1}>{items.heading5}</h1>
        <p className={styles.cheat_sheet2}>{items.heading6}</p>
      </div>
      <div className={styles.info_container1}>
      <div className={styles.icon_box}>
      <RiTeamFill  className={styles.Icon1}/>
      </div>
        <h1 className={styles.cheat_sheet1}>{items.heading7}</h1>
        <p className={styles.cheat_sheet2}>{items.heading8}</p>
      </div>
    </div>
 ))}
 </>
  )
}

export default Phase6;