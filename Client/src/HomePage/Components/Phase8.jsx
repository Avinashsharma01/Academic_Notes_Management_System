import React from 'react'
import styles from './Phase8.module.css'
import { phase8Info } from './CarouselData'
import { Phase8_Gsap } from './Gsap'
import {motion, useScroll} from 'motion/react'


function Phase8() {
  Phase8_Gsap();
  return (
    <>
    {phase8Info.map((items, index)=>(
    <div key={index} className={styles.Phase8_main_container}>
      <div className={styles.info_container}>
      <h1 className={[styles.info_cheat_sheet1, "phase8-info-cheat-sheet1"].join(" ")}>{items.heading1}</h1>
      <h1 className={[styles.info_cheat_sheet1, "phase8-info-cheat-sheet1"].join(" ")}>{items.heading2}</h1>
      <p className={[styles.info_cheat_sheet2, "phase8-info-cheat-sheet2"].join(" ")}>
        {items.heading3}
      </p>
      </div>
      <div className={styles.icon_info_container}>
       <div className={styles.icon_info_container_element1}>
        <motion.div
             drag
             whileDrag={{
               scale:0.8
             }}
             dragConstraints={{
               left:10,
               right:10,
               top:10,
               bottom:10
             }}
        className={[styles.icon_info_box1, "phase8-icon-info-box1"].join(" ")}>
          <div className={styles.icon_box1}>
           
          </div>
          <h1 className={styles.nfo_cheat_sheet1}>
            Shivam
          </h1>
          <p className={styles.nfo_cheat_sheet2}>
            Student
          </p>
        </motion.div>
        <motion.div
             drag
             whileDrag={{
               scale:0.8
             }}
             dragConstraints={{
               left:10,
               right:10,
               top:10,
               bottom:10
             }}
        className={[styles.icon_info_box2, "phase8-icon-info-box1"].join(" ")}>
        <div className={styles.icon_box2}></div>
        </motion.div>
        <motion.div
             drag
             whileDrag={{
               scale:0.8
             }}
             dragConstraints={{
               left:10,
               right:10,
               top:10,
               bottom:10
             }}
        className={[styles.icon_info_box3, "phase8-icon-info-box1"].join(" ")}>
        <div className={styles.icon_box3}></div>
        </motion.div>
        <motion.div
             drag
             whileDrag={{
               scale:0.8
             }}
             dragConstraints={{
               left:10,
               right:10,
               top:10,
               bottom:10
             }}
        className={[styles.icon_info_box4, "phase8-icon-info-box1"].join(" ")}>
        <div className={styles.icon_box4}></div>
        </motion.div>
       </div>
       <div className={styles.icon_info_container_element2}>
       <motion.div
            drag
            whileDrag={{
              scale:0.8
            }}
            dragConstraints={{
              left:10,
              right:10,
              top:10,
              bottom:10
            }}
       className={[styles.icon_info_box5, "phase8-icon-info-box1"].join(" ")}>
       <div className={styles.icon_box5}></div>
      
       </motion.div>
        <motion.div
             drag
             whileDrag={{
               scale:0.8
             }}
             dragConstraints={{
               left:10,
               right:10,
               top:10,
               bottom:10
             }}
        className={[styles.icon_info_box6, "phase8-icon-info-box1"].join(" ")}>
        <div className={styles.icon_box6}></div>
        </motion.div>
        <motion.div
             drag
             whileDrag={{
               scale:0.8
             }}
             dragConstraints={{
               left:10,
               right:10,
               top:10,
               bottom:10
             }}
        className={[styles.icon_info_box7, "phase8-icon-info-box1"].join(" ")}>
        <div className={styles.icon_box7}></div>
        </motion.div>
        <motion.div
             drag
             whileDrag={{
               scale:0.8
             }}
             dragConstraints={{
               left:10,
               right:10,
               top:10,
               bottom:10
             }}
        className={[styles.icon_info_box8, "phase8-icon-info-box1"].join(" ")}>
        <div className={styles.icon_box8}></div>
        </motion.div>
       </div>
       <div className={styles.icon_info_container_element3}>
       <motion.div
            drag
            whileDrag={{
              scale:0.8
            }}
            dragConstraints={{
              left:10,
              right:10,
              top:10,
              bottom:10
            }}
       className={[styles.icon_info_box9, "phase8-icon-info-box1"].join(" ")}>
       <div className={styles.icon_box9}></div>
       </motion.div>
        <motion.div
             drag
             whileDrag={{
               scale:0.8
             }}
             dragConstraints={{
               left:10,
               right:10,
               top:10,
               bottom:10
             }}
        className={[styles.icon_info_box10, "phase8-icon-info-box1"].join(" ")}>
        <div className={styles.icon_box10}></div>
        </motion.div>
        <motion.div
             drag
             whileDrag={{
               scale:0.8
             }}
             dragConstraints={{
               left:10,
               right:10,
               top:10,
               bottom:10
             }}
        className={[styles.icon_info_box11, "phase8-icon-info-box1"].join(" ")}>
        <div className={styles.icon_box11}></div>
        </motion.div>
        <motion.div
        // whileTap={{
        //   scale:2
        // }}
        // transition={{
        //   duration:5
        // }}
        drag
        whileDrag={{
          scale:0.8
        }}
        dragConstraints={{
          left:10,
          right:10,
          top:10,
          bottom:10
        }}
        className={[styles.icon_info_box12, "phase8-icon-info-box1"].join(" ")}>
        <div className={styles.icon_box12}></div>
        </motion.div>
       </div>
      </div>
    </div>
    ))}
    </>
  )
}


export default Phase8