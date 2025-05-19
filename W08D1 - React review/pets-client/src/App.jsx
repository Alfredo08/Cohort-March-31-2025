import { useState } from 'react';
import './App.css';
import { useEffect } from 'react';
import Pet from './components/Pet';
import PetForm from './components/PetForm';

const App = () => {
  const [pets, setPets] = useState([]);
  const [apiURL, setAPIURl] = useState("http://localhost:8080");

  useEffect(() => {
    const fetchPets = async () => {
      const response = await fetch(apiURL + "/pets");
      const data = await response.json();
      setPets(data.pets);
    }

    fetchPets();
  }, []);

  const addPet = (newPet) => {
    setPets([...pets, newPet]);
  }

  const removePet = (pet_id) => {
    const updatedListOfPets = pets.filter((pet) => pet.id !== pet_id);
    setPets(updatedListOfPets);
  }  

  return (
    <>
      <h1> Pets app </h1>
      <PetForm addPet={addPet}
               apiURL={apiURL} />
      {
        pets.map((pet, index) => {
          return(<Pet 
                    key={index}
                    name={pet.name}
                    species={pet.species}
                    breed={pet.breed}
                    removePet={removePet}
                    id={pet.id}
                    apiURL={apiURL}
                  />) 
        })
      }
    </>
  );
}

export default App
