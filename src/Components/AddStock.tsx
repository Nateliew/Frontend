import { useState } from "react";

export default function AddStock(createNewStock: any) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("1");

  const submit = () => {
    createNewStock(name, price);
    setName("");
    setPrice("");
  };

  return (
    <div>
      <h3>Add Stock</h3>
      <label>Stock Name:</label>
      <br />
      <input
        type="text"
        value={name}
        placeholder="Add in product name"
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <label>Stock Price:</label>
      <br />
      <input
        type="number"
        onChange={(e) => setPrice(e.target.value)}
        value={price}
      />
      <br />
      <button onClick={submit}>Add Product</button>
    </div>
  );
}
