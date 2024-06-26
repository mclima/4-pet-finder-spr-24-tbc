import { Dialog } from '@headlessui/react'
import PetForm from './PetForm'

const NewPetModal = ({ onCancel, onSave }) => {
  return (
    <Dialog open={true} onClose={onCancel}>
      <div className="dialog">
        <Dialog.Panel>
          <Dialog.Title>New Pet</Dialog.Title>

          <PetForm onCancel={onCancel} onSave={onSave} />
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}

export default NewPetModal
