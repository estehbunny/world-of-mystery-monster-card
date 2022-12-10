import React from 'react'
import MonsterCard from './component/MonsterCard'
import MonsterDataForm from './component/MonsterDataForm'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: 'Name',
      lore: 'Your lore here',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, vel exercitationem esse quia doloremque perspiciatis veritatis adipisci tempore voluptatem. Impedit eos qui quos similique perspiciatis, ab pariatur soluta esse molestias.',
      biomes: ['a biome$lime'],
      attributes: {damage: 4, defense: 3, health: 2, speed: 5},
      photoUrl: './assets/example.png'
    }
  }

  onChangeData(properties) {
    this.setState({
      name: properties.name,
      lore: properties.lore,
      description: properties.description,
      biomes: properties.biomes,
      attributes: properties.attributes,
      photoUrl: properties.photoUrl
    })
  }

  render() {
    let st = this.state
    return (
      <div>
        <header className='bg-navy-shade p-4 text-white flex justify-between'>
          <p className='text-start'>
            <strong>World of Mystery</strong> &middot; Monster Card Generator
          </p>
          <p className='text-end'>
            Authored by <code>EsTehBunny</code>
          </p>
        </header>
        <div className='flex flex-col xl:flex-row-reverse'>
          <MonsterDataForm monster={st} onSubmit={(e) => this.onChangeData(e)} className=''/>
          <MonsterCard monster={st}/>
        </div>
        <footer>
          <div className='bg-navy-shade p-4 text-white text-center'>
            &copy; 2022-2023 Akhir Pekan Studio, dibuat oleh{' '}
            <strong>EsTehBunny (🧊🍹🐰)</strong>
            <br />
            untuk referensi game <strong>World of Mystery</strong>.
          </div>
        </footer>
      </div>
    )
  }
}

export default App
