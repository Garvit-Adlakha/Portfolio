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
        <div className="reveal-up">
          <h2 className="headline-2">Essential tools I use</h2>
          <p className="text-zinc-400 mt-3 mb-8 max-w-[50ch]">
            Discover the powerful tools and technologies I use to create exceptional, high-performing websites and applications.
          </p>
        </div>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
          {
            skillItem.map(({imgSrc, label, desc}, key) => (
              <SkillCard 
                key={key}
                imgSrc={imgSrc}
                label={label}
                desc={desc}
              />
            ))
          }
        </div>
      </div>
    </section>
  )
}

export default Skills