import Post from "../models/post.js";
import User from "../models/User.js";

const PostController = {
  // Obtener todos los posts
  getAllPosts: async (req, res) => {
    try {
      const posts = await Post.find();
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Crear un nuevo post
  createPost: async (req, res) => {
    try {
      const { title, description, author, imageURL } = req.body;

      // Buscar si el usuario ya existe
      const user = await User.findOne({ nameUser: author });

      if (!user) {
        return res.status(400).json({ message: "El autor del post no existe" });
      }

      // Crear el post asociado al usuario encontrado
      const newPost = await Post.create({
        title,
        description,
        author: user._id,
        imageURL,
      });

      res.status(201).json(newPost);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Obtener un post por su ID
  getPostById: async (req, res) => {
    const { id } = req.params;
    try {
      const post = await Post.findById(id)
        .populate("author", "nameUser avatar")
        .populate("comments");
      if (!post) {
        return res.status(404).json({ message: "Post no encontrado" });
      }
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Actualizar un post por su ID
  updatePost: async (req, res) => {
    const { id } = req.params;
    const { title, description, imageURL } = req.body;
    try {
      const updatedPost = await Post.findByIdAndUpdate(
        id,
        { title, description, imageURL },
        { new: true }
      );
      if (!updatedPost) {
        return res.status(404).json({ message: "Post no encontrado" });
      }
      res.status(200).json(updatedPost);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Eliminar un post por su ID
  deletePost: async (req, res) => {
    const { id } = req.params;
    try {
      const deletedPost = await Post.findByIdAndDelete(id);
      if (!deletedPost) {
        return res.status(404).json({ message: "Post no encontrado" });
      }
      res.status(200).json({ message: "Post eliminado correctamente" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default PostController;
