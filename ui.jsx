import React, { useState } from 'react';
import {
  LogOut,
  User,
  List,
  Upload,
  MapPin,
  FileText,
  Save,
  Search,
  BookMarked,
  Briefcase,
  Globe,
  Plus,
  Compass,
  Filter,
  Camera,
  HeartPulse,
  Sparkles
} from 'lucide-react';
import { createPortal } from 'react-dom';

 Utility function to generate unique IDs
const uniqueId = () = Math.random().toString(36).substr(2, 9);

 Mock data for observations
const initialObservations = [
  {
    id uniqueId(),
    sightingName Lion Pride Sighting,
    date 2025-07-30,
    species Panthera leo,
    commonName Lion,
    condition Healthy,
    location Serengeti National Park,
    media httpsplacehold.co1000x8001e402affftext=Lion+Sighting,
    notes A pride of 8 lions, including one male with a distinctive scar, observed near a watering hole. The group appeared calm and well-fed.,
    researcher Jane Doe,
  },
  {
    id uniqueId(),
    sightingName Cheetah Hunt,
    date 2025-07-29,
    species Acinonyx jubatus,
    commonName Cheetah,
    condition Active,
    location Masai Mara Reserve,
    media httpsplacehold.co1000x80038a169ffftext=Cheetah+Hunt,
    notes A solo cheetah successfully hunting a gazelle. The chase was brief and powerful.,
    researcher Jane Doe,
  },
  {
    id uniqueId(),
    sightingName Elephant Herd,
    date 2025-07-28,
    species Loxodonta africana,
    commonName African Elephant,
    condition Healthy,
    location Amboseli National Park,
    media httpsplacehold.co1000x80022543dffftext=Elephant+Herd,
    notes A large herd of elephants, with several young calves, moving towards a prominent baobab tree.,
    researcher John Smith,
  },
  {
    id uniqueId(),
    sightingName Giraffe Migration,
    date 2025-07-27,
    species Giraffa camelopardalis,
    commonName Giraffe,
    condition Healthy,
    location Samburu Game Reserve,
    media httpsplacehold.co1000x8004c7c51ffftext=Giraffe+Migration,
    notes A group of giraffes crossing a river at sunset. The sight was breathtaking.,
    researcher Jane Doe,
  },
];

 Mock user data
const mockUser = {
  name Jane Doe,
  email jane.doe@example.com,
  affiliation National Geographic,
  photo httpsplacehold.co100x1004c7c51ffftext=JD,
  observations 124,
};

 Main App Component
