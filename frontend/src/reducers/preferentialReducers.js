import { CONFIRM_PREFERENTIAL } from "../constants/PreferentialConstants";

export default function PreferentialOrder(state = { orderList: [] }, action) {
  switch (action.type) {
    case CONFIRM_PREFERENTIAL:
      return;
  }
}
