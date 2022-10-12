import express from 'express'
import { PORT } from './config/config.js'
import employeeRoutes from './routes/employeeRoutes.js'

const app = express()
app.use(express.json())

app.use('/api/empleados', employeeRoutes)

app.use((req, res, next) => {
    res.status(404).json({
        msg: 'Ruta no encontrada.'
    })
})

app.listen(PORT, () => {
    console.log(`Corriendo en el puerto ${PORT}`);
})