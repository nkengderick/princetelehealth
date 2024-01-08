import React, { useState } from 'react';
import './consultationform.css'
import { useAddRecord } from '../../hooks/useAddRecord'
import { useAuthContext } from '../../hooks/useAuthContext';

const ConsultationForm = ({ patient }) => {
    const { user } = useAuthContext()
const { addRecord, isLoading, error } = useAddRecord()
  const [signsAndSymptoms, setSignsAndSymptoms] = useState(['']);
  const [recommendations, setRecommendations] = useState(['']);
  const [nextSteps, setNextSteps] = useState(['']);
  const [consultationData, setConsultationData] = useState({
    doctor: user.name,
    name: patient.name,
    phone: patient.phone,
    dob: patient.dob,
    address: patient.address,
    gender: patient.gender,
    signsAndSymptoms: [],
    recommendations: [],
    nextSteps: [],
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    addRecord(consultationData.doctor, consultationData.name, consultationData.phone, consultationData.dob, consultationData.address, consultationData.gender, signsAndSymptoms, recommendations, nextSteps)

    setConsultationData({
        doctor: user.name,
        name: patient.name,
        phone: patient.phone,
        dob: patient.dob,
        address: patient.address,
        gender: patient.gender,
    })
    setSignsAndSymptoms(['']);
    setRecommendations(['']);
    setNextSteps(['']);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConsultationData({ ...consultationData, [name]: value });
  };

  const handleAddSign = () => {
    setSignsAndSymptoms([...signsAndSymptoms, '']);
  };

  const handleRemoveSign = (index) => {
    const updatedSigns = [...signsAndSymptoms];
    updatedSigns.splice(index, 1);
    setSignsAndSymptoms(updatedSigns);
  };

  const handleSignChange = (index, value) => {
    const updatedSigns = [...signsAndSymptoms];
    updatedSigns[index] = value;
    setSignsAndSymptoms(updatedSigns);
  };

  const handleAddRecommendation = () => {
    setRecommendations([...recommendations, '']);
  };

  const handleRemoveRecommendation = (index) => {
    const updatedRecommendations = [...recommendations];
    updatedRecommendations.splice(index, 1);
    setRecommendations(updatedRecommendations);
  };

  const handleRecommendationChange = (index, value) => {
    const updatedRecommendations = [...recommendations];
    updatedRecommendations[index] = value;
    setRecommendations(updatedRecommendations);
  };

  const handleAddNextStep = () => {
    setNextSteps([...nextSteps, '']);
  };

  const handleRemoveNextStep = (index) => {
    const updatedNextSteps = [...nextSteps];
    updatedNextSteps.splice(index, 1);
    setNextSteps(updatedNextSteps);
  };

  const handleNextStepChange = (index, value) => {
    const updatedNextSteps = [...nextSteps];
    updatedNextSteps[index] = value;
    setNextSteps(updatedNextSteps);
  };

  return (
    <form className="consultation-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="doctor">Doctor:</label>
        <input type="text" name="doctor" value={consultationData.doctor} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input type="text" name="name" value={consultationData.name} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label htmlFor="phone">Phone:</label>
        <input type="tel" name="phone" value={consultationData.phone} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label htmlFor="address">Location Address:</label>
        <input type="text" name="address" value={consultationData.address} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label htmlFor="dob">Date of Birth:</label>
        <input type="date" name="dob" value={consultationData.dob} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label htmlFor="gender">Gender:</label>
        <select name="gender" value={consultationData.gender} onChange={handleChange}>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="form-group">
        <label>
          Signs and Symptoms:
          {signsAndSymptoms.map((sign, index) => (
            <div key={index} className="textarea-group">
              <textarea
                value={sign}
                onChange={(e) => handleSignChange(index, e.target.value)}
                className="text-input"
              />
              <span
                role="button"
                aria-label="Delete Sign"
                className="delete-button"
                onClick={() => handleRemoveSign(index)}
              >
                ❌
              </span>
            </div>
          ))}
          <button type="button" onClick={handleAddSign} className="add-button">
            Add Sign
          </button>
        </label>
      </div>

      <div className="form-group">
        <label>
          Recommendations:
          {recommendations.map((recommendation, index) => (
            <div key={index} className="textarea-group">
              <textarea
                value={recommendation}
                onChange={(e) => handleRecommendationChange(index, e.target.value)}
                className="text-input"
              />
              <span
                role="button"
                aria-label="Delete Recommendation"
                className="delete-button"
                onClick={() => handleRemoveRecommendation(index)}
              >
                ❌
              </span>
            </div>
          ))}
          <button type="button" onClick={handleAddRecommendation} className="add-button">
            Add Recommendation
          </button>
        </label>
      </div>

      <div className="form-group">
        <label>
          Next Steps:
          {nextSteps.map((step, index) => (
            <div key={index} className="textarea-group">
              <textarea
                value={step}
                onChange={(e) => handleNextStepChange(index, e.target.value)}
                className="text-input"
              />
              <span
                role="button"
                aria-label="Delete Next Step"
                className="delete-button"
                onClick={() => handleRemoveNextStep(index)}
              >
                ❌
              </span>
            </div>
          ))}
          <button type="button" onClick={handleAddNextStep} className="add-button">
            Add Next Step
          </button>
        </label>
      </div>

      <button type="submit" className='submit-button'>Submit</button>
    </form>
  );
};

export default ConsultationForm;
