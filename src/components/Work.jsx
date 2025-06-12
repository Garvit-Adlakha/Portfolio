
import { Card, HoverEffect } from "./Card";


const Work = () => {
    const works = [
        {
        imgSrc:'/images/WhisperWire.png',
        title:'WhisperWire',
        tags:['Sockets','MERN',"Chat App"],
        projectLink:'https://whisperwire-main.vercel.app/'
        },
         {
        imgSrc:"/images/MentorMatrix.png",
        title:"MentorMatrix",
        tags:['Development','MERN','Sockets','DL'],
        projectLink:"https://mentor-matrix.vercel.app/"
         },
        {
          imgSrc: '/images/churn.jpg',
          title: 'Retainicta Customer Churn',
          tags: ['API', 'ML','web'],
          projectLink: 'https://github.com/Garvit-Adlakha/Retainicta-Customer_Churn_Predictor'
        },
        {
          imgSrc: '/images/VogueVault.jpg',
          title: 'VogueVault',
          tags: ['eCommerce', 'Development',"MERN"],
          projectLink: 'https://github.com/Garvit-Adlakha/VougeVault_E-commerce'
        },
        {
          imgSrc: '/images/licence.png',
          title: 'Licence Plate Detection',
          tags: ['ML','YOLO','Object detection','OCR'],
          projectLink: 'https://github.com/Garvit-Adlakha/Licence-Plate-Detection-using-YOLO'
        },
        {
          imgSrc: '/images/optimal.jpg',
          title: 'OptimalGo - optimal route',
          tags: ['Development','core Java','DSA'],
          projectLink: 'https://github.com/Garvit-Adlakha/OptimalGo-Travel-Planner'
        }, 
      ]; 
      const freelanceWorks = [
        {
          imgSrc:'/images/BinaryKeeda.png',
          title:'Designed and developed Landing Page',
          tags:['ui/ux','web','react'],
          projectLink:'https://www.binarykeeda.com/'
        }
      ]
  return (
    <section
      id='work'
      className='section'
    >
      <div className='container'>
        <h2 className="headline-2 mb-8 reveal-up">
          My portfolio highlights
        </h2>
        <div className="py-10">
        {/* grid gap-x-4 gap-y-5 grid-cols-[repeat(auto-fill,_minmax(280px,_1fr))] */}
            <HoverEffect  
           items={works}
            />
        </div>
        <div>
          <h2 className="headline-2 mb-8 reveal-up">
            Freelance Works
          </h2>
          <HoverEffect
          items={freelanceWorks}
          />
        </div>
      </div>
    </section>
  )
}

export default Work