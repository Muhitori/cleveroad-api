import { UnprocessableEntityException } from '@nestjs/common'
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface'
import { diskStorage } from 'multer'
import { extname } from 'path'

const storage = diskStorage({
  destination: './images',
  filename: (req, file, callback) => {
    callback(null, generateFilename(file))
  },
})

function generateFilename(file) {
  return `${Date.now()}.${extname(file.originalname)}`
}

const filter = (req, file, callback) => {
  if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
    callback(null, true)
  } else {
    callback(
      new UnprocessableEntityException({
        field: 'file',
        message: `Unsupported file type ${extname(file.originalname)}`
      }), false
    )
  }
}

const limit: number = 1000 * 1024;

export const multerOptions: MulterOptions = {
  limits: {fileSize:limit},
  storage,
  fileFilter: filter
}

