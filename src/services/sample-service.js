import axios from 'axios';
import Sample from '../models/sample-model.js';

export const getSample = async (baseCurrency) => {
  const code = baseCurrency.toUpperCase();
  const apiKey = process.env.EXCHANGE_API_KEY;
  
  //  Verify cache in db
  const cachedData = await Sample.findOne({ base_code: code }); // example of code to filter
  const currentTime = Math.floor(Date.now() / 1000); //  current time

  // if data exists and the current date is minor to the next update, use the cache 
  if (cachedData && currentTime < cachedData.time_next_update_unix) {
    console.log(`[Service] Retornando caché válido para ${code}`);
    return cachedData;
  }

  const url = `https://Sample//${apiKey}/latest/${code}`;

  try {
    const response = await axios.get(url);
    const apiData = response.data;

    if (apiData.result === 'error') {
      throw new Error(`API_ERROR: ${apiData['error-type']}`);
    }

    // Upsert
    const updatedRate = await Sample.findOneAndUpdate(
      { base_code: code }, // example of code to filter
      {
        // define the json structure of responde
      },
      { new: true, upsert: true }
    );

    return updatedRate;

  } catch (error) {
    throw error;
  }
};
