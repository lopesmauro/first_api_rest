import sequelize from 'sequelize'
import bcryptjs from 'bcryptjs'
import connection from '../database/sync.ts'


const User = connection.define('User', {
  name: {
    type: sequelize.STRING,
    allowNull: false,
    defaultValue: '',
    validate: {
      len: {
        args: [3, 255],
        msg: 'Campo nome deve ter entre 3 e 255 caracteres.'
      }
    }
  },
  email: {
    type: sequelize.STRING,
    allowNull: false,
    defaultValue: '',
    unique: {
      name: 'unique_email',
      msg: "Email já existe",
    },
    validate: {
      isEmail: {
        msg: 'Email inválido.'
      }
    }
  },
  password_hash: {
    type: sequelize.STRING,
    defaultValue: '',
    allowNull: false,
  },
  password: {
    type: sequelize.VIRTUAL,
    defaultValue: '',
    validate: {
      len: {
        args: [6, 50],
        msg: 'A senha precisa ter entre 6 e 50 caracteres.'
      }
    }
  },
  role: {
    type: sequelize.ENUM('user', 'admin', 'manager'),
    defaultValue: 'user',
    allowNull: false,
    validate: {
      isIn: {
        args: [['user', 'admin', 'manager']],
        msg: 'Role inválido.'
      }
    }
  }
}, {
    tableName: 'users',
    underscored: true,
    timestamps: true,
})

User.addHook('beforeSave', async (user: any) => {
  if(user.password){
    user.password_hash = await bcryptjs.hash(user.password, 8)
  }
})

export const passwordIsValid = (password: string, user: any): Promise<any> => {
  return bcryptjs.compare(password, user.password)
}

export default User
