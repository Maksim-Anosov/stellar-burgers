import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFeedsApi } from '@api';
import { TIngredient, TOrder } from '@utils-types';

type TFeedState = {
  orders: TOrder[];
  ingredients: TIngredient[];
  total: number;
  totalToday: number;
  isLoading: boolean;
  error: string;
  number: number;
};

const 
