from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from prophet import Prophet
import pandas as pd
from typing import List, Dict, Any

app = FastAPI()

# Enable CORS for the React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Restrict this to your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define the expected JSON payload structure using Pydantic
class PredictPayload(BaseModel):
    data: List[Dict[str, Any]]

# Notice this is 'def', not 'async def'. 
# FastAPI will automatically run this heavily synchronous ML task in a threadpool!
@app.post("/predict")
def predict_disease(payload: PredictPayload):
    # payload.data is automatically parsed into a Python list of dictionaries
    df = pd.DataFrame(payload.data)
    df.rename(columns={'timestamp': 'ds', 'cases': 'y'}, inplace=True)
    
    # Train the Prophet model without freezing the server
    model = Prophet()
    model.fit(df)
    
    # Generate 24-hour forecast
    future = model.make_future_dataframe(periods=24, freq='H')
    forecast = model.predict(future)
    
    # Format and return the results
    result = forecast.tail(24)[['ds', 'yhat']].to_dict(orient='records')
    return result

# The entry point to actually start the server
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)