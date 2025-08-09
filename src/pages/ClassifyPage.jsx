import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import WastePhotoUpload from '../components/WastePhotoUpload';
import WasteClassificationResult from '../components/WasteClassificationResult';
import NotificationToast from '../collector/NotificationToast';

const ClassifyPage = () => {
  const { addClassificationToHistory } = useAppContext();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState({ visible: false, message: '', type: 'info' });

  const getWasteIcon = (type = '') => ({ 'Organic': '🌿', 'Plastic': '♻️', 'Metal': '🔧', 'Paper': '📄', 'E-waste': '💻', 'Trash': '🗑️', 'Glass': '🍾', 'Cardboard': '📦', 'Television': '📺' }[type] || '🗑️');
  const getWasteColor = (type = '') => ({ 'Organic': '#4caf50', 'Plastic': '#2196f3', 'Metal': '#9e9e9e', 'Paper': '#ff9800', 'E-waste': '#9c27b0', 'Trash': '#607d8b', 'Glass': '#00bcd4', 'Cardboard': '#795548', 'Television': '#9c27b0' }[type] || '#4caf50');

  const processImage = async (file) => {
    setIsProcessing(true);
    setResult(null);
    setError(null);

    const formData = new FormData();
    formData.append('image', file);

    const reader = new FileReader();
    reader.onload = (event) => {
      setImagePreview(event.target.result);
    };
    reader.readAsDataURL(file);

    try {
      const functionUrl = 'http://localhost:3001/classify';
      const response = await fetch(functionUrl, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`AI service failed with status: ${response.status}`);
      }

      const aiResult = await response.json();
      const classification = aiResult.label.toLowerCase();
      
      let disposalTip = '';
      let handlingTip = '';

      try {
        const prompt = `Provide practical, step-by-step recycling or disposal instructions for the following item: ${classification}. Give two short, distinct recommendations: one for "DIY Disposal" (like composting or creative reuse) and one for "Proper Handling" (how to prepare it for collection).`;
        const payload = { contents: [{ role: "user", parts: [{ text: prompt }] }] };
        const apiKey = "";
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
        const geminiResponse = await fetch(apiUrl, {
                   method: 'POST',
                   headers: { 'Content-Type': 'application/json' },
                   body: JSON.stringify(payload)
               });

        if (geminiResponse.ok) {
            const geminiResult = await geminiResponse.json();
            if (geminiResult.candidates && geminiResult.candidates[0]?.content?.parts[0]?.text) {
                const suggestionsText = geminiResult.candidates[0].content.parts[0].text;
                const disposalMatch = suggestionsText.match(/DIY Disposal:(.*?)Proper Handling:/is);
                const handlingMatch = suggestionsText.match(/Proper Handling:(.*)/is);

                if (disposalMatch && handlingMatch) {
                    disposalTip = disposalMatch[1].trim();
                    handlingTip = handlingMatch[1].trim();
                }
            }
        }
      } catch (geminiError) {
        console.error("Could not fetch AI tips, falling back to predefined.", geminiError);
      }

      if (!disposalTip || !handlingTip) {
          const tips = {
            organic: { disposal: "You can compost this at home! Start a compost bin to turn food scraps into nutrient-rich soil.", handling: "Store in a sealed container to avoid pests before composting." },
            plastic: { disposal: "Check the recycling number on the item. Not all plastics are recyclable curbside. This may need to be taken to a special facility.", handling: "Rinse the item to remove food residue before recycling." },
            metal: { disposal: "Metal cans are highly recyclable. You can usually place them in your curbside recycling bin.", handling: "Be careful of sharp edges. Consider crushing cans to save space." },
            paper: { disposal: "Most paper and cardboard can be recycled. Avoid recycling paper with food stains or waxy coatings.", handling: "Keep it dry and flat. Remove any plastic wrapping." },
            'e-waste': { disposal: "This is hazardous and MUST NOT go in regular trash. It contains valuable materials that can be recovered and harmful ones that need safe disposal.", handling: "Find a certified e-waste collection center or look for local collection events." },
            trash: { disposal: "This item is likely not recyclable and should be placed in general waste.", handling: "Ensure any sharp objects are safely contained before disposing." },
            glass: { disposal: "Glass bottles and jars are typically recyclable. Check with your local program.", handling: "Rinse containers and remove lids if required by your local recycling service." },
            cardboard: { disposal: "Cardboard is highly recyclable. Flatten boxes to save space in your recycling bin.", handling: "Remove any plastic tape or packaging materials before recycling." }
          };
          
          let tipData = tips[classification];
          if (!tipData) {
              if (classification.includes('tv') || classification.includes('television') || classification.includes('monitor') || classification.includes('computer') || classification.includes('phone')) {
                tipData = tips['e-waste'];
              } else if (classification.includes('bottle') || classification.includes('container')) {
                tipData = tips.plastic;
              } else if (classification.includes('box')) {
                tipData = tips.cardboard;
              } else {
                tipData = tips.trash;
              }
          }
          
          disposalTip = tipData.disposal;
          handlingTip = tipData.handling;
      }

      const newResult = {
        classification: classification.charAt(0).toUpperCase() + classification.slice(1),
        confidence: Math.round(aiResult.score * 100),
        disposalTip: disposalTip,
        handlingTip: handlingTip,
        imagePreview: imagePreview,
      };

      setResult(newResult);
      await addClassificationToHistory(newResult);
      setShowToast({ visible: true, message: 'Classification successful! 25 credits added.', type: 'success' });
    } catch (err) {
      console.error("Error classifying image:", err);
      setError("Sorry, the AI classifier couldn't analyze this image. Please try another one.");
      setShowToast({ visible: true, message: 'Classification failed. Please try again.', type: 'error' });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleScheduleClick = () => {
    if (result) {
      navigate('/schedule', { state: { wasteType: result.classification } });
    }
  };
  
  return (
    <div style={{ padding: '2rem 1rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: '#2e7d32', fontSize: '2.5rem', margin: '0 0 1rem 0' }}>
          🤖 AI Waste Classifier
        </h1>
        <p style={{ color: '#666', fontSize: '1.2rem', margin: 0, maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
          Upload a photo to instantly classify your waste and get smart disposal tips.
        </p>
      </div>

      <div style={{ maxWidth: '500px', margin: '0 auto' }}>
        <WastePhotoUpload onImageUpload={processImage} isUploading={isProcessing} />
      </div>

      {error && (
        <div style={{ maxWidth: '600px', margin: '2rem auto 0', padding: '1rem', borderRadius: '8px', backgroundColor: '#ffcdd2', color: '#c62828', textAlign: 'center' }}>
          {error}
        </div>
      )}

      {result && (
        <div style={{ maxWidth: '600px', margin: '2rem auto 0 auto', animation: 'fadeIn 0.5s ease' }}>
          <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }`}</style>
          <div style={{ backgroundColor: 'white', borderRadius: '16px', border: `2px solid ${getWasteColor(result.classification)}`, boxShadow: '0 4px 20px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
            <div style={{ padding: '2rem', textAlign: 'center' }}>
              <img src={imagePreview} alt="Uploaded waste" style={{ maxWidth: '150px', maxHeight: '150px', borderRadius: '8px', marginBottom: '1rem', border: '3px solid white', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }} />
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>{getWasteIcon(result.classification)}</div>
              <h2 style={{ color: getWasteColor(result.classification), margin: '0 0 0.5rem 0', fontSize: '2rem', fontWeight: '700' }}>
                {result.classification}
              </h2>
              <div style={{ backgroundColor: getWasteColor(result.classification), color: 'white', padding: '0.5rem 1rem', borderRadius: '20px', display: 'inline-block', marginBottom: '1.5rem', fontSize: '0.9rem', fontWeight: '600' }}>
                {result.confidence}% Confidence
              </div>
            </div>
            <div style={{ backgroundColor: '#f8f9fa', padding: '1.5rem' }}>
              <h3 style={{ color: '#2e7d32', margin: '0 0 1rem 0', borderBottom: '2px solid #e0e0e0', paddingBottom: '0.5rem' }}>💡 AI Recommendations</h3>
              <div style={{ marginBottom: '1rem' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#1a531d' }}>DIY Disposal:</h4>
                <p style={{ margin: 0, color: '#666', fontSize: '0.95rem' }}>{result.disposalTip}</p>
              </div>
              <div>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#1a531d' }}>How to Handle:</h4>
                <p style={{ margin: 0, color: '#666', fontSize: '0.95rem' }}>{result.handlingTip}</p>
              </div>
            </div>
            <div style={{ padding: '1.5rem', textAlign: 'center', backgroundColor: '#e8f5e8' }}>
                <button onClick={handleScheduleClick} style={{ backgroundColor: '#4caf50', color: 'white', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>
                    Schedule Pickup for this Item
                </button>
            </div>
          </div>
        </div>
      )}
      <NotificationToast
        message={showToast.message}
        type={showToast.type}
        isVisible={showToast.visible}
        onClose={() => setShowToast({ ...showToast, visible: false })}
      />
    </div>
  );
};

export default ClassifyPage;
