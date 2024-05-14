import { useState } from "react";
import DropzoneComponent from "./RecipeImageUpload";
import Ingredients from "./Ingredients";
import RecipeSteps from "./RecipeSteps";
import axiosInstance from "../../api/config";
import { ToastContainer, toast } from "react-toastify";

const AddRecipe = () => {
  const [ingredientInputs, setIngredientInputs] = useState([""]);

  const [formData, setFormData] = useState({
    recipeTitle: "",
    recipeOverview: "",
    photo: "",
    instructions: "",
  });

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (imageName) => {
    setFormData({
      ...formData,
      photo: imageName,
    });
  };

  const handleIngredientsChange = (index, value) => {
    const newInputs = [...ingredientInputs];
    newInputs[index] = value;
    setIngredientInputs(newInputs);
  };

  const handleAddIngredientsInput = () => {
    setIngredientInputs([...ingredientInputs, ""]);
  };

  const deleteIngredient = (e) => {
    const newInputs = [...ingredientInputs];
    newInputs.splice(e, 1);
    setIngredientInputs(newInputs);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = {
      ...formData,
      ingredients: ingredientInputs,
    };

    try {
      const response = await axiosInstance.post("/recipes/add", dataToSend);
      const data = response.data;
      return data;
    } catch (e) {
      console.log(e);
      toast.error(e?.response?.data?.error, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="2xl:w-[80rem] lg:w-[60rem] m-auto overflow-auto mb-20">
        <div className="w-auto  h-auto py-10 px-10 bg-white border mt-20 shadow-lg">
          <p className="text-[3rem] font-serif text-center">Add a Recipe</p>
          <p className="text-[1.2rem] mt-8 w-[1140px] block">
            Feeling like a kitchen Picasso? We want to see your masterpiece! Add
            your recipe and show off your culinary creativity.
          </p>
          <div className="w-[1140px] border mt-10"></div>

          <DropzoneComponent handleFileChange={handleImageChange} />

          <form className="mt-10" onSubmit={handleSubmit}>
            <div>
              <label className="text-[24px] font-medium">Recipe Title</label>
              <input
                type="text"
                className="w-full border p-3 mt-2 bg-[#FBFBFB] rounded-lg"
                placeholder="Enter your recipe title"
                // required
                name="recipeTitle"
                value={formData.recipeTitle}
                onChange={handleInputChange}
              />
            </div>

            <div className="mt-8">
              <label className="text-[24px] font-medium"> Description</label>
              <textarea
                type="text"
                className="w-full border mt-2 p-3 h-40 bg-[#FBFBFB] rounded-lg"
                placeholder="Enter your recipe title"
                // // required
                value={formData.recipeOverview}
                name="recipeOverview"
                onChange={handleInputChange}
              />
            </div>

            <div className="w-[1140px] border mt-10"></div>

            <div className="mt-8">
              <label className="text-[24px] font-medium">Ingredients</label>
              <p className="mt-3 text-[22px]">
                List one ingredient per line, specifying quantities (1, 2),
                measurements (cups, spoons), and any prep details (chopped,
                sifted) along with the item. Let your creativity flow in every
                detail!
              </p>
              <Ingredients
                ingredientInputs={ingredientInputs}
                handleAddInput={handleAddIngredientsInput}
                handleChange={handleIngredientsChange}
                deleteIngredients={deleteIngredient}
              />
            </div>

            <div className="w-[1140px] border mt-10"></div>

            <div className="mt-8">
              <label className="text-[24px] font-medium">Instructions</label>
              <p className="mt-3 text-[22px]">
                Break down your recipe into clear, step-by-step instructions.
              </p>
              <textarea
                type="text"
                className="w-full border mt-2 p-3 h-40 bg-[#FBFBFB] rounded-lg"
                placeholder="Enter steps needed for your recipe"
                // // required
                value={formData.instructions}
                name="instructions"
                onChange={handleInputChange}
              />
            </div>

            <div className="w-[1140px] border mt-10"></div>

            <div className="flex mt-10 mb-10">
              <button className="w-auto px-8 border-DarkGreen border rounded-[2rem] mr-5">
                Cancel
              </button>
              <button className="w-auto px-10 py-4 bg-DarkGreen text-white rounded-[2rem] text-base">
                Submit Recipe
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddRecipe;
