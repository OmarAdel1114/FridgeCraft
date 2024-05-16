import { useState } from "react";
import DropzoneComponent from "./RecipeImageUpload";
import Ingredients from "./Ingredients";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Main from "../../Components/Main";
import Header from "../../Components/Navbar";
import { useSelector } from "react-redux";

const AddRecipe = () => {
  const [ingredientInputs, setIngredientInputs] = useState([""]);
  const { user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    recipeTitle: "",
    recipeOverview: "",
    instructions: "",
    recipeImage: "",
  });

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (imageName) => {
    setFormData({
      ...formData,
      recipeImage: imageName,
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
    console.log(e);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();

    form.append("recipeImage", formData.recipeImage);
    form.append("recipeOverview", formData.recipeOverview);
    form.append("recipeTitle", formData.recipeTitle);
    form.append("instructions", formData.instructions);

    ingredientInputs.forEach((ingredient, index) => {
      form.append(`ingredients[${index}]`, ingredient);
    });

    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "https://fridge-craft-server.vercel.app/api/recipes/add",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data;
      console.log(data);
      toast.success("Recipe added successfully", {
        position: "top-right",
      });

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
    <div className="w-full lg:max-w-[1240px] lg:mx-auto px-6 md:px-16 lg:px-0 pb-20">
      <ToastContainer />
      <div>
        <div className="w-auto  h-auto py-10 px-10 bg-white border mt-20 shadow-lg">
          <p className="lg:text-[3rem] text-[2rem] font-serif text-center">Add a Recipe</p>
          <p className="lg:text-[1.2rem] mt-8 lg:w-[1140px] block">
            Feeling like a kitchen Picasso? We want to see your masterpiece! Add
            your recipe and show off your culinary creativity.
          </p>
          <div className="lg:w-[1140px] border mt-10"></div>

          <DropzoneComponent handleFileChange={handleImageChange} />

          <form className="mt-10" onSubmit={handleSubmit}>
            <div>
              <label className="lg:text-[24px] text-[18px] font-medium">Recipe Title</label>
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
              <label className="lg:text-[24px] text-[18px] font-medium"> Description</label>
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

            <div className="lg:w-[1140px] border mt-10"></div>

            <div className="mt-8">
              <label className="lg:text-[24px] text-[18px] font-medium">Ingredients</label>
              <p className="mt-3 lg:text-[22px]">
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

            <div className="lg:w-[1140px] border mt-10"></div>

            <div className="mt-8">
              <label className="lg:text-[24px] text-[18px] font-medium">Instructions</label>
              <p className="mt-3 lg:text-[22px]">
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

            <div className="flex flex-wrap justify-center lg:justify-start mt-10 mb-10">
              <button className="w-[10rem] lg:w-auto px-8 py-3 lg:mb-0 mb-4 border-DarkGreen border rounded-[2rem] lg:mr-5">
                Cancel
              </button>
              <button className="w-[10rem] lg:w-auto lg:px-10 lg:py-4 p-3  bg-DarkGreen text-white rounded-[2rem] text-base">
                Submit Recipe
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddRecipe;
