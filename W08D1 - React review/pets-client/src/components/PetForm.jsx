import { useState } from "react";

const PetForm = ({addPet, apiURL}) => {

    const [newPet, setNewPet] = useState({
        name: "",
        species: "",
        breed: "",
        user_id: -1
    });
    const [errorMessage, setErrorMessage] = useState("");

    const updateField = (event) => {
        setNewPet({
            ...newPet,
            [event.target.name]: event.target.value
        });
    }

    const handleAddPet = async (event) => {
        event.preventDefault();
        
        const settings = {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(newPet)
        }
        
        const response = await fetch(apiURL + "/new/pet", settings);
        const data = await response.json();
        if(! response.ok){
            setErrorMessage(data.message);
        }
        else{
            addPet(data.pet);
            setErrorMessage("");
            setNewPet({
                name: "",
                species: "",
                breed: "",
                user_id: -1
            });
        }
    }

    return (
        <>
            <h2> Pet form </h2>
            <form onSubmit={handleAddPet}>
                <div>
                    <label htmlFor="name">
                        Name:
                    </label>
                    <input
                        value={newPet.name}
                        id="name"
                        name="name"
                        onChange={updateField}
                        type="text" 
                    />
                </div>
                <div>
                    <label htmlFor="species">
                        Species:
                    </label>
                    <input
                        value={newPet.species}
                        id="species"
                        name="species"
                        onChange={updateField}
                        type="text" 
                    />
                </div>
                <div>
                    <label htmlFor="breed">
                        Breed:
                    </label>
                    <input
                        value={newPet.breed}
                        id="breed"
                        name="breed"
                        onChange={updateField}
                        type="text" 
                    />
                </div>
                <div>
                    <label htmlFor="user_id">
                        User Id:
                    </label>
                    <input
                        value={newPet.user_id}
                        id="user_id"
                        name="user_id"
                        onChange={updateField}
                        type="number" 
                    />
                </div>
                <button>
                    Add
                </button>
            </form>
            <div> {errorMessage} </div>
        </>
    );
}

export default PetForm;