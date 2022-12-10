import React from 'react'

class MonsterCard extends React.Component {
  render() {
    return (
      <div className='page p-4'>
        <div className='background rounded-3xl'>
          <div className='m-auto mb-4 flex min-w-full flex-col items-center md:flex-row justify-around'>
            <PhotoCard
              name={this.props.monster.name}
              imageUrl={this.props.monster.photoUrl}
            />
            <MonsterData
              name={this.props.monster.name}
              lore={this.props.monster.lore}
              description={this.props.monster.description}
              attributes={this.props.monster.attributes}
            />
          </div>
          <div className='pb-4'>
            <div className='mb-2 text-lg font-bold'>Description</div>
            <div className='text-justify text-md italic'>
              {this.props.monster.description}
            </div>
          </div>
          <div className='text-center'>
            <h4 className='text-xl font-bold my-2'>BIOMES</h4>
            <hr className='my-1 border-0 h-0.5 bg-slate-600' />
            <div className='flex flex-1 justify-center text-center text-lg'>
              {Array.from(this.props.monster.biomes, (e, i) => {
                let consk = (e) ? e.split("$") : ['', '']
                return <BiomeChip key={i} name={consk[0]} color={consk[1]} />
              })}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const BiomeChip = (props) => {
  let [customChipColor, customTextColor] = (props.color) ? [`bg-${props.color}-700`, `text-${props.color}-200`] : ['', '']
  return (
    <p className={`biome-chip m-2 uppercase ${customChipColor} ${customTextColor}`}>
      {props.name}
    </p>
  )
}

const PhotoCard = (props) => {
  return (
    <div>
      <div className='container m-auto mb-4'>
        <div className='photo-template-card'>
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

class MonsterData extends React.Component {
  render() {
    return (
      <div className='flex w-96'>
        <div className='container m-auto flex flex-col px-2'>
          <h2 className='text-center'>{this.props.name}</h2>
          <h3 className='text-center'>{this.props.lore}</h3>
          <div className='py-4'>
            <div className='skill-card'>
              <SkillList
                key='damage'
                name='damage'
                description='Attack Damage'
                stars={this.props.attributes.damage}
              />
              <SkillList
                key='defense'
                name='defense'
                description='Defense'
                stars={this.props.attributes.defense}
              />
              <SkillList
                key='health'
                name='health'
                description='Health'
                stars={this.props.attributes.health}
              />
              <SkillList
                key='speed'
                name='speed'
                description='Movement Speed'
                stars={this.props.attributes.speed}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

class SkillList extends React.Component {
  render() {
    const colorByAttribute = {
      damage: 'bg-red-300',
      defense: 'bg-blue-500',
      health: 'bg-green-500',
      speed: 'bg-orange-700'
    }

    return (
      <div className='attribute-card'>
        <div className='shrink-0'>
          <img
            className={
              'h-12 w-12 rounded-xl' + colorByAttribute[this.props.name]
            }
            src={`${process.env.PUBLIC_URL}/assets/icon/${this.props.name}.png`}
            alt={this.props.description}
          />
        </div>
        <div>
          <div className='mx-1 text-md font-bold uppercase text-slate-400'>
            {this.props.description}
          </div>
          <div className='flex'>
            {Array.from(Array(this.props.stars), (e, i) => {
              return (
                <img
                  key={i}
                  className={'h-6 w-6 mx-0.5 mb-2'}
                  src={`${process.env.PUBLIC_URL}/assets/star.png`}
                  alt={`${this.props.description} stars`}
                />
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}

export default MonsterCard
