import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

const supabase_url = 'https://pqbbkefcjkgeaegdjgly.supabase.co';
const supabase_key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNDU0MjYxNSwiZXhwIjoxOTUwMTE4NjE1fQ.ru7h7rZM7L_HWK2IQbD6W3jaOxgP1BxJ3-QTP8k9XLU';
const supabase = createClient(supabase_url, supabase_key, {
  localStorage: AsyncStorage,
});

export default supabase;


