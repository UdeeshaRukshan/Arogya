import React, { useState, useEffect } from 'react';
import './Cal.css'; // Import your CSS file

export default function Cal() {
  const [leftInputs, setLeftInputs] = useState([{ itemName: '', buyingPrice: null, itemCount: null }]);
  const [rightInputs, setRightInputs] = useState([{ itemName: '', sellingPrice: null, itemCount: null }]);
  const [profit, setProfit] = useState(0);
  const [profitStatus, setProfitStatus] = useState('');

  // Function to add a new item to the left side
  const handleAddLeftInput = () => {
    setLeftInputs([...leftInputs, { itemName: '', buyingPrice: null, itemCount: null }]);
    setRightInputs([...rightInputs, { itemName: '', sellingPrice: null, itemCount: null }]);
  };

  // Function to remove an item from the left side
  const handleRemoveLeftInput = (index) => {
    const newLeftInputs = [...leftInputs];
    newLeftInputs.splice(index, 1);
    setLeftInputs(newLeftInputs);

    const newRightInputs = [...rightInputs];
    newRightInputs.splice(index, 1);
    setRightInputs(newRightInputs);
  };

  // Function to add a new item to the right side
  const handleAddRightInput = () => {
    setRightInputs([...rightInputs, { itemName: '', sellingPrice: null, itemCount: null }]);
    setLeftInputs([...leftInputs, { itemName: '', buyingPrice: null, itemCount: null }]);
  };

  // Function to remove an item from the right side
  const handleRemoveRightInput = (index) => {
    const newRightInputs = [...rightInputs];
    newRightInputs.splice(index, 1);
    setRightInputs(newRightInputs);

    const newLeftInputs = [...leftInputs];
    newLeftInputs.splice(index, 1);
    setLeftInputs(newLeftInputs);
  };

  // Function to handle changes in item name on the left side
  const handleLeftItemNameChange = (index, event) => {
    const { value } = event.target;
    const newLeftInputs = [...leftInputs];
    newLeftInputs[index].itemName = value;
    setLeftInputs(newLeftInputs);

    const updatedRightInputs = rightInputs.map((rightInput, idx) =>
      idx === index ? { ...rightInput, itemName: value } : rightInput
    );
    setRightInputs(updatedRightInputs);
  };

  // Function to handle changes in item name on the right side
  const handleRightItemNameChange = (index, event) => {
    const { value } = event.target;
    const newRightInputs = [...rightInputs];
    newRightInputs[index].itemName = value;
    setRightInputs(newRightInputs);
  };

  // Function to handle changes in input fields on the left side
  const handleLeftInputChange = (index, event) => {
    const { name, value } = event.target;
    const newLeftInputs = [...leftInputs];
    newLeftInputs[index][name] = value;
    setLeftInputs(newLeftInputs);
  };

  // Function to handle changes in input fields on the right side
  const handleRightInputChange = (index, event) => {
    const { name, value } = event.target;
    const newRightInputs = [...rightInputs];
    newRightInputs[index][name] = value;
    setRightInputs(newRightInputs);
  };

  // Function to calculate the total profit
  const calculateProfit = () => {
    let totalProfit = 0;
    leftInputs.forEach((leftInput, index) => {
      const buyingPrice = parseFloat(leftInput.buyingPrice) || 0;
      const itemCount = parseInt(leftInput.itemCount) || 0;
      const sellingPrice = parseFloat(rightInputs[index].sellingPrice) || 0;
      const soldItemCount = parseInt(rightInputs[index].itemCount) || 0;

      const totalBuyingCost = buyingPrice * itemCount;
      const totalSellingIncome = sellingPrice * soldItemCount;
      const profitPerSet = totalSellingIncome - totalBuyingCost;
      totalProfit += profitPerSet;
    });
    setProfit(totalProfit);
    // Determine profit status (profit or loss)
    if (totalProfit > 0) {
      setProfitStatus('profit');
    } else if (totalProfit < 0) {
      setProfitStatus('loss');
    } else {
      setProfitStatus('');
    }
  };

  // Effect to recalculate profit whenever inputs change
  useEffect(() => {
    calculateProfit();
  }, [leftInputs, rightInputs]);

  return (
    <div className="cal-container">
      <div className="left-side">
        <h3>Buying price</h3>
        {leftInputs.map((leftInput, index) => (
          <div className="input-group" key={index}>
            <input
              type="text"
              name="itemName"
              placeholder="Item Name"
              value={leftInput.itemName}
              onChange={(e) => handleLeftItemNameChange(index, e)}
            />
            <input
              type="number"
              name="buyingPrice"
              placeholder="Buying Price"
              value={leftInput.buyingPrice}
              onChange={(e) => handleLeftInputChange(index, e)}
            />
            <input
              type="number"
              name="itemCount"
              placeholder="Item Count"
              value={leftInput.itemCount}
              onChange={(e) => handleLeftInputChange(index, e)}
            />
            <button onClick={() => handleRemoveLeftInput(index)}>Remove</button>
            {leftInput.buyingPrice && leftInput.itemCount && (
              <p>Total Cost: {leftInput.buyingPrice * leftInput.itemCount}</p>
            )}
          </div>
        ))}
        <button onClick={handleAddLeftInput} className="add-btn">Add More Item</button>
      </div>
      <div className="right-side">
        <h3>Selling Price</h3>
        {rightInputs.map((rightInput, index) => (
          <div className="input-group" key={index}>
            <input
              type="text"
              name="itemName"
              placeholder="Item Name"
              value={rightInput.itemName}
              onChange={(e) => handleRightItemNameChange(index, e)}
            />
            <input
              type="number"
              name="sellingPrice"
              placeholder="Selling Price"
              value={rightInput.sellingPrice}
              onChange={(e) => handleRightInputChange(index, e)}
            />
            <input
              type="number"
              name="itemCount"
              placeholder="Item Count"
              value={rightInput.itemCount}
              onChange={(e) => handleRightInputChange(index, e)}
            />
            <button onClick={() => handleRemoveRightInput(index)}>Remove</button>
            {rightInput.sellingPrice && rightInput.itemCount && (
              <p>Total Income: {rightInput.sellingPrice * rightInput.itemCount}</p>
            )}
          </div>
        ))}
        <button onClick={handleAddRightInput} className="add-btn">Add More Right</button>
      </div>
      <div className={`calculate-profit ${profitStatus}`}>
        <button onClick={calculateProfit} className="cal-btn">Calculate Profit</button>
        <div>
          <h3>{`This is a ${profitStatus}`}</h3>
          <p>{`Total ${profitStatus}: ${profit}`}</p>
        </div>
      </div>
    </div>
  );
}
