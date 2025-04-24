// backend/controllers/appraisal.controller.js

export const analyzeAppraisal = (req, res) => {
    const {
      name,
      department,
      skills,
      researchPapers,
      eventsParticipated,
      lecturesDelivered,
      awards,
    } = req.body;
  
    const suggestions = [];
  
    // Rule-based heuristics
    if (!skills || skills.split(",").length < 3) {
      suggestions.push("Consider adding more relevant skills to your profile.");
    }
  
    if (!researchPapers || researchPapers.split(",").length < 2) {
      suggestions.push("Publish more research papers to strengthen your academic profile.");
    }
  
    if (!eventsParticipated || eventsParticipated.split(",").length < 2) {
      suggestions.push("Participate in more seminars or conferences to build your professional network.");
    }
  
    if (!lecturesDelivered || lecturesDelivered.split(",").length < 1) {
      suggestions.push("Delivering guest lectures can boost your teaching profile.");
    }
  
    if (!awards || awards.trim().length === 0) {
      suggestions.push("Highlighting achievements or awards adds weight to your profile.");
    }
  
    if (suggestions.length === 0) {
      suggestions.push("Your profile looks great! Keep up the good work.");
    }
  
    res.json({ suggestions });
  };
  