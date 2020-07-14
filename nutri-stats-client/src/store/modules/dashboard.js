import axiosInstance from '../../axios-config';

const state = {
  meals: {
    breakfast: {
      items: [],
      mealNutrients: {},
    },
    lunch: {
      items: [],
      mealNutrients: {},
    },
    dinner: {
      items: [],
      mealNutrients: {},
    },
    snacks: {
      items: [],
      mealNutrients: {},
    },
  },
};

const mutations = {
  SET_MEAL_DATA(state, payload) {
    const { id, title, createdAt, status, userId, ...totals } = payload;
    const { breakfast, lunch, dinner, snacks } = state.meals;
    switch (status) {
      case 'breakfast':
        breakfast.mealNutrients = { ...totals };
        break;
      case 'lunch':
        lunch.imealNutrients = { ...totals };
        break;
      case 'dinner':
        dinner.mealNutrients = { ...totals };
        break;
      case 'snacks':
        snacks.mealNutrients = { ...totals };
        break;
      default:
        break;
    }
  },

  ADD_MEAL_ITEM(state, payload) {
    const { foodItem, mealType } = payload;
    const { breakfast, lunch, dinner, snacks } = state.meals;
    console.log(foodItem);
    switch (mealType) {
      case 'breakfast':
        breakfast.items.push(foodItem);
        break;
      case 'lunch':
        lunch.items.push(foodItem);
        break;
      case 'dinner':
        dinner.items.push(foodItem);
        break;
      case 'snacks':
        snacks.items.push(foodItem);
        break;
      default:
        break;
    }
  },
};

const actions = {
  async fetchMealsData({ commit, getters }) {
    const date = getters.getDate.toISOString().slice(0, 10);
    const response = await axiosInstance.post(
      '/meals',
      { date: date },
      { headers: { 'Content-Type': 'application/json' } }
    );

    response.data.forEach((meal) => {
      commit('SET_MEAL_DATA', meal);
    });
  },

  async addItemToMeal({ commit }, itemData) {
    console.log(itemData);
    commit('ADD_MEAL_ITEM', itemData);
  },
};

const getters = {
  getBreakfastItems() {
    console.log(state.meals.breakfast.items);
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
    return state.meals.breakfast.mealNutrients;
  },
  getLunchTotals() {
    return state.meals.lunch.mealNutrients;
  },
  getDinnerTotals() {
    return state.meals.dinner.mealNutrients;
  },
  getSnackTotals() {
    return state.meals.snacks.mealNutrients;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
