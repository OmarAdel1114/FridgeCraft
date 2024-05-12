import { useState } from "react";
import RemoveItem from "../../assets/remove-item.svg";
import ReOrderItem from "../../assets/reorder-item.svg";

const Ingredients = () => {
  const [count, setCount] = useState(1);

  const handleCount = () => {
    setCount((prev) => prev + 1);
  };

  return (
    <div>
      {Array.from({ length: count })?.map((arr, i) => (
        <div className="flex justify-between items-center mt-8" key={i}>
          <div className="flex">
            <img
              src={ReOrderItem}
              alt="reorde-item-img"
              width={35}
              height={35}
            />
            <input
              type="text"
              className="w-[34.87rem] p-3 border bg-[#FBFBFB] rounded-lg ml-5"
              placeholder="Item"
            />
          </div>
          <div>
            <img
              src={RemoveItem}
              width={35}
              height={35}
              alt="remove-item-img"
            />
          </div>
        </div>
      ))}
      <button onClick={handleCount} type="button" className="mt-8">
        <p className="text-[24px] font-medium" >+ Add Ingredient</p>
      </button>
    </div>
  );
};

export default Ingredients;
