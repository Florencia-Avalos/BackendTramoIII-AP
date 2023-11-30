import Comment from '../models/Comment.js'; // 
import User from '../models/User.js'; 
import Post from '../models/post.js';


const CommentController = {
  // Obtener todos los comentarios
   getAllComments: async(req, res)=> {
    try {
      const comments = await Comment.find().populate('author', 'nameUser'); // Populate para obtener detalles del autor
      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

   
  // Crear un nuevo comentario
  createComment: async (req, res) => {
    try {
      const { nameUser, description, post } = req.body;
  
      // Buscar al usuario por su nombre
      const user = await User.findOne({ nameUser });
  
      if (!user) {
        return res.status(400).json({ message: 'El autor del comentario no existe' });
      }
  
      // Buscar si el post al que se quiere comentar existe
      const existingPost = await Post.findOne({ title : post });
  
      if (!existingPost) {
        return res.status(400).json({ message: 'El post al que se quiere comentar no existe' });
      }
  
      // Crear el comentario asociado al usuario y al post existente
      const newComment = await Comment.create({
        description,
        author: user._id, // Asignar el ID del usuario al autor del comentario
        post: existingPost._id // Asignar el ID del post al que se quiere comentar
      });
  
      res.status(201).json(newComment);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  
  // Obtener un comentario por su ID
   getCommentById: async (req, res)=> {
    const { id } = req.params;
    try {
      const comment = await Comment.findById(id).populate('author', 'nameUser');
      if (!comment) {
        return res.status(404).json({ message: 'Comentario no encontrado' });
      }
      res.status(200).json(comment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Actualizar un comentario por su ID
   updateComment: async(req, res)=> {
    const { id } = req.params;
    const { description } = req.body;
    try {
      const updatedComment = await Comment.findByIdAndUpdate(
        id,
        { description },
        { new: true }
      );
      if (!updatedComment) {
        return res.status(404).json({ message: 'Comentario no encontrado' });
      }
      res.status(200).json(updatedComment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Eliminar un comentario por su ID
   deleteComment: async(req, res)=> {
    const { id } = req.params;
    try {
      const deletedComment = await Comment.findByIdAndDelete(id);
      if (!deletedComment) {
        return res.status(404).json({ message: 'Comentario no encontrado' });
      }
      res.status(200).json({ message: 'Comentario eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default CommentController;
