from fastapi import FastAPI, Request
from prophet import Prophet
import pandas as pd

app = FastAPI()

@app.post("/predict")
async def predict_disease(request: Request):
    payload = await request.json()
    df = pd.DataFrame(payload['data'])
    df.rename(columns={'timestamp': 'ds', 'cases': 'y'}, inplace=True)
    model = Prophet()
    model.fit(df)
    future = model.make_future_dataframe(periods=24, freq='H')
    forecast = model.predict(future)
    result = forecast.tail(24)[['ds', 'yhat']].to_dict(orient='records')
    return result