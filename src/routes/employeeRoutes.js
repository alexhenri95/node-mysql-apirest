import { Router } from 'express'
import { deleteEmployee, getEmployees, getEmployee, postEmployee, putEmployee, patchEmployee } from '../controllers/employeeController.js'

const router = Router()

router.get('/', getEmployees)

router.get('/:id', getEmployee)

router.post('/', postEmployee)

router.put('/:id', putEmployee)

router.patch('/:id', patchEmployee)

router.delete('/:id', deleteEmployee)

export default router