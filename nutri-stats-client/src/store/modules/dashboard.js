import axiosInstance from "../../axios-config";
import { sumMealNutrients } from "../../utils/sumMealNutrients";
const state = {
  meals: {
    breakfast: {
      mealId: null,
      items: [],
      nutrientTotals: {},
    },
    lunch: {
      mealId: null,
      items: [],
      nutrientTotals: {},
    },
    dinner: {
      mealId: null,
      items: [],
      nutrientTotals: {},
    },
    snacks: {
      mealId: null,
      items: [],
      nutrientTotals: {},
    },
  },
};

const mutations = {
  SET_MEAL_DATA(state, payload) {
    const { _id, user, createdAt, mealType, items, ...totals } = payload;

    const { breakfast, lunch, dinner, snacks } = state.meals;
    switch (mealType) {
      case "breakfast":
        breakfast.mealId = _id;
        breakfast.mealNutrients = { ...totals };
        breakfast.items = [...items];
        break;
      case "lunch":
        lunch.mealId = _id;
        lunch.mealNutrients = { ...totals };
        lunch.items = [...items];
        break;
      case "dinner":
        dinner.mealId = _id;
        dinner.mealNutrients = { ...totals };
        dinner.items = [...items];
        break;
      case "snacks":
        snacks.mealId = _id;
        snacks.mealNutrients = { ...totals };
        snacks.items = [...items];
        break;
      default:
        break;
    }
  },

  CLEAR_MEAL_DATA() {
    state.meals.breakfast = { mealId: null, items: [], nutrientTotals: {} };
    state.meals.lunch = { mealId: null, items: [], nutrientTotals: {} };
    state.meals.dinner = { mealId: null, items: [], nutrientTotals: {} };
  },

  ADD_MEAL_ITEM(state, payload) {
    const { mealType, ...itemData } = payload;
    const { breakfast, lunch, dinner, snacks } = state.meals;

    switch (mealType) {
      case "breakfast":
        breakfast.items.push(itemData);
        break;
      case "lunch":
        lunch.items.push(itemData);
        break;
      case "dinner":
        dinner.items.push(itemData);
        break;
      case "snacks":
        snacks.items.push(itemData);
        break;
      default:
        break;
    }
  },

  DELETE_MEAL_ITEM(state, payload) {
    const { mealType, itemId } = payload;
    const { breakfast, lunch, dinner, snacks } = state.meals;
    switch (mealType) {
      case "breakfast":
        breakfast.items = breakfast.items.filter((item) => item._id !== itemId);
        break;
      case "lunch":
        lunch.items = lunch.items.filter((item) => item._id !== itemId);
        break;
      case "dinner":
        dinner.items = dinner.items.filter((item) => item._id !== itemId);
        break;
      case "snacks":
        snacks.items = snacks.items.filter((item) => item._id !== itemId);
        break;
      default:
        break;
    }
  },

  UPDATE_TOTALS(state, payload) {
    const { mealType, ...totals } = payload;
    const { breakfast, lunch, dinner, snacks } = state.meals;

    switch (mealType) {
      case "breakfast":
        breakfast.nutrientTotals = { ...totals };
        break;
      case "lunch":
        lunch.nutrientTotals = { ...totals };
        break;
      case "dinner":
        dinner.nutrientTotals = { ...totals };
        break;
      case "snacks":
        snacks.nutrientTotals = { ...totals };
        break;
      default:
        break;
    }
  },
};

const actions = {
  async fetchMealsData({ commit, getters }) {
    const date = getters.getDate.toISOString().slice(0, 10);
    const response = await axiosInstance.get(
      `api/meal?currentDate=${date}`,
      { date: date },
      { headers: { "Content-Type": "application/json" } }
    );

    if (response.data.meals.length === 0) {
      await commit("CLEAR_MEAL_DATA");
      return;
    }

    response.data.meals.forEach((meal) => {
      commit("SET_MEAL_DATA", meal);
      const updatedTotals = sumMealNutrients(state.meals[meal.mealType].items);
      commit("UPDATE_TOTALS", { mealType: meal.mealType, ...updatedTotals });
    });
  },

  async addItemToMeal({ commit }, itemData) {
    let { mealId } = state.meals[itemData.mealType];

    //If this is the first item, check if meal exist
    if (mealId === null) {
      //Create meal in db
      const response = await axiosInstance.post(
        `api/meal`,
        { mealType: itemData.mealType, ...state.getBreakfastTotals },
        { headers: { "Content-Type": "application/json" } }
      );
      await commit("SET_MEAL_DATA", {
        mealType: itemData.mealType,
        ...response.data,
      });
      mealId = response.data._id;
    }

    //Add item to meal
    const newItem = await axiosInstance.put(
      `api/meal?mealId=${mealId}`,
      { ...itemData.foodItem },
      { headers: { "Content-Type": "application/json" } }
    );

    await commit("ADD_MEAL_ITEM", {
      mealType: itemData.mealType,
      ...newItem.data,
    });
    const updatedTotals = sumMealNutrients(
      state.meals[itemData.mealType].items
    );
    commit("UPDATE_TOTALS", { mealType: itemData.mealType, ...updatedTotals });
  },

  async deleteMealItem({ commit }, { itemId, mealType }) {
    const result = await axiosInstance.delete(`api/meal/${itemId}`);
    await commit("DELETE_MEAL_ITEM", { itemId, mealType });
    const updatedTotals = sumMealNutrients(state.meals[mealType].items);
    commit("UPDATE_TOTALS", { mealType, ...updatedTotals });
  },
};

const getters = {
  getBreakfastItems() {
    return state.meals.breakfast.items;
  },
  getLunchItems() {
    return state.meals.lunch.items;
  },
  getDinnerItems() {
    return state.meals.dinner.items;
  },
  getSnackItems() {
    return state.meals.snacks.items;
  },
  getBreakfastTotals() {
    return state.meals.breakfast.nutrientTotals;
  },
  getLunchTotals() {
    return state.meals.lunch.nutrientTotals;
  },
  getDinnerTotals() {
    return state.meals.dinner.nutrientTotals;
  },
  getSnackTotals() {
    return state.meals.snacks.nutrientTotals;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
