import { Injectable } from '@nestjs/common'
import { CreateDashboardDto } from '../controllers/dtos/create-dashboard.dto'
import { UpdateDashboardDto } from '../controllers/dtos/update-dashboard.dto'

@Injectable()
export class DashboardService {
  incluirValoresIniciais() {
    throw new Error('Method not implemented.')
  }

  create(createDashboardDto: CreateDashboardDto) {
    return 'This action adds a new dashboard'
  }

  findAll() {
    return `This action returns all dashboard`
  }

  findOne(id: number) {
    return `This action returns a #${id} dashboard`
  }

  update(id: number, updateDashboardDto: UpdateDashboardDto) {
    return `This action updates a #${id} dashboard`
  }

  remove(id: number) {
    return `This action removes a #${id} dashboard`
  }
}
