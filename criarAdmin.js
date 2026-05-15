require('dotenv').config()

const mongoose =
  require('mongoose')

const bcrypt =
  require('bcryptjs')

const Admin =
  require('./src/models/Admin')

async function atualizarAdmin() {

  await mongoose.connect(
    process.env.MONGO_URI
  )

  const senhaCriptografada =
    await bcrypt.hash('123456', 10)

  await Admin.findOneAndUpdate(

    {
      email: 'admin@admin.com'
    },

    {
      nome: 'Administrador',
      senha: senhaCriptografada
    }

  )

  console.log(
    'Senha atualizada!'
  )

  process.exit()
}

atualizarAdmin()