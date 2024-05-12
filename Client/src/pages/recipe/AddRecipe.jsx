import { useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import DropzoneComponent from "./RecipeImageUpload";
import Ingredients from "./Ingredients";
import RecipeSteps from "./RecipeSteps";

const AddRecipe = () => {
  const { auth } = useSelector((state) => state.auth);
  const [authMessage, setAuthMessage] = useState("");
  useLayoutEffect(() => {
    if (!auth) {
      setAuthMessage("You are not logged in, please login to Add a recipe!");
    }
  }, [auth]);

  return (
    <>
      <h3>{authMessage?.length > 0 && authMessage}</h3>

      <div className="2xl:w-[80rem] lg:w-[60rem] m-auto">
        <div className="w-auto  h-auto py-10 px-10 bg-white border mt-20 shadow-lg">
          <p className="text-[3rem] font-serif text-center">Add a Recipe</p>
          <p className="text-[1.2rem] mt-8 w-[1140px] block">
            Feeling like a kitchen Picasso? We want to see your masterpiece! Add
            your recipe and show off your culinary creativity.
          </p>
          <div className="w-[1140px] border mt-10"></div>

          <DropzoneComponent />

          <form className="mt-10">
            <div>
              <label className="text-[24px] font-medium">Recipe Title</label>
              <input
                type="text"
                className="w-full border p-3 mt-2 bg-[#FBFBFB] rounded-lg"
                placeholder="Enter your recipe title"
                required
              />
            </div>

            <div className="mt-8">
              <label className="text-[24px] font-medium"> Description</label>
              <textarea
                type="text"
                className="w-full border mt-2 p-3 h-40 bg-[#FBFBFB] rounded-lg"
                placeholder="Enter your recipe title"
                required
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
              <Ingredients />
            </div>

            <div className="w-[1140px] border mt-10"></div>

            <div className="mt-8">
              <label className="text-[24px] font-medium">Instructions</label>
              <p className="mt-3 text-[22px]">
                Break down your recipe into clear, step-by-step instructions.
              </p>

              <RecipeSteps />
            </div>

            <div className="w-[1140px] border mt-10"></div>


          </form>
        </div>
      </div>
    </>
  );
};

export default AddRecipe;
