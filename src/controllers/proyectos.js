const Proyecto = require('../models/proyectos');
const User = require('../models/users');

exports.create = async (req, res) => {
  try {
    const { body, userId } = req;
    const user = await User.findById(userId);
    if(!user) {
      throw new Error('Usuario inválido.')
    }
    const proyecto = await Proyecto.create({ ...body, salesman: userId });
    user.products.push(proyecto._id);
    await user.save({ validateBeforeSave: false });
    
    res.status(201).json({ message: 'Producto creado', proyecto });
  } catch(e) {
    res.status(400).json({ message: e.message });
  } 
};

exports.list = async (req, res) => {
  try {
    const { userId } = req;

    const proyectos = await Proyecto.find();
    console.log(userId);
    res.status(200).json({ message: `${proyectos.length} productos encontrados`, proyectos })
  } catch(e) {
    res.status(500).json({ message: 'Algo salió mal' })
  }
};

exports.show = async (req, res) => {
  const { proyectoId } = req.params;
  try {
    const proyecto = await Proyecto.findById(proyectoId).populate({ path: 'salesman', select: 'email', populate: 'products' });

    if(!proyecto) {
      throw new Error('Error')
    }

    res.status(200).json({ message: 'Producto encontrado', proyecto });
  } catch(e) {
    res.status(400).json({ message: e.message })
  }
};

exports.update = async (req, res) => {
  const { body, params: { proyectoId }, userId } = req;
  try {
    const proyecto = await Proyecto.findOneAndUpdate({ _id: proyectoId, salesman: userId }, body, { new: true });

    if(!proyecto) {
      
      res.status(403).json({ message: 'El producto no pudo ser actualizado' });
      return
    }

    res.status(200).json({ message: 'Producto actualizado', proyecto });
  } catch(e) {
    res.status(400).json({ message: 'El producto no pudo ser actualizado' });
  }
};

exports.destroy = async (req, res) => {
  try {
    const { params: { proyectoId }, userId } = req;
    const proyecto = await Proyecto.findOneAndDelete({ _id: proyectoId, salesman: userId });

    if(!proyecto) {
      res.status(403).json({ message: 'El producto no pudo ser eliminado' });
      return
    }

    res.status(200).json({ message: 'El producto fue borrado', proyecto });
  } catch(e) {
    res.status(400).json({ message: 'El producto no pudo ser borrado' });
  }
};
