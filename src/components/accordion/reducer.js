import match from "@/utils/match";

export const AccordionActionsEnum = {
  Open: 1,
  Close: 2,
  Toggle: 3,
  SetLinkedButton: 4,
  SetLinkedContent: 5,
};

export const accordionReducers = {
  [AccordionActionsEnum.Open]: (state) => ({
    ...state,
    open: true,
  }),
  [AccordionActionsEnum.Close]: (state) => ({
    ...state,
    open: false,
  }),
  [AccordionActionsEnum.Toggle]: (state) => ({
    ...state,
    open: !state.open,
  }),
  [AccordionActionsEnum.SetLinkedButton]: (state, { buttonId }) => ({
    ...state,
    buttonId,
  }),
  [AccordionActionsEnum.SetLinkedContent]: (state, { contentId }) => ({
    ...state,
    contentId,
  }),
};

export const defaultAccordionState = {
  buttonId: null,
  contentId: null,
  open: false,
};

export const accordionReducer = (state, action) =>
  match(action.type, accordionReducers, state, action);
