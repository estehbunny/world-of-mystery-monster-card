import React from 'react'

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
      author: props.monster.author,
    }
  }

  maxRating = 8

  handleChange(e) {
    let obj = {}
    obj[e.target.name] = e.target.value
    this.setState(obj, () => {
      this.props.onSubmit(this.state)
    })
  }

  onImageChange(e) {
    let photoUrl = URL.createObjectURL(e.target.files[0])
    this.setState({photoUrl: photoUrl}, () => {
      this.props.onSubmit(this.state)
    })
  }

  valueSlider(attribute, attributeTarget) {
    return (
      <>
        <p className='my-2 text-4xl text-center'>{attribute[attributeTarget]}</p>
        <input
          name='attrDamage'
          type='range'
          min='1'
          max={this.maxRating}
          className='hidden sm:block h-2 rounded-lg w-full'
          value={attribute[attributeTarget]}
          onChange={(e) => {
            attribute[attributeTarget] = parseInt(e.target.value)
            this.setState(attribute, () => {
              this.props.onSubmit(this.state)
            })
          }}
        />
        <div
          className='inline-flex w-full rounded-md shadow-sm mt-2 sm:hidden'
          role='group'
        >
          <button
            type='button'
            onClick={() => {
              if (attribute[attributeTarget] > 1) attribute[attributeTarget]--
              this.setState(attribute, () => {
                this.props.onSubmit(this.state)
              })
            }}
            className='p-1 sm:py-2 sm:px-4 w-full text-sm font-bold rounded-l-lg border focus:z-10 focus:ring-2 bg-slate-400 border-gray-600 text-white hover:text-white hover:bg-slate-500 focus:ring-blue-500 focus:text-white'
          >
            ➖
          </button>
          <button
            type='button'
            onClick={() => {
              if (attribute[attributeTarget] < this.maxRating) attribute[attributeTarget]++
              this.setState(attribute, () => {
                this.props.onSubmit(this.state)
              })
            }}
            className='p-1 sm:py-2 sm:px-4 w-full text-sm font-bold rounded-r-lg border focus:z-10 focus:ring-2 bg-slate-400 border-gray-600 text-white hover:text-white hover:bg-slate-500 focus:ring-blue-500 focus:text-white'
          >
            ➕
          </button>
        </div>
      </>
    )
  }

  render() {
    let st = this.state
    return (
      <div className='px-8 py-4 bg-navy text-gray-200'>
        <h2 className='text-center'>Monster data</h2>
        <div className='p-2 block'>
          <label className='label-text' htmlFor='name'>
            Name:{' '}
          </label>
          <input
            className='input-text block w-full p-2.5 bg-slate-500'
            name='name'
            type='text'
            value={this.state.name}
            placeholder={`Monster name`}
            onChange={(e) => {
              this.handleChange(e)
            }}
          />
        </div>
        <div className='p-2 block'>
          <label className='label-text' htmlFor='lore'>
            Lore:{' '}
          </label>
          <input
            className='input-text block w-full p-2.5 bg-slate-500'
            name='lore'
            type='text'
            value={this.state.lore}
            placeholder={`Monster lore`}
            onChange={(e) => {
              this.handleChange(e)
            }}
          />
        </div>
        <div className='p-2 block'>
          <label className='label-text' htmlFor='description'>
            Description:{' '}
          </label>
          <textarea
            className='input-text block w-full p-2.5 bg-slate-500'
            name='description'
            value={this.state.description}
            rows={5}
            placeholder={'Monster description'}
            onChange={(e) => {
              this.handleChange(e)
            }}
          />
        </div>
        <div className='p-2 block'>
          <label className='label-text' htmlFor='biomes'>
            Biomes: (separate with '$' for color, ',' per-biome item){' '}
          </label>
          <input
            className='input-text block w-full p-2.5 bg-slate-500'
            name='biomes'
            type='text'
            value={this.state.biomes}
            placeholder={'Example: forest$green'}
            onChange={(e) => {
              let biomes = e.target.value.split(/\s*[,]+/)
              let obj = {biomes: biomes}
              this.setState(obj, () => {
                this.props.onSubmit(this.state)
              })
            }}
          />
          <p className='text-xs my-2'>
            See{' '}
            <a
              href='https://tailwindcss.com/docs/customizing-colors'
              className='text-blue-300 underline'
            >
              Tailwind CSS color documentation
            </a>{' '}
            for supported color names
          </p>
        </div>
        <div className='p-2 block'>
          <label className='label-text' htmlFor='imgupload'>
            Monster art:{' '}
          </label>
          <input
            name='imgupload'
            type='file'
            accept='image/*'
            onChange={(e) => {
              this.onImageChange(e)
            }}
          />
        </div>
        <div className='py-2 flex flex-row w-full'>
          <div className='p-2 flex-1'>
            <label className='label-text text-center' htmlFor='attrDamage'>
              Damage
            </label>
            {this.valueSlider(st.attributes, 'damage')}
          </div>
          <div className='p-2 flex-1'>
            <label className='label-text text-center' htmlFor='attrDefense'>
              Defense
            </label>
            {this.valueSlider(st.attributes, 'defense')}
          </div>
          <div className='p-2 flex-1'>
            <label className='label-text text-center' htmlFor='attrHealth'>
              Health
            </label>
            {this.valueSlider(st.attributes, 'health')}
          </div>
          <div className='p-2 flex-1'>
            <label className='label-text text-center' htmlFor='attrSpeed'>
              Speed
            </label>
            {this.valueSlider(st.attributes, 'speed')}
          </div>
        </div>
        <div className='p-2 block'>
          <label className='label-text' htmlFor='author'>
            Author: <i>(optional)</i>
          </label>
          <input
            className='input-text block w-full p-2.5 bg-slate-500'
            name='author'
            type='text'
            value={this.state.author}
            maxLength={16}
            placeholder={'Author'}
            onChange={(e) => {
              this.handleChange(e)
            }}
          />
        </div>
      </div>
    )
  }
}

export default MonsterDataForm
