import { SetMetadata } from '@nestjs/common'

export const Public = () => SetMetadata('allow-any', true)
