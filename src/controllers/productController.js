export function getAllProduct(req, res) {
  res.status(200).send("You just fetched by Product");
}

export function createProduct(req, res) {
  res.status(201).json({ message: "Product created successfully" });
}

export function updateProduct(req, res) {
  res.status(200).json({ message: "Product updated successfully" });
}

export function deleteProduct(req, res) {
  res.status(200).json({ message: "Product deleted successfully" });
}
