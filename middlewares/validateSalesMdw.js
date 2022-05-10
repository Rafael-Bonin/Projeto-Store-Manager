const validateQuantity = (req, res, next) => {
  try {
    const { body } = req;
    const correct = body.some((b) => b.quantity === undefined);
    if (correct) {
 return res.status(400)
    .json({ message: '"quantity" is required' }); 
}
    const correct2 = body.some((b) => b.quantity <= 0);
    if (correct2) {
 return res.status(422)
    .json({ message: '"quantity" must be greater than or equal to 1' }); 
}
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const validateProductId = (req, res, next) => {
  try {
    const { body } = req;
    const correct = body.some((b) => !b.productId);
    if (correct) return res.status(400).json({ message: '"productId" is required' });
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  validateQuantity,
  validateProductId,
};