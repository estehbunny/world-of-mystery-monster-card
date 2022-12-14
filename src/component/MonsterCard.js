import React from 'react'

const MonsterCard = (props) => {
  let forceWide = props.forceWide ?? false
  let cssVarWideCard = forceWide
    ? 'flex-row items-start'
    : 'items-center flex-col min-[825px]:flex-row'
  return (
    <div className={`page p-2 ${props.className ?? ''}`}>
      <div className='card rounded-3xl'>
        <div
          className={`m-auto mb-4 flex min-w-full ${cssVarWideCard} justify-between min-[825px]:items-start`}
        >
          <PhotoCard
            name={props.monster.name}
            imageUrl={props.monster.photoUrl}
            downloadMode={forceWide}
          />
          <MonsterData
            name={props.monster.name}
            lore={props.monster.lore}
            description={props.monster.description}
            attributes={props.monster.attributes}
            downloadMode={forceWide}
          />
        </div>
        <div className='pb-4'>
          <div className='mb-2 text-lg font-bold'>Description</div>
          <div className='text-justify text-md min-h-[4.5em]'>
            {props.monster.description}
          </div>
        </div>
        <div className='text-center'>
          <h4 className='text-xl font-bold'>BIOMES</h4>
          <hr className='my-1 border-0 h-0.5 bg-slate-600' />
          <div className='flex flex-1 flex-wrap justify-center text-center text-lg'>
            {Array.from(props.monster.biomes, (e, i) => {
              let consk = e ? e.split('$') : ['', '']
              return <BiomeChip key={i} name={consk[0]} color={consk[1]} />
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

const BiomeChip = (props) => {
  let [customChipColor, customTextColor] = props.color
    ? [`bg-${props.color}-700`, `text-${props.color}-200`]
    : ['', '']
  return (
    <p
      className={`biome-chip mx-2 my-1 w-36 uppercase ${customChipColor} ${customTextColor}`}
    >
      {props.name}
    </p>
  )
}

const PhotoCard = (props) => {
  const bottomPadding = props.downloadMode ? 'pb-0' : 'min-[825px]:pb-0'
  return (
    <div>
      <div className={`container m-auto pb-4 ${bottomPadding}`}>
        <div className='photo-template-card h-[24rem] w-[19rem] rounded-3xl'>
          <img
            className='photo-card w-full h-full object-cover'
            src={props.imageUrl}
            alt={props.name}
          />
        </div>
      </div>
    </div>
  )
}

const MonsterData = (props) => {
  let wideSkillCard = props.downloadMode ? 'max-w-sm' : ''
  return (
    <div className='flex w-96'>
      <div className='container m-auto flex flex-col'>
        <h1 className='text-center min-h-[1em]'>{props.name}</h1>
        <h3 className='text-center min-h-[1em]'>{props.lore}</h3>
        <div className='pt-4'>
          <div className={`skill-card ${wideSkillCard}`}>
            <SkillList
              key='damage'
              name='damage'
              description='Attack Damage'
              stars={props.attributes.damage}
              downloadMode={props.downloadMode}
            />
            <SkillList
              key='defense'
              name='defense'
              description='Defense'
              stars={props.attributes.defense}
              downloadMode={props.downloadMode}
            />
            <SkillList
              key='health'
              name='health'
              description='Health'
              stars={props.attributes.health}
              downloadMode={props.downloadMode}
            />
            <SkillList
              key='speed'
              name='speed'
              description='Movement Speed'
              stars={props.attributes.speed}
              downloadMode={props.downloadMode}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

const SkillList = (props) => {
  const colorByAttribute = {
    damage: 'bg-red-300',
    defense: 'bg-blue-500',
    health: 'bg-green-500',
    speed: 'bg-orange-700'
  }
  const skillIconSize = props.downloadMode
    ? 'h-12 w-12'
    : 'h-10 w-10 sm:h-12 sm:w-12'
  const starSize = props.downloadMode ? 'h-6 w-6' : 'h-4 w-4 sm:h-6 sm:w-6'

  return (
    <div className='attribute-card'>
      <div className='shrink-0'>
        <img
          className={`${skillIconSize} rounded-xl ${
            colorByAttribute[props.name]
          }`}
          src={`${process.env.PUBLIC_URL}/assets/icon/${props.name}.png`}
          alt={props.description}
        />
      </div>
      <div>
        <div className='mx-1 text-md font-bold uppercase text-slate-400'>
          {props.description}
        </div>
        <div>
          {Array.from(Array(props.stars), (e, i) => {
            return (
              <img
                key={i}
                className={`${starSize} mx-0.5 mb-2 inline-block`}
                src={`${process.env.PUBLIC_URL}/assets/star.png`}
                alt={`${props.description} stars`}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default MonsterCard
