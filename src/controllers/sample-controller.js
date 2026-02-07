import * as exchangeService from '../services/sample-service.js';

export const getRates = async (req, res) => {
  try {
    const { base } = req.params;
    
    const data = await exchangeService.getExchangeRates(base);

    // Response to client
    res.status(200).json({
      // example of response structure
      success: true,
      base: data.base_code,
      rates: data.conversion_rates,
      next_update: data.time_next_update_unix
    });

  } catch (error) {
    console.error(error);

    // Example of Error handling
    if (error.message.includes('unsupported-code')) {
      return res.status(400).json({ message: 'Currency code is not supported.' });
    }
    if (error.message.includes('quota-reached')) {
      return res.status(429).json({ message: 'API request limit reached.' });
    }
    if (error.message.includes('invalid-key')) {
      return res.status(401).json({ message: 'Invalid API Key configuration.' });
    }

    res.status(500).json({ message: 'Internal Server Error.' });
  }
};
