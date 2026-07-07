const responses = {
  headache: {
    message: "I understand you have a headache. Common causes include tension, dehydration, eye strain, or migraine. \n\n**Immediate advice:**\n• Drink plenty of water\n• Rest in a quiet, dark room\n• Try OTC pain relief (Paracetamol 500mg)\n• Apply cold/warm compress\n\n**See a doctor if:** headache is severe, sudden, or accompanied by fever, stiff neck, or vision changes.",
    severity: 'Low-Medium',
    seeDoctor: false,
  },
  fever: {
    message: "A fever indicates your body is fighting an infection. \n\n**Immediate advice:**\n• Stay hydrated — drink plenty of fluids\n• Take Paracetamol 500mg to reduce temperature\n• Rest and avoid strenuous activity\n• Monitor temperature every 4 hours\n\n**See a doctor if:** temperature exceeds 103°F (39.4°C), lasts more than 3 days, or is accompanied by rash, difficulty breathing, or severe pain.",
    severity: 'Medium',
    seeDoctor: true,
  },
  cough: {
    message: "A persistent cough can have several causes — cold, flu, allergies, or respiratory infection.\n\n**Immediate advice:**\n• Stay hydrated\n• Use honey with warm water (natural soothing)\n• Avoid irritants like smoke\n• Try OTC cough syrup\n\n**See a doctor if:** cough produces blood, lasts more than 3 weeks, is accompanied by fever, or causes difficulty breathing.",
    severity: 'Low-Medium',
    seeDoctor: false,
  },
  'chest pain': {
    message: "⚠️ **URGENT — Chest pain requires immediate attention!**\n\nChest pain can indicate serious conditions including heart attack, angina, or pulmonary embolism.\n\n**Immediate action:**\n• Call emergency services (108) immediately\n• Sit or lie down, stay calm\n• If prescribed, take nitroglycerine\n• Do NOT drive yourself to hospital\n\n**This is a medical emergency. Please seek immediate care.**",
    severity: 'Critical',
    seeDoctor: true,
  },
  diabetes: {
    message: "Diabetes management requires regular monitoring and lifestyle changes.\n\n**Key tips:**\n• Monitor blood glucose regularly (target: 80-130 mg/dL fasting)\n• Follow prescribed medication schedule\n• Eat balanced meals, avoid high-sugar foods\n• Regular exercise (30 min daily)\n• HbA1c check every 3 months\n\n**Warning signs to watch:** excessive thirst, frequent urination, blurred vision, slow-healing wounds.",
    severity: 'Chronic',
    seeDoctor: true,
  },
  'blood pressure': {
    message: "Blood pressure management is crucial for heart health.\n\n**Normal range:** 120/80 mmHg\n**High BP (Hypertension):** >130/80 mmHg\n**Low BP (Hypotension):** <90/60 mmHg\n\n**For high BP:**\n• Reduce sodium intake\n• Regular exercise\n• Limit alcohol\n• Take prescribed medications consistently\n\n**Emergency:** If BP >180/120 with symptoms, seek immediate care.",
    severity: 'Monitor',
    seeDoctor: true,
  },
  'book appointment': {
    message: "I can help you book an appointment! 📅\n\nPlease use the **Book Appointment** section in your dashboard, or tell me:\n1. Which doctor/department you prefer\n2. Your preferred date and time\n\nAvailable doctors:\n• Dr. Ananya Desai — Cardiology\n• Dr. Vikram Rao — Pulmonology  \n• Dr. Neha Gupta — Neurology\n\nWould you like me to take you to the booking form?",
    severity: null,
    seeDoctor: false,
  },
  appointment: {
    message: "I can help you with appointments! 📅\n\nYour upcoming appointments:\n• July 15 — Dr. Ananya Desai (Cardiology) at 10:30 AM\n• July 28 — Dr. Neha Gupta (Endocrinology) at 2:00 PM\n\nTo book a new appointment, use the **Book Appointment** section in your dashboard.",
    severity: null,
    seeDoctor: false,
  },
  medication: {
    message: "Medication reminders and information:\n\n**Your current medications:**\n• Amlodipine 5mg — 1 tablet daily (morning)\n• Take with water, avoid grapefruit juice\n\n**General medication tips:**\n• Take at the same time each day\n• Never skip doses without consulting your doctor\n• Store in cool, dry place\n• Check for interactions with other medicines\n\nDo you have questions about a specific medication?",
    severity: null,
    seeDoctor: false,
  },
  default: {
    message: "Thank you for your message. I'm OmniShield's health assistant, and I can help with:\n\n• **Symptom assessment** — headache, fever, cough, chest pain\n• **Chronic conditions** — diabetes, blood pressure, heart disease\n• **Appointments** — booking and reminders\n• **Medications** — schedules and information\n• **General health Q&A**\n\nPlease describe your symptoms or health concern in detail, and I'll provide personalized guidance.",
    severity: null,
    seeDoctor: false,
  },
};

export function getChatbotResponse(message) {
  const msg = message.toLowerCase();
  
  if (msg.includes('chest pain') || msg.includes('chest ache') || msg.includes('heart pain')) {
    return responses['chest pain'];
  }
  if (msg.includes('blood pressure') || msg.includes('bp') || msg.includes('hypertension') || msg.includes('hypotension')) {
    return responses['blood pressure'];
  }
  if (msg.includes('book appointment') || msg.includes('schedule appointment') || msg.includes('make appointment')) {
    return responses['book appointment'];
  }
  if (msg.includes('appointment')) {
    return responses.appointment;
  }
  if (msg.includes('headache') || msg.includes('head ache') || msg.includes('migraine')) {
    return responses.headache;
  }
  if (msg.includes('fever') || msg.includes('temperature') || msg.includes('pyrexia')) {
    return responses.fever;
  }
  if (msg.includes('cough') || msg.includes('cold') || msg.includes('sneezing')) {
    return responses.cough;
  }
  if (msg.includes('diabetes') || msg.includes('blood sugar') || msg.includes('glucose') || msg.includes('insulin')) {
    return responses.diabetes;
  }
  if (msg.includes('medicine') || msg.includes('medication') || msg.includes('drug') || msg.includes('tablet') || msg.includes('pill')) {
    return responses.medication;
  }
  
  return responses.default;
}
