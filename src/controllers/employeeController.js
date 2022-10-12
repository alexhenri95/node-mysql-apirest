import { pool } from '../db/db.js'

const getEmployees = async(req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM employee')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            msg: 'Algo salió mal.'
        })
    }
}

const postEmployee = async(req, res) => {
    const { fullName, salary } = req.body

    if (fullName === '' || salary === '') {
        const error = new Error('Los campos son requeridos.')
        return res.json({ msg: error.message })
    }

    try {
        const [rows] = await pool.query('INSERT INTO employee (fullName, salary) VALUES (?,?)', [fullName, salary])

        res.json({
            id: rows.insertId,
            fullName,
            salary
        })
    } catch (error) {
        return res.status(500).json({
            msg: 'Algo salió mal.'
        })
    }
}

const getEmployee = async(req, res) => {
    const { id } = req.params

    try {
        const [row] = await pool.query('SELECT * FROM employee WHERE id=?', [id])
        
        if (row.length <= 0) return res.status(404).json({ msg: 'Empleado no encontrado.' })

        res.json(row[0])
    } catch (error) {
        return res.status(500).json({
            msg: 'Algo salió mal.'
        })
    }
}

const putEmployee = async(req, res) => {
    const { fullName, salary } = req.body
    const { id } = req.params

    if (fullName === '' || salary === '') {
        const error = new Error('Los campos son requeridos.')
        return res.json({ msg: error.message })
    }

    try {
        const [result] = await pool.query('UPDATE employee SET fullName=?, salary=? WHERE id=?', [fullName, salary, id])

        if (result.affectedRows === 0) return res.status(404).json({ msg: 'Empleado no encontrado.' })

        const [rows] = await pool.query('SELECT * FROM employee WHERE id=?', [id])

        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            msg: 'Algo salió mal.'
        })
    }
}

const patchEmployee = async(req, res) => {
    const { fullName, salary } = req.body
    const { id } = req.params

    if (fullName === '' || salary === '') {
        const error = new Error('Los campos son requeridos.')
        return res.json({ msg: error.message })
    }

    try {
        const [result] = await pool.query('UPDATE employee SET fullName=IFNULL(?,fullName), salary=IFNULL(?,salary) WHERE id=?', [fullName, salary, id])

        if (result.affectedRows === 0) return res.status(404).json({ msg: 'Empleado no encontrado.' })

        const [rows] = await pool.query('SELECT * FROM employee WHERE id=?', [id])

        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            msg: 'Algo salió mal.'
        })
    }
}

const deleteEmployee = async(req, res) => {
    const { id } = req.params

    try {
        const [ result ] = await pool.query('DELETE FROM employee WHERE id=?', [id])

        if(result.affectedRows <= 0) return res.status(404).json({ msg: 'Empleado no encontrado' })

        res.json({msg: 'Empleado eliminado'})
    } catch (error) {
        return res.status(500).json({
            msg: 'Algo salió mal.'
        })
    }
}

export {
    getEmployees,
    getEmployee,
    postEmployee,
    putEmployee,
    patchEmployee,
    deleteEmployee
}