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
            author={props.monster.author}
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
    <div
      className={`mx-2 my-1 px-4 py-1 leading-5 rounded-xl bg-gray-600 font-medium w-36 uppercase flex ${customChipColor} ${customTextColor}`}
    >
      <p className='m-auto'>{props.name}</p>
    </div>
  )
}

const PhotoCard = (props) => {
  const bottomPadding = props.downloadMode ? 'pb-0' : 'min-[825px]:pb-0'
  return (
    <div>
      <div className={`container m-auto pb-4 ${bottomPadding}`}>
        <div className='select-none h-[24rem] w-[19rem] rounded-3xl bg-slate-200'>
          <img
            className='m-auto w-full h-full rounded-3xl object-cover'
            src={props.imageUrl}
            alt={props.name}
          />
          <div className='relative -inset-y-10 text-clip'>
            <div className='relative text-center text-3xl text-gray-600 opacity-75 font-bold italic whitespace-nowrap overflow-clip'>
              {props.author}
            </div>
            <div className='absolute -inset-1 text-center text-3xl text-gray-400 opacity-50 font-bold italic whitespace-nowrap overflow-clip'>
              {props.author}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const MonsterData = (props) => {
  let skillCardWidth = props.downloadMode ? 'max-w-sm' : 'max-w-xs sm:max-w-sm'
  return (
    <div className='flex w-96'>
      <div className='container m-auto flex flex-col'>
        <h1 className='text-center min-h-[1em]'>{props.name}</h1>
        <h3 className='text-center min-h-[1em]'>{props.lore}</h3>
        <div className='pt-4'>
          <div
            className={`mx-auto ${skillCardWidth} rounded-xl bg-navy-shade text-white`}
          >
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
  const skillIconSize = 'h-12 w-12'
  const starSize = props.downloadMode ? 'h-6 w-6 mx-1' : 'h-6 w-6 mx-0.5 sm:mx-1'

  return (
    <div className='flex items-center space-x-4 rounded-xl px-4 py-2'>
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
                className={`${starSize} mb-2 inline-block`}
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
