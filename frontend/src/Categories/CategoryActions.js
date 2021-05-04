export const setCategories = categoryNames => dispatch => {
  if (categoryNames === undefined || categoryNames.length === 0) return;
  return dispatch({
    type: 'SET_AND_FIRST',
    payload: {categoryNames}
  });
};

export const changeCategory = nextCategory => dispatch => {
  dispatch({
    type: 'CHANGE_CURRENT',
    payload: {nextCategory}
  });
};