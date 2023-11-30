import User from '../models/User.js';

const UserController = {
  // Obtener todos los usuarios
   getAllUsers : async(req, res)=> {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Crear un nuevo usuario
   createUser : async(req, res)=> {
    const { password, nameUser, avatar } = req.body;
    try {

      const user =await User.findOne( { nameUser: nameUser})
        
      if(!user){

        const newUser = await User.create({ password, nameUser, avatar });
        res.status(201).json(newUser);
        console.log("Usuario creado exitosamente");
    
      }else{
        console.log("el usuario ya existe");
        res.json({ message: "el usuario ya existe" });
      }


    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Obtener un usuario por su ID
   getUserById : async(req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Actualizar un usuario por su ID
   updateUser: async(req, res) => {
    const { id } = req.params;
    const { password, nameUser, avatar } = req.body;
    try {
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { password, nameUser, avatar },
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Eliminar un usuario por su ID
   deleteUser:async (req, res)=> {
    const { id } = req.params;
    try {
      const deletedUser = await User.findByIdAndDelete(id);
      if (!deletedUser) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      res.status(200).json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default UserController;
