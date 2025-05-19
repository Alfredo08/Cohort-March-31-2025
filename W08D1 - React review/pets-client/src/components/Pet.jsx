
const Pet = ({id, name, species, breed, apiURL, removePet}) => {
    
    const handleRemovePet = async () => {
        const settings = {
            method: 'DELETE'
        };
        const URL = apiURL + "/delete/pet/" + id;

        await fetch(URL, settings);
        // Since it is a delete, NO response.json()
        removePet(id);
    }

    return(
        <>
            <h2> Pet: {name} </h2>
            <p> Species: {species} </p>
            <p> Breed: {breed} </p>
            <button onClick={handleRemovePet}> Delete </button>
        </>
    );
}

export default Pet;