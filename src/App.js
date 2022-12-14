import React, {Fragment, useEffect, useRef, useState} from 'react'
import * as htmlToImage from 'html-to-image'
import {Transition, Dialog} from '@headlessui/react'
import MonsterCard from './component/MonsterCard'
import MonsterDataForm from './component/MonsterDataForm'
import download from 'downloadjs'
import {Spinner} from './utility/Spinner'

const CardSaver = (props) => {
  const [showPreview, setShowPreview] = useState(false)
  const [showGeneratedCard, setShowGeneratedCard] = useState(false)
  const [cardImage, setCardImage] = useState(null)
  const screenshotImageRef = useRef()

  useEffect(() => {
    if (showGeneratedCard) {
      htmlToImage
        .toPng(screenshotImageRef.current)
        .then(function (dataUrl) {
          setCardImage(dataUrl)
        })
        .catch(function (error) {
          console.error('oops, something went wrong!', error)
        })
        .finally(function () {
          setShowGeneratedCard(false)
        })
    }
  }, [showGeneratedCard])

  const getImage = () => {
    setCardImage(null)
    setShowPreview(true)
    setShowGeneratedCard(true)
  }

  return (
    <>
      <Transition.Root show={showPreview} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={setShowPreview}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity' />
          </Transition.Child>

          <div className='fixed inset-0 z-10 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center sm:p-0'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                enterTo='opacity-100 translate-y-0 sm:scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              >
                <Dialog.Panel className='relative transform overflow-hidden rounded-lg bg-navy-shade text-left shadow-xl transition-all sm:w-full sm:max-w-3xl'>
                  <div className='bg-navy-shade'>
                    <div className='sm:flex sm:items-start'>
                      <div className='text-left w-full'>
                        <Dialog.Title
                          as='h2'
                          className='text-lg font-medium leading-6 mx-4 my-2 text-gray-200'
                        >
                          <strong>{props.monster.name}</strong>{' '}
                          <i>(WoM Monster Card)</i>
                        </Dialog.Title>
                        <div className='mt-2 bg-navy-dark' id='screenshot'>
                          {cardImage ? (
                            <img src={cardImage} alt={props.monster.name} className='text-center m-auto' />
                          ) : (
                            <Spinner />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='bg-navy-shade p-4 sm:flex sm:flex-row-reverse sm:px-6'>
                    <button
                      type='button'
                      className='inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm'
                      onClick={() => {
                        let filename = props.monster.name.replace(/\s+/g, '_')
                        download(cardImage, `wom-card-image-${filename}.png`)
                        setShowPreview(false)
                      }}
                    >
                      Download
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      {showGeneratedCard && (
        <div
          className='w-[52rem]'
          aria-hidden='true'
          id='screencase'
          ref={screenshotImageRef}
        >
          <MonsterCard monster={props.monster} forceWide={true} />
        </div>
      )}
      <button
        onClick={getImage}
        title='Save monster card'
        className='fixed z-90 bottom-6 right-4 w-16 h-16 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl bg-blue-600 hover:bg-blue-500'
      >
        <svg className='w-12 h-12' viewBox='0 0 24 24'>
          <path
            fill='currentColor'
            d='M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z'
          />
        </svg>
      </button>
    </>
  )
}

function App() {
  const [monster, setMonster] = useState({
    name: 'Monster Name',
    lore: 'Your lore here',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, vel exercitationem esse quia doloremque perspiciatis veritatis adipisci tempore voluptatem. Impedit eos qui quos similique perspiciatis, ab pariatur soluta esse molestias.',
    biomes: ['forest$green'],
    attributes: {damage: 4, defense: 3, health: 2, speed: 5},
    photoUrl: `${process.env.PUBLIC_URL}/assets/example.png`,
    author: '',
  })

  const onChangeData = (properties) => {
    setMonster({
      name: properties.name,
      lore: properties.lore,
      description: properties.description,
      biomes: properties.biomes,
      attributes: properties.attributes,
      photoUrl: properties.photoUrl,
      author: properties.author,
    })
  }

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
      <main>
        <div className='flex flex-col xl:flex-row-reverse'>
          <MonsterDataForm
            monster={monster}
            onSubmit={(e) => onChangeData(e)}
            className=''
          />
          <MonsterCard monster={monster} className={'px-4 py-8'} />
        </div>
      </main>
      <CardSaver monster={monster} />
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

export default App