const App = () = {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [currentPage, setCurrentPage] = useState('observations');
  
   States for the AI Notes Assistant
  const [isGettingSuggestions, setIsGettingSuggestions] = useState(false);
  const [aiNotes, setAiNotes] = useState();
  const [aiSuggestions, setAiSuggestions] = useState();
  
   States for the AI Name Generator
  const [isGeneratingName, setIsGeneratingName] = useState(false);
  const [sightingName, setSightingName] = useState();
  const [commonName, setCommonName] = useState();
  const [newObservationNotes, setNewObservationNotes] = useState();
  const [location, setLocation] = useState();

  const [observations, setObservations] = useState(initialObservations);
  const [showModal, setShowModal] = useState(false);
  const [selectedObservation, setSelectedObservation] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [gpsCoords, setGpsCoords] = useState();
  const [speciesFilter, setSpeciesFilter] = useState('');
  const [researcherFilter, setResearcherFilter] = useState('');
  const [filteredObservations, setFilteredObservations] = useState(initialObservations);

   Function to handle AI Notes Assistant
  const getAiSuggestions = async () = {
    if (!aiNotes) return;
    setIsGettingSuggestions(true);
    setAiSuggestions();
    try {
      const prompt = `You are an AI assistant for a wildlife research portal. A researcher has provided the following observation notes. Please review them and provide constructive suggestions on how to make them more detailed, organized, or useful for other researchers. Do not just summarize. Instead, suggest specific improvements, like asking for more information on the animal's behavior, specific markings, or the surrounding environment.

      Observation Notes
      ${aiNotes}
      
      Suggestions`;

      const chatHistory = [];
      chatHistory.push({ role user, parts [{ text prompt }] });
      const payload = { contents chatHistory };
      const apiKey = ;
      const apiUrl = `httpsgenerativelanguage.googleapis.comv1betamodelsgemini-2.5-flash-preview-05-20generateContentkey=${apiKey}`;
      const response = await fetch(apiUrl, {
        method 'POST',
        headers { 'Content-Type' 'applicationjson' },
        body JSON.stringify(payload)
      });
      const result = await response.json();
      if (result.candidates && result.candidates.length  0 &&
          result.candidates[0].content && result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length  0) {
        setAiSuggestions(result.candidates[0].content.parts[0].text);
      } else {
        setAiSuggestions(Could not get suggestions. Please try again.);
      }
    } catch (error) {
      console.error(API call failed, error);
      setAiSuggestions(Failed to connect to the AI service. Please try again later.);
    } finally {
      setIsGettingSuggestions(false);
    }
  };

   Function to handle AI Sighting Name Generation
  const generateSightingName = async () = {
    if (!commonName && !location && !newObservationNotes) return;
    setIsGeneratingName(true);
    setSightingName();
    try {
      const prompt = `You are a creative AI assistant for a wildlife research portal. Based on the following observation details, create a concise, descriptive, and memorable name for the sighting.

      Details
      - Common Name ${commonName  Not provided}
      - Location ${location  Not provided}
      - Notes ${newObservationNotes  Not provided}
      
      Example Name Serengeti Pride's Watering Hole Visit
      
      Create a single name`;

      const chatHistory = [];
      chatHistory.push({ role user, parts [{ text prompt }] });
      const payload = { contents chatHistory };
      const apiKey = ;
      const apiUrl = `httpsgenerativelanguage.googleapis.comv1betamodelsgemini-2.5-flash-preview-05-20generateContentkey=${apiKey}`;
      const response = await fetch(apiUrl, {
        method 'POST',
        headers { 'Content-Type' 'applicationjson' },
        body JSON.stringify(payload)
      });
      const result = await response.json();
      if (result.candidates && result.candidates.length  0 &&
          result.candidates[0].content && result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length  0) {
        setSightingName(result.candidates[0].content.parts[0].text.replace(^['s]+['s]+$g, ''));
      } else {
        setSightingName(Generated Name);
      }
    } catch (error) {
      console.error(API call failed, error);
      setSightingName(Error generating name);
    } finally {
      setIsGeneratingName(false);
    }
  };

   Function to filter observations
  const handleFilter = () = {
    let tempObservations = initialObservations;
    if (speciesFilter) {
      tempObservations = tempObservations.filter(obs =
        (obs.species && obs.species.toLowerCase().includes(speciesFilter.toLowerCase())) 
        (obs.commonName && obs.commonName.toLowerCase().includes(speciesFilter.toLowerCase()))
      );
    }
    if (researcherFilter) {
      tempObservations = tempObservations.filter(obs = obs.researcher.toLowerCase().includes(researcherFilter.toLowerCase()));
    }
    setFilteredObservations(tempObservations);
  };

   Login and Logout handlers
  const handleLogin = () = setIsLoggedIn(true);
  const handleLogout = () = setIsLoggedIn(false);

   A modal for success messages
  const SuccessModal = ({ message, onClose }) = {
    const modalRoot = document.body;
    return createPortal(
      div className=fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50
        div className=bg-white p-6 rounded-lg shadow-xl text-center max-w-sm mx-4
          p className=text-xl font-semibold text-green-700 mb-4{message}p
          button
            onClick={onClose}
            className=px-4 py-2 bg-green-600 text-white font-medium rounded-lg hoverbg-green-700 transition-colors
          
            OK
          button
        div
      div,
      modalRoot
    );
  };

   A modal to display media and observation details
  const MediaModal = ({ observation, onClose }) = {
    const modalRoot = document.body;
    return createPortal(
      div className=fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50 p-4
        div className=bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto
          div className=p-4 flex justify-between items-center border-b
            h3 className=text-xl font-bold text-green-900{observation.sightingName}h3
            button onClick={onClose} className=text-gray-500 hovertext-gray-800 text-2xl
              &times;
            button
          div
          div className=p-4 grid grid-cols-1 mdgrid-cols-2 gap-4
            div className=flex justify-center items-center
              img src={observation.media} alt={observation.sightingName} className=rounded-lg max-h-[70vh] object-contain 
            div
            div className=space-y-4
              p className=text-lg text-gray-700strongCommon Namestrong {observation.commonName}p
              p className=text-lg text-gray-700strongScientific Namestrong {observation.species}p
              p className=text-lg text-gray-700strongLocationstrong {observation.location}p
              p className=text-lg text-gray-700strongConditionstrong {observation.condition}p
              p className=text-lg text-gray-700strongDatestrong {observation.date}p
              p className=text-lg text-gray-700strongResearcherstrong {observation.researcher}p
              div className=bg-gray-100 p-4 rounded-lg
                p className=text-lg font-semibold text-green-800 mb-2Notesp
                p className=text-gray-600{observation.notes}p
              div
            div
          div
        div
      div,
      modalRoot
    );
  };

  const handleObservationClick = (obs) = {
    setSelectedObservation(obs);
    setShowModal(true);
  };

  const handleSubmitObservation = (e) = {
    e.preventDefault();
    setShowSuccessModal(true);
  };

   Components for different pages
  const Dashboard = () = (
    div className=container mx-auto grid grid-cols-1 mdgrid-cols-2 gap-8 p-4 mdp-8
      { Left Column Upload Form }
      div className=bg-white p-6 rounded-lg shadow-lg
        h2 className=text-2xl font-bold text-green-900 mb-6 flex items-center gap-2
          Upload className=text-green-700 
          New Observation
        h2
        form onSubmit={handleSubmitObservation} className=space-y-4
          div
            label htmlFor=media-upload className=block text-gray-700 font-medium mb-1
              Media Upload
            label
            input
              type=file
              id=media-upload
              accept=image,video
              className=w-full text-sm text-gray-500 filemr-4 filepy-2 filepx-4 filerounded-full fileborder-0 filetext-sm filefont-semibold filebg-orange-50 filetext-orange-700 hoverfilebg-orange-100
            
          div
          div
            label htmlFor=sighting-name className=block text-gray-700 font-medium mb-1
              Sighting Name
            label
            div className=flex gap-2 items-center
              input
                type=text
                id=sighting-name
                placeholder=e.g., Lion Pride Sighting
                className=w-full px-4 py-2 border border-gray-300 rounded-lg focusoutline-none focusring-2 focusring-green-600
                value={sightingName}
                onChange={(e) = setSightingName(e.target.value)}
              
              button
                type=button
                onClick={generateSightingName}
                disabled={isGeneratingName}
                className=px-4 py-2 bg-orange-600 text-white font-medium rounded-lg hoverbg-orange-700 transition-colors disabledbg-gray-400 disabledcursor-not-allowed
              
                {isGeneratingName  'Generating...'  Sparkles size={20} }
              button
            div
          div
          div
            label htmlFor=common-name className=block text-gray-700 font-medium mb-1
              Common Name
            label
            input type=text id=common-name placeholder=e.g., Lion className=w-full px-4 py-2 border border-gray-300 rounded-lg focusoutline-none focusring-2 focusring-green-600 onChange={(e) = setCommonName(e.target.value)} 
          div
          div
            label htmlFor=species className=block text-gray-700 font-medium mb-1
              Scientific Name
            label
            input type=text id=species placeholder=e.g., Panthera leo className=w-full px-4 py-2 border border-gray-300 rounded-lg focusoutline-none focusring-2 focusring-green-600 
          div
          div
            label htmlFor=condition className=block text-gray-700 font-medium mb-1
              Condition
            label
            select id=condition className=w-full px-4 py-2 border border-gray-300 rounded-lg focusoutline-none focusring-2 focusring-green-600
              option value=Select Conditionoption
              option value=HealthyHealthyoption
              option value=InjuredInjuredoption
              option value=DeceasedDeceasedoption
              option value=ActiveActiveoption
              option value=RestingRestingoption
            select
          div
          div
            label htmlFor=gps-coords className=block text-gray-700 font-medium mb-1 flex items-center gap-2
              MapPin size={16} className=text-green-700 
              GPS Coordinates
            label
            input
              type=text
              id=gps-coords
              placeholder=e.g., -1.286389, 36.817223
              className=w-full px-4 py-2 border border-gray-300 rounded-lg focusoutline-none focusring-2 focusring-green-600 focusborder-transparent transition-colors
              value={gpsCoords}
              readOnly
              onChange={(e) = setLocation(e.target.value)}
            
            button
              type=button
              className=mt-2 w-full py-2 bg-orange-600 text-white font-medium rounded-lg hoverbg-orange-700 transition-colors
              onClick={() = {
                setGpsCoords(-1.286389, 36.817223);
                setLocation(Serengeti National Park);
              }}  Mocking getting a location
            
              span className=flex items-center justify-center gap-2
                Compass size={18}  Use Current Location
              span
            button
          div
          div
            label htmlFor=notes className=block text-gray-700 font-medium mb-1 flex items-center gap-2
              FileText size={16} className=text-green-700 
              Observation Notes
            label
            textarea
              id=notes
              rows=4
              placeholder=Detailed notes about the sighting...
              className=w-full px-4 py-2 border border-gray-300 rounded-lg focusoutline-none focusring-2 focusring-green-600 focusborder-transparent transition-colors
              onChange={(e) = setNewObservationNotes(e.target.value)}
            textarea
          div
          button
            type=submit
            className=w-full py-3 bg-green-700 text-white font-semibold rounded-lg shadow-md hoverbg-green-800 focusoutline-none focusring-2 focusring-green-600 focusring-offset-2 transition-transform transform hoverscale-105
          
            span className=flex items-center justify-center gap-2
              Save size={20}  Submit Observation
            span
          button
        form
      div
      { Right Column Observation List }
      div className=bg-white p-6 rounded-lg shadow-lg
        h2 className=text-2xl font-bold text-green-900 mb-6 flex items-center gap-2
          BookMarked className=text-green-700 
          Recent Observations
        h2
        { Advanced Filters }
        div className=flex flex-wrap gap-4 mb-6 p-4 bg-gray-50 rounded-lg
          input
            type=text
            placeholder=Species
            className=p-2 border rounded-lg flex-1 min-w-[120px]
            value={speciesFilter}
            onChange={(e) = setSpeciesFilter(e.target.value)}
          
          input
            type=text
            placeholder=Researcher
            className=p-2 border rounded-lg flex-1 min-w-[120px]
            value={researcherFilter}
            onChange={(e) = setResearcherFilter(e.target.value)}
          
          button
            onClick={handleFilter}
            className=px-4 py-2 bg-green-700 text-white rounded-lg hoverbg-green-800 transition-colors
          
            span className=flex items-center justify-center gap-2Filter size={18} Filterspan
          button
        div
        div className=space-y-4
          {filteredObservations.map((obs) = (
            button
              key={obs.id}
              onClick={() = handleObservationClick(obs)}
              className=w-full text-left flex items-center space-x-4 p-4 bg-gray-50 rounded-lg shadow-sm hoverbg-gray-100 transition-colors
            
              img src={obs.media} alt={obs.sightingName} className=w-16 h-16 rounded-lg object-cover 
              div className=flex-1
                h3 className=text-lg font-semibold text-green-800{obs.sightingName}h3
                p className=text-sm text-gray-600Species span className=font-medium text-green-900{obs.commonName} ({obs.species})spanp
                p className=text-sm text-gray-600Location {obs.location}p
                p className=text-xs text-gray-500 mt-1Date {obs.date}p
              div
            button
          ))}
        div
        button className=mt-6 w-full py-2 bg-gray-200 text-gray-700 font-medium rounded-lg hoverbg-gray-300 transition-colors
          Load More
        button
      div
    div
  );

  const AiTools = () = (
    div className=container mx-auto p-4 mdp-8
      div className=bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto
        h2 className=text-2xl font-bold text-green-900 mb-6 flex items-center gap-2
          Search className=text-green-700 
          AI Tools
        h2
        
        { AI Notes Assistant }
        div className=mb-8
          h3 className=text-xl font-bold text-orange-800 mb-4 flex items-center gap-2FileText size={20}  AI Notes Assistanth3
          div className=space-y-4
            div
              label htmlFor=ai-notes className=block text-gray-700 font-medium mb-1
                Paste Observation Notes for Suggestions
              label
              textarea
                id=ai-notes
                rows=8
                value={aiNotes}
                onChange={(e) = setAiNotes(e.target.value)}
                placeholder=e.g., 'Observed a pride of 8 lions...' 
                className=w-full px-4 py-2 border border-gray-300 rounded-lg focusoutline-none focusring-2 focusring-green-600 focusborder-transparent transition-colors
              textarea
            div
            button
              onClick={getAiSuggestions}
              disabled={isGettingSuggestions  aiNotes.length === 0}
              className=w-full py-3 bg-orange-600 text-white font-semibold rounded-lg shadow-md hoverbg-orange-700 disabledbg-gray-400 focusoutline-none focusring-2 focusring-orange-600 focusring-offset-2 transition-transform transform hoverscale-105
            
              {isGettingSuggestions  Getting Suggestions...  ✨ Get Note Suggestions with AI}
            button
            {aiSuggestions && (
              div className=mt-6 p-4 bg-orange-50 border-l-4 border-orange-600 text-gray-700 rounded-lg whitespace-pre-wrap
                h3 className=font-bold text-lg mb-2 text-orange-800AI Suggestionsh3
                p{aiSuggestions}p
              div
            )}
          div
        div

        { AI Species Identification (Placeholder) }
        div
          h3 className=text-xl font-bold text-green-800 mb-4 flex items-center gap-2Camera size={20}  AI Species Identificationh3
          div className=space-y-4
            div
              label htmlFor=species-image className=block text-gray-700 font-medium mb-1
                Upload an image for identification
              label
              input
                type=file
                id=species-image
                accept=image
                className=w-full text-sm text-gray-500 filemr-4 filepy-2 filepx-4 filerounded-full fileborder-0 filetext-sm filefont-semibold filebg-green-50 filetext-green-700 hoverfilebg-green-100
              
            div
            button
               onClick={handleSpeciesIdentify}
              disabled={true}  This is still a placeholder
              className=w-full py-3 bg-gray-400 text-white font-semibold rounded-lg shadow-md disabledcursor-not-allowed
            
              Identify Species with OCI AI
            button
            div className=mt-2 p-3 text-sm text-gray-600 bg-gray-100 rounded-lg
              This feature is a placeholder for future image analysis capabilities.
            div
          div
        div
      div
    div
  );

  const Profile = () = (
    div className=container mx-auto p-4 mdp-8 flex justify-center
      div className=bg-white p-6 rounded-lg shadow-lg w-full max-w-md
        h2 className=text-2xl font-bold text-green-900 mb-6 flex items-center gap-2
          User className=text-green-700 
          Profile
        h2
        div className=flex flex-col items-center mb-6
          img src={mockUser.photo} alt=User className=w-24 h-24 rounded-full border-4 border-green-200 
          h3 className=text-xl font-bold text-green-900 mt-4{mockUser.name}h3
          p className=text-sm text-gray-600{mockUser.email}p
        div
        div className=space-y-4 text-gray-700
          div className=flex items-center gap-2 p-2 bg-gray-50 rounded-lg
            Briefcase size={20} className=text-orange-600 
            p className=font-mediumAffiliation span className=font-normal text-gray-600{mockUser.affiliation}spanp
          div
          div className=flex items-center gap-2 p-2 bg-gray-50 rounded-lg
            BookMarked size={20} className=text-green-600 
            p className=font-mediumObservations Contributed span className=font-normal text-gray-600{mockUser.observations}spanp
          div
        div
        button
          className=mt-6 w-full py-3 bg-orange-600 text-white font-semibold rounded-lg shadow-md hoverbg-orange-700 focusoutline-none focusring-2 focusring-orange-600 focusring-offset-2 transition-transform transform hoverscale-105
        
          Edit Profile
        button
      div
    div
  );

  const MapView = () = (
    div className=container mx-auto p-4 mdp-8
      div className=bg-white p-6 rounded-lg shadow-lg w-full max-w-5xl mx-auto
        h2 className=text-2xl font-bold text-green-900 mb-6 flex items-center gap-2
          Globe className=text-green-700 
          Observation Map
        h2
        div className=relative w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden
          img
            src=httpsplacehold.co1200x800e5e7eb6b7280text=Interactive+Map+Placeholder
            alt=Placeholder for map
            className=w-full h-full object-cover
          
          div className=absolute top-12 left-12 -translate-x-12 -translate-y-12 bg-white bg-opacity-70 backdrop-blur-sm p-4 rounded-lg shadow-lg
            p className=text-gray-800 font-mediumMap integration goes here...p
            p className=text-sm text-gray-600 mt-1e.g., OpenStreetMap or Google Mapsp
          div
        div
        div className=mt-6
          h3 className=text-xl font-bold text-green-900 mb-4Map Filtersh3
          div className=flex flex-wrap gap-4
            input type=date className=p-2 border rounded-lg 
            input type=text placeholder=Filter by species className=p-2 border rounded-lg 
            button className=px-4 py-2 bg-green-700 text-white rounded-lg hoverbg-green-800 transition-colors
              Apply Filters
            button
          div
        div
      div
    div
  );

   Conditional Rendering based on login state
  if (!isLoggedIn) {
    return (
      div className=flex items-center justify-center min-h-screen bg-cover bg-center style={{ backgroundImage `url('httpsimages.unsplash.comphoto-1546252994-b258ac717282q=80&w=2940&auto=format&fit=crop')` }}
        div className=bg-white p-8 rounded-lg shadow-xl max-w-sm w-full text-center bg-opacity-90 backdrop-blur-sm
          h1 className=text-3xl font-bold text-green-900 mb-2WildTrackh1
          p className=text-lg text-gray-700 mb-6Research Portalp
          button
            onClick={handleLogin}
            className=w-full py-3 bg-green-700 text-white font-semibold rounded-lg shadow-md hoverbg-green-800 transition-transform transform hoverscale-105
          
            Log In
          button
        div
      div
    );
  }

   Main layout with Header and Content
  return (
    div className=min-h-screen bg-gray-50 font-sans
      style
        {`
        @import url('httpsfonts.googleapis.comcss2family=Interwght@400;600;700&display=swap');
        body {
          font-family 'Inter', sans-serif;
        }
        `}
      style
      
      { Navbar }
      nav className=bg-white shadow-md p-4 sticky top-0 z-40
        div className=container mx-auto flex justify-between items-center flex-wrap
          h1 className=text-2xl font-bold text-green-900WildTrackh1
          div className=flex-1 flex justify-end gap-2 mdgap-4 flex-wrap
            button
              onClick={() = setCurrentPage('observations')}
              className={`flex items-center gap-2 px-3 py-2 mdpx-4 mdpy-2 rounded-lg font-medium transition-colors ${currentPage === 'observations'  'bg-orange-600 text-white shadow-md'  'text-gray-700 hoverbg-gray-100'}`}
            
              Compass size={20}  Observations
            button
            button
              onClick={() = setCurrentPage('map')}
              className={`flex items-center gap-2 px-3 py-2 mdpx-4 mdpy-2 rounded-lg font-medium transition-colors ${currentPage === 'map'  'bg-orange-600 text-white shadow-md'  'text-gray-700 hoverbg-gray-100'}`}
            
              Globe size={20}  Map
            button
            button
              onClick={() = setCurrentPage('summarizer')}
              className={`flex items-center gap-2 px-3 py-2 mdpx-4 mdpy-2 rounded-lg font-medium transition-colors ${currentPage === 'summarizer'  'bg-orange-600 text-white shadow-md'  'text-gray-700 hoverbg-gray-100'}`}
            
              Search size={20}  AI Tools
            button
            button
              onClick={() = setCurrentPage('profile')}
              className={`flex items-center gap-2 px-3 py-2 mdpx-4 mdpy-2 rounded-lg font-medium transition-colors ${currentPage === 'profile'  'bg-green-700 text-white shadow-md'  'text-gray-700 hoverbg-gray-100'}`}
            
              User size={20}  Profile
            button
            button
              onClick={handleLogout}
              className=flex items-center gap-2 px-3 py-2 mdpx-4 mdpy-2 rounded-lg text-white bg-red-600 hoverbg-red-700 font-medium transition-colors
            
              LogOut size={20}  Logout
            button
          div
        div
      nav

      { Hero Section }
      header
        className=relative bg-cover bg-center h-[50vh] flex items-center justify-center p-4
        style={{ backgroundImage `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('httpsimages.unsplash.comphoto-1547826038-0c65538e1469q=80&w=2940&auto=format&fit=crop')` }}
      
        div className=text-center text-white space-y-4
          h1 className=text-4xl mdtext-6xl font-bold tracking-tight leading-tight
            Empowering Wildlife Conservation
          h1
          p className=text-lg mdtext-xl font-medium
            A seamless platform for field research, observation, and analysis.
          p
          button className=mt-4 px-6 py-3 bg-orange-600 text-white font-semibold rounded-full shadow-lg hoverbg-orange-700 transition-transform transform hoverscale-105
            Start Tracking Now
          button
        div
      header

      { Page Content }
      main className=container mx-auto my-8
        {showSuccessModal && SuccessModal message=Observation submitted successfully! onClose={() = setShowSuccessModal(false)} }
        {showModal && MediaModal observation={selectedObservation} onClose={() = setShowModal(false)} }
        {currentPage === 'observations' && Dashboard }
        {currentPage === 'summarizer' && AiTools }
        {currentPage === 'profile' && Profile }
        {currentPage === 'map' && MapView }
      main

      { Footer }
      footer className=bg-gray-800 text-gray-300 p-8 text-center
        div className=container mx-auto
          p&copy; 2025 WildTrack. All rights reserved.p
          div className=flex justify-center mt-4 space-x-4
            a href=# className=hovertext-white transition-colorsPrivacy Policya
            a href=# className=hovertext-white transition-colorsTerms of Servicea
            a href=# className=hovertext-white transition-colorsContacta
          div
        div
      footer
    div
  );
};

export default App;
