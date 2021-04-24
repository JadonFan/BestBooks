const categoryReducer = (state = {categoryNames: [], currCategory: "", currCategoryEncoded: ""}, action) => {
  switch(action.type) {
    case 'SET_AND_FIRST':
      const categoryNames = action.payload.categoryNames;
      return {...state, categoryNames, currCategory: categoryNames[0].list_name, currCategoryEncoded: categoryNames[0].list_name_encoded};
    case 'CHANGE_CURRENT':
      const nextCategory = action.payload.nextCategory;
      return {...state, currCategory: nextCategory.list_name, currCategoryEncoded: nextCategory.list_name_encoded};
    default:
      return state;
  } 
};

export default categoryReducer;