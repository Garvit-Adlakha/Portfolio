
import { Card, HoverEffect } from "./Card";
import ProjectCard from "./ProjectCard";


const Work = () => {
    const works = [
        {
          imgSrc: '/images/project-2.jpg',
          title: 'Retainicta Customer Churn',
          tags: ['API', 'ML','web','xyz','zxyz'],
          projectLink: 'https://github.com/Garvit-Adlakha/Retainicta-Customer_Churn_Predictor'
        },
        {
          imgSrc: '/images/project-3.jpg',
          title: 'OptimalGo - optimal route',
          tags: ['Development','xyz','zxyz','xyz','zxyz'],
          projectLink: 'https://github.com/Garvit-Adlakha/OptimalGo-Travel-Planner'
        },
        {
          imgSrc: '/images/project-4.jpg',
          title: 'Licence Plate Detection',
          tags: ['ML','YOLO','Object detection','OCR'],
          projectLink: 'https://github.com/Garvit-Adlakha/Licence-Plate-Detection-using-YOLO'
        },
        {
          imgSrc: '/images/project-5.jpg',
          title: 'eCommerce website',
          tags: ['eCommerce', 'Development'],
          projectLink: 'https://github.com/Garvit-Adlakha/VougeVault_E-commerce'
        },
      ]; 
  return (
    <section
      id='work'
      className='section'
    >
      <div className='container'>
        <h2 className="headline-2 mb-8 reveal-up">
          My portfolio highlights
        </h2>
        <div className="">
        {/* grid gap-x-4 gap-y-5 grid-cols-[repeat(auto-fill,_minmax(280px,_1fr))] */}
            <HoverEffect  
           items={works}
            />
        </div>
      </div>
    </section>
  )
}

export default Work