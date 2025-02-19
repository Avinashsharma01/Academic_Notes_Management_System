import React from 'react'
import styles from './Template.module.css'
function Template1({Template1}) {
  return (
    <div className={styles.main_info_container}>
    <div  className={styles.info_container1}>
      {Template1.map((templateItem, index)=>(
        <>
        <h1 className={styles.info_cheat_sheet1}>{templateItem.heading1}</h1>
        <p className={styles.info_cheat_sheet2}>{templateItem.heading2}</p>
         </>
      ))
      }
    </div>
  </div>
  )
}

export default Template1