import React, {Fragment, useState} from 'react'
import * as htmlToImage from 'html-to-image'
import {Transition, Dialog} from '@headlessui/react'
import MonsterCard from './component/MonsterCard'
import MonsterDataForm from './component/MonsterDataForm'
import replaceOrAppendChildIfEmpty from './utility/Helper'
import download from 'downloadjs'

function App() {
  const [monster, setMonster] = useState({
    name: 'Name',
    lore: 'Your lore here',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, vel exercitationem esse quia doloremque perspiciatis veritatis adipisci tempore voluptatem. Impedit eos qui quos similique perspiciatis, ab pariatur soluta esse molestias.',
    biomes: ['a biome$lime'],
    attributes: {damage: 4, defense: 3, health: 2, speed: 5},
    photoUrl: `${process.env.PUBLIC_URL}/assets/example.png`
  })

  const onChangeData = (properties) => {
    setMonster({
      name: properties.name,
      lore: properties.lore,
      description: properties.description,
      biomes: properties.biomes,
      attributes: properties.attributes,
      photoUrl: properties.photoUrl
    })
  }

  const [showPreview, setShowPreview] = useState(false)
  const [cardImage, setCardImage] = useState(null)

  const getImage = () => {
    const node = document.getElementById('screencase')
    node.classList.remove('hidden')
    setShowPreview(true)
    htmlToImage
      .toPng(node)
      .then(function (dataUrl) {
        var img = new Image()
        img.src = dataUrl
        setCardImage(dataUrl)
        const screenshotPlot = document.getElementById('screenshot')
        replaceOrAppendChildIfEmpty(screenshotPlot, img)
      })
      .catch(function (error) {
        console.error('oops, something went wrong!', error)
      })
      .finally(function () {
        node.classList.add('hidden')
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
                <Dialog.Panel className='relative transform overflow-hidden rounded-lg bg-navy text-left shadow-xl transition-all sm:w-full sm:max-w-2xl'>
                  <div className='bg-navy-shade'>
                    <div className='sm:flex sm:items-start'>
                      <div className='text-left w-full'>
                        <Dialog.Title
                          as='h2'
                          className='text-lg font-medium leading-6 mx-4 my-2 text-gray-200'
                        >
                          <strong>{monster.name}</strong>{' '}
                          <i>(WoM Monster Card)</i>
                        </Dialog.Title>
                        <div className='mt-2 bg-navy-dark' id='screenshot'>
                          <div role='status' className='m-auto p-8 text-center'>
                            <svg
                              aria-hidden='true'
                              className='inline mr-2 w-8 h-8 text-gray-200 animate-spin fill-blue-600'
                              viewBox='0 0 100 101'
                              fill='none'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <path
                                d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                                fill='currentColor'
                              />
                              <path
                                d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                                fill='currentFill'
                              />
                            </svg>
                            <span class='sr-only'>Loading...</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='bg-navy-shade p-4 sm:flex sm:flex-row-reverse sm:px-6'>
                    <button
                      type='button'
                      className='inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm'
                      onClick={() => {
                        let filename = monster.name.replace(/\s+/g, '_')
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
      <div className='w-[52rem] hidden' aria-hidden='true' id='screencase'>
        <MonsterCard monster={monster} forceWide={true} />
      </div>
      <footer>
        <div className='bg-navy-shade p-4 text-white text-center'>
          &copy; 2022-2023 Akhir Pekan Studio, dibuat oleh{' '}
          <strong>EsTehBunny (🧊🍹🐰)</strong>
          <br />
          untuk referensi game <strong>World of Mystery</strong>.
        </div>
      </footer>
      <button
        onClick={getImage}
        title='Save monster card'
        className='fixed z-90 bottom-6 right-4 w-16 h-16 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl bg-blue-600 hover:bg-blue-500'
      >
        <svg className='w-12 h-12' viewBox='0 0 24 24'>
          <path fill="currentColor" d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z" />
        </svg>
      </button>
    </div>
  )
}

export default App
