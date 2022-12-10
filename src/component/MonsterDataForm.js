import React from "react"

class MonsterDataForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      name: props.monster.name,
      lore: props.monster.lore,
      description: props.monster.description,
      biomes: props.monster.biomes,
      attributes: props.monster.attributes,
      photoUrl: props.monster.photoUrl,
    }
  }

  handleChange(e) {
    let obj = {}
    obj[e.target.name] = e.target.value
    this.setState(obj, () => {
      console.log(this.state)
      this.props.onSubmit(this.state)
    })
  }

  onImageChange(e) {
    let photoUrl = URL.createObjectURL(e.target.files[0])
    this.setState({photoUrl: photoUrl}, () => {
      console.log(this.state)
      this.props.onSubmit(this.state)
    })
  }

  render() {
    let st = this.state
    return (
      <div className='p-8 bg-navy text-gray-200'>
        <h2 className='text-center'>Monster data</h2>
        <div className='p-2'>
          <label className='label-text' htmlFor='name'>
            Name:{' '}
          </label>
          <input
            className='input-text p-2.5'
            name='name'
            type='text'
            value={this.state.name}
            onChange={(e) => {
              this.handleChange(e)
            }}
          />
        </div>
        <div className='p-2'>
          <label className='label-text' htmlFor='lore'>
            Lore:{' '}
          </label>
          <input
            className='input-text p-2.5'
            name='lore'
            type='text'
            value={this.state.lore}
            onChange={(e) => {
              this.handleChange(e)
            }}
          />
        </div>
        <div className='p-2'>
          <label className='label-text' htmlFor='description'>
            Description:{' '}
          </label>
          <textarea
            className='input-text p-2.5'
            name='description'
            value={this.state.description}
            onChange={(e) => {
              this.handleChange(e)
            }}
          />
        </div>
        <div className='p-2'>
          <label className='label-text' htmlFor='biomes'>
            Biomes: (separate with '$' for color, ',' per-biome item){' '}
          </label>
          <input
            className='input-text p-2.5'
            name='biomes'
            type='text'
            value={this.state.biomes}
            onChange={(e) => {
              let biomes = e.target.value.split(/[,\s]+/).map(e => e.trim())
              let obj = {biomes: biomes}
              this.setState(obj, () => {
                console.log(this.state)
                this.props.onSubmit(this.state)
              })
            }}
          />
        </div>
        <div className='p-2'>
          <label className='label-text' htmlFor='imgupload'>
            Monster art:{' '}
          </label>
          <input name='imgupload' type='file' accept="image/.jpg,.jpeg,.png,.gif,.webp" onChange={(e) => {this.onImageChange(e)}} />
        </div>
        <div className='flex flex-row w-full'>
          <div className='p-2 flex-1'>
            <label className='label-text' htmlFor='attrDamage'>
              Damage: {st.attributes.damage}
            </label>
            <input
              name='attrDamage'
              type='range'
              min='1'
              max='10'
              className='h-2 rounded-lg w-full'
              value={st.attributes.damage}
              onChange={(e) => {
                let attribute = st.attributes
                attribute.damage = parseInt(e.target.value)
                this.setState(attribute, () => {
                  console.log(this.state)
                  this.props.onSubmit(this.state)
                })
              }}
            />
          </div>
          <div className='p-2 flex-1'>
            <label className='label-text' htmlFor='attrDefense'>
               Defense: {st.attributes.defense}
            </label>
            <input
              name='attrDefense'
              type='range'
              min='1'
              max='10'
              className='h-2 rounded-lg w-full'
              value={st.attributes.defense}
              onChange={(e) => {
                let attribute = st.attributes
                attribute.defense = parseInt(e.target.value)
                this.setState(attribute, () => {
                  console.log(this.state)
                  this.props.onSubmit(this.state)
                })
              }}
            />
          </div>
          <div className='p-2 flex-1'>
            <label className='label-text' htmlFor='attrHealth'>
              Health: {st.attributes.health}
            </label>
            <input
              name='attrHealth'
              type='range'
              min='1'
              max='10'
              className='h-2 rounded-lg w-full'
              value={st.attributes.health}
              onChange={(e) => {
                let attribute = st.attributes
                attribute.health = parseInt(e.target.value)
                this.setState(attribute, () => {
                  console.log(this.state)
                  this.props.onSubmit(this.state)
                })
              }}
            />
          </div>
          <div className='p-2 flex-1'>
            <label className='label-text' htmlFor='attrSpeed'>
              Speed: {st.attributes.speed}
            </label>
            <input
              name='attrSpeed'
              type='range'
              min='1'
              max='10'
              className='h-2 rounded-lg w-full'
              value={st.attributes.speed}
              onChange={(e)  => {
                let attribute = st.attributes
                attribute.speed = parseInt(e.target.value)
                this.setState(attribute, () => {
                  console.log(this.state)
                  this.props.onSubmit(this.state)
                })
              }}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default MonsterDataForm