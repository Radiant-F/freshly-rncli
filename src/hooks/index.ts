// redux
import {useSelector, useDispatch} from 'react-redux';
import type {RootState, AppDispatch} from '../redux/store';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

// hooks
import useFormatIDR from './useFromatIDR';
import useOrientation from './useOrientation';
export {useFormatIDR, useOrientation};
