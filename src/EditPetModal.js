import { Dialog } from '@headlessui/react'
import PetForm from './PetForm'

const EditPetModal = ({ pet, onCancel, onSave }) => {
  return (
    <Dialog open={true} onClose={onCancel}>
      <div className="dialog">
        <Dialog.Panel>
          <Dialog.Title>Edit Pet</Dialog.Title>

          <PetForm pet={pet} onCancel={onCancel} onSave={onSave} />
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}

export default EditPetModal
