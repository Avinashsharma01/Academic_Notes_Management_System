import React from 'react'
import { Phase7_Gsap } from './Gsap'
import styles from './Phase7.module.css'
import { phase7Info } from './CarouselData'

function Phase7() {

  Phase7_Gsap()

  return (
    <>
    {phase7Info.map((items, index)=>(
    <div key={index} className={styles.Phase7_main_container}>
      <div className={styles.container1}>
       <h1 className={[styles.titel1,"phase7-titel1"].join(" ")}>{items.heading1}</h1>
       <p className={[styles.titel2,"phase7-titel2"].join(" ")}>{items.heading2}</p>
       <div className={styles.info_box_element}>
        <div className={styles.info_box1}>
          <div className={styles.icon_info_box1}>
            <div className={[styles.icon_box1,"phase7-icon-box1"].join(' ')}></div>
            <div className={styles.infoElement}>
              <h1 className={[styles.titel3,"phase7-titel3"].join(" ")}>{items.heading3}</h1>
              <p className={[styles.titel4,"phase7-titel4"].join(" ")}>{items.heading4}</p>
            </div>
          </div>
          <div className={styles.icon_info_box2}>
          <div className={[styles.icon_box1,"phase7-icon-box1"].join(' ')}></div>
            <div className={styles.infoElement}>
            <h1 className={[styles.titel3,"phase7-titel3"].join(" ")}>{items.heading5}</h1>
              <p className={[styles.titel4,"phase7-titel4"].join(" ")}>{items.heading6}</p>
            </div>
          </div>
        </div>
        <div className={[styles.info_box2, "phase7-info-page"].join(" ")}>
          <div className={styles.info_page}>
          <p className={styles.titel5}>{items.heading7}</p>
          </div>
        </div>
       </div>
      </div>
      <div className={styles.container2}>
        <div className={[styles.slider_boxes,"Phase7-slider-boxes"].join(" ")}>
        <div className={styles.main_box}>
          <div className={styles.boxes}>
            <div className={styles.box1}>
              <div className={styles.image1}>
             <img src={items.image1} alt="" />
              </div>
              <div className={styles.review1}>
              <h1 className={styles.info_review_sheet1}>{items.Name1}</h1>
             <p className={styles.info_review_sheet2}>{items.review1}</p>
              </div>
            </div>
            <div className={styles.box2}>
            <div className={styles.image1}>
             <img src={items.image2} alt="" />
              </div>
              <div className={styles.review1}>
              <h1 className={styles.info_review_sheet1}>{items.Name2}</h1>
             <p className={styles.info_review_sheet2}>{items.review1}</p>
              </div>
            </div>
            <div className={styles.box3}>
            <div className={styles.image1}>
             <img src={items.image3} alt="" />
              </div>
              <div className={styles.review1}>
              <h1 className={styles.info_review_sheet1}>{items.Name3}</h1>
             <p className={styles.info_review_sheet2}>{items.review3}</p>
              </div>
            </div>
            <div className={styles.box4}></div>
            <div className={styles.box5}></div>
            <div className={styles.box6}></div>
          </div>
        </div>
        </div>
      </div>
      <div></div>
    </div> 

    ))}
    </>
  )
}

export default Phase7
