import React, { useRef, ReactNode } from 'react'
import { UilTimes } from '@iconscout/react-unicons'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const dialogRef = useRef<HTMLDialogElement>(null)

  const handleOutsideClick = (event: any) => {
    event.stopPropagation()
    console.log(event)
    if (
      dialogRef.current &&
      !dialogRef.current.contains(event.target as Node)
    ) {
      onClose()
    }
  }

  const handleEscapeKey = (event: any) => {
    if (event.key === 'Escape') {
      onClose()
    }
  }

  // Attach event listeners when the modal is open
  if (isOpen) {
    document.addEventListener('mousedown', handleOutsideClick)
    document.addEventListener('keydown', handleEscapeKey)
  }

  // Remove event listeners when the modal is closed
  const cleanupListeners = () => {
    document.removeEventListener('mousedown', handleOutsideClick)
    document.removeEventListener('keydown', handleEscapeKey)
  }

  return (
    <>
      {isOpen && (
        <dialog
          ref={dialogRef}
          open
          className='
            h-screen 
            w-screen
            fixed 
            inset-0 
            bg-black 
            bg-opacity-50 
            flex 
            items-center 
            justify-center'
          onClick={handleOutsideClick}
        >
          <div
            className='
              w-3/4 
              bg-slate-300
              rounded-md
              flex 
              flex-col
              items-start'
          >
            <button
              onClick={onClose}
              className='
                self-end
                p-2
                relative 
                top-0 
                right-0
                text-black 
                rounded-md'
            >
              <UilTimes />
            </button>
            <div className='px-8 pb-8'>{children}</div>
          </div>
        </dialog>
      )}
    </>
  )
}

export default Modal
