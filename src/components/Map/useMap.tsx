import { shallowEqual } from "react-redux";

import { useAppSelector } from "../../redux/hooks";
import { selectMap } from "../../redux/map/map-slice";

export const useMap = () => {
  return useAppSelector(selectMap, shallowEqual);
};
