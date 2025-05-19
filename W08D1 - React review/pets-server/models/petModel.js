const pool = require('./../database/config');

const getAll = () => {
    const nativeQuery = `
        SELECT *
        FROM pets;
    `;
    return pool.query(nativeQuery);
}
//             [pet_id]
const getOne = (data) => {
    const nativeQuery = `
        SELECT *
        FROM pets
        WHERE id = $1;
    `;
    return pool.query(nativeQuery, data);
}

//             [name, species, breed, user_id]
const createOne = (data) => {
    const nativeQuery = `
        INSERT INTO pets(name, species, breed, user_id)
        VALUES($1, $2, $3, $4) RETURNING *;
    `;
    return pool.query(nativeQuery, data);
}
//               [pet_id]
const deleteOne = (data) => {
    const nativeQuery = `
        DELETE FROM pets
        WHERE id = $1;
    `;
    return pool.query(nativeQuery, data);
}
//             [pet_id, name, species, breed, user_id]
const updateOne = (data) => {
    const nativeQuery = `
        UPDATE pets
        SET name = $2, species = $3, breed = $4, user_id = $5
        WHERE id = $1 RETURNING *;
    `;
    return pool.query(nativeQuery, data);
}

const Pets = {
    getAll,
    getOne,
    createOne,
    deleteOne,
    updateOne
};

module.exports = Pets;