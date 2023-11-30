import React, { useRef, ReactNode, useEffect } from 'react'
import { UilTimes } from '@iconscout/react-unicons'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dialogRef.current &&
        !dialogRef.current.contains(event.target as Node)
      ) {
        onClose()
      }
    }

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    // Attach event listeners when the modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      document.addEventListener('mousedown', handleOutsideClick)
      document.addEventListener('keydown', handleEscapeKey)
    }

    // Remove event listeners and reset body overflow when the modal is closed
    return () => {
      document.body.style.overflow = 'auto'
      document.removeEventListener('mousedown', handleOutsideClick)
      document.removeEventListener('keydown', handleEscapeKey)
    }
  }, [isOpen, onClose])

  return (
    <>
      {isOpen && (
        <dialog
          ref={dialogRef}
          className='
            bg-slate-800
            bg-opacity-50
            m-0
            pr-3
            w-full
            h-screen
            fixed 
            inset-0 
            flex 
            items-end 
            justify-end'
          onClick={() => {
            onClose()
          }}
        >
          <div
            className='
              min-w-2/3 
              w-full
              max-w-[400px]
              bg-slate-300
              rounded-t-md
              flex 
              flex-col
              items-start'
            onClick={(e) => e.stopPropagation()}
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
            <div className='px-8 pb-8 w-full'>{children}</div>
          </div>
        </dialog>
      )}
    </>
  )
}

export default Modal
