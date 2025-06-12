import SkillCard from "./SkillCard";


const skillItem = [
  // Languages
  {
    imgSrc: '/images/javascript.svg',
    label: 'JavaScript',
    desc: 'Interaction'
  },
  {
    imgSrc:'/images/typescript.svg',
    label:'TypeScript',
    desc:'Language'
  },
  {
    imgSrc:'/images/python.svg',
    label:'Python',
    desc:'Language'
  },
  {
    imgSrc:'/images/java.svg',
    label:"JAVA",
    desc:"Language"
  },
  
  // Frontend Frameworks & Libraries
  {
    imgSrc: '/images/react.svg',
    label: 'React',
    desc: 'Frontend Framework'
  },
  {
    imgSrc:'/images/nextjs_logo_dark.svg',
    label:'NextJS',
    desc:'Frontend Framework'
  },
  {
    imgSrc: '/images/tailwindcss.svg',
    label: 'TailwindCSS',
    desc: 'User Interface'
  },
  {
    imgSrc: '/images/css3.svg',
    label: 'CSS',
    desc: 'User Interface'
  },
  
  // Backend Frameworks & Runtime
  {
    imgSrc: '/images/nodejs.svg',
    label: 'NodeJS',
    desc: 'Backend'
  },
  {
    imgSrc: '/images/expressjs.svg',
    label: 'ExpressJS',
    desc: 'Backend Framework'
  },
  {
    imgSrc:'/images/nestjs.svg',
    label:'NestJS',
    desc:'Backend Framework'
  },
  {
    imgSrc:'/images/django.svg',
    label:'Django',
    desc:'Framework'
  },
  
  // Databases
  {
    imgSrc: '/images/mongodb.svg',
    label: 'MongoDB',
    desc: 'Database'
  },
  {
    imgSrc:'/images/MySql.svg',
    label:"MySql",
    desc:"Database"
  },
  {
    imgSrc:'/images/postgresql.svg',
    label:'PostgreSQL',
    desc:'Database'
  },
  {
    imgSrc:'/images/redis.svg',
    label:'Redis',
    desc:'Database'
  },
  // Development Tools
  {
    imgSrc:'/images/git.svg',
    label:'Git',
    desc:'Version Control'
  },
  {
    imgSrc:'/images/docker.svg',
    label:'Docker',
    desc:'Containerization'
  },
  {
    imgSrc: '/images/figma.svg',
    label: 'Figma',
    desc: 'Design tool'
  },
  
];

const Skills = () => {
  return (
    <section className="section">
      <div className="container">

      <h2 className="headline-2 reveal-up">Essential tools i use</h2>
    <p className="text-zinc-400 mt-3 mb-8 max-w-[50ch]">
        Discover the powerfull tools and technologies i use to create exceptional, high performing websites and applications.
    </p>
    <div className="grid gap-3 grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))]">
      {
        skillItem.map(({imgSrc,label,desc},  key)=>(
            <SkillCard 
            key={key}
              imgSrc={imgSrc}
              label={label}
              desc={desc}
              classes="reveal-up"
            />

        ))
      }
    </div>
  </div>
    </section>
  )
}

export default Skills