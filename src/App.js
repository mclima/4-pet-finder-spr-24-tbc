import { useEffect, useState } from 'react'
import NewPetModal from './NewPetModal'
import EditPetModal from './EditPetModal'
import { Pet } from './Pet'
import { listPets, createPet, updatePet, deletePet } from './api'

const App = () => {
  const [pets, setPets] = useState([])
  const [isLoading, setLoading] = useState(false)
  const [isNewPetOpen, setNewPetOpen] = useState(false)
  const [currentPet, setCurrentPet] = useState(null)

  useEffect(() => {
    setLoading(true)
    listPets()
      .then((pets) => {
        setPets(pets)
      })
      .finally(() => setLoading(false))

    // async function getData() {
    //   setLoading(true)
    //   try {
    //     const res = await fetch('http://localhost:3001/pets')
    //     const pets = await res.json()
    //     setPets(pets)
    //     setLoading(false)
    //   } catch (e) {
    //     setLoading(false)
    //   }
    // }
    // getData()
  }, [])

  // const addPet = async ({ name, kind, photo }) => {
  //   setPets([...pets, { id: Math.random(), name, kind, photo }])
  //   setNewPetOpen(false)
  // }

  const addPet = async (pet) => {
    return createPet(pet).then((newPet) => {
      setPets([...pets, newPet])
      setNewPetOpen(false)
    })
  }

  const savePet = async (pet) => {
    return updatePet(pet).then((updatedPet) => {
      setPets((pets) =>
        // mapping: loop through the pets, return them all but replace the updated one
        pets.map((pet) => (pet.id === updatedPet.id ? updatedPet : pet))
      )
      // closes the modal
      setCurrentPet(null)
    })
  }

  const removePet = (byePet) => {
    const result = window.confirm(
      `Are you sure you want to adopt ${byePet.name}`
    )
    if (result) {
      deletePet(byePet).then(() => {
        setPets((pets) => pets.filter((pet) => pet.id !== byePet.id))
      })
    }
  }

  return (
    <main>
      <h1>Adopt-a-Pet</h1>
      {isLoading ? (
        <div className="loading">Loading...</div>
      ) : (
        <>
          <ul>
            {pets.map((pet) => (
              <li key={pet.id}>
                <Pet
                  pet={pet}
                  onEdit={() => {
                    console.log('pet', pet)
                    setCurrentPet(pet)
                  }}
                  onRemove={() => removePet(pet)}
                />
              </li>
            ))}
          </ul>
          <button onClick={() => setNewPetOpen(true)}>Add a Pet</button>
        </>
      )}
      {isNewPetOpen && (
        <NewPetModal
          //isOpen={isNewPetOpen}
          onSave={addPet}
          onCancel={() => setNewPetOpen(false)}
        />
      )}
      {currentPet && (
        <EditPetModal
          pet={currentPet}
          onCancel={() => setCurrentPet(null)}
          onSave={savePet}
        />
      )}
    </main>
  )
}

export default App
