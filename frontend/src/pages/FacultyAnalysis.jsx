// import { useState } from "react";
// import { axiosInstance } from "../lib/axios";

// const FacultyAnalysis = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     department: "",
//     skills: "",
//     researchPapers: "",
//     eventsParticipated: "",
//     lecturesDelivered: "",
//     awards: "",
//   });

//   const [analysisResult, setAnalysisResult] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setAnalysisResult(null);

//     try {
//       const response = await axiosInstance.post("/analysis", formData);
//       setAnalysisResult(response.data);
//     } catch (error) {
//       console.error("Error analyzing profile:", error);
//       setAnalysisResult({ suggestions: ["Error analyzing data. Please try again."] });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-6 text-center">Faculty Self Analysis</h1>

//       <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
//         <input
//           type="text"
//           name="name"
//           placeholder="Name"
//           value={formData.name}
//           onChange={handleChange}
//           className="input input-bordered w-full"
//           required
//         />

//         <input
//           type="text"
//           name="department"
//           placeholder="Department"
//           value={formData.department}
//           onChange={handleChange}
//           className="input input-bordered w-full"
//           required
//         />

//         <textarea
//           name="skills"
//           placeholder="Skills (comma separated)"
//           value={formData.skills}
//           onChange={handleChange}
//           className="textarea textarea-bordered w-full"
//           required
//         />

//         <textarea
//           name="researchPapers"
//           placeholder="Research Papers (titles, separated by commas)"
//           value={formData.researchPapers}
//           onChange={handleChange}
//           className="textarea textarea-bordered w-full"
//           required
//         />

//         <textarea
//           name="eventsParticipated"
//           placeholder="Events Participated (names, separated by commas)"
//           value={formData.eventsParticipated}
//           onChange={handleChange}
//           className="textarea textarea-bordered w-full"
//         />

//         <textarea
//           name="lecturesDelivered"
//           placeholder="Lectures Delivered (topics, separated by commas)"
//           value={formData.lecturesDelivered}
//           onChange={handleChange}
//           className="textarea textarea-bordered w-full"
//         />

//         <textarea
//           name="awards"
//           placeholder="Awards / Achievements"
//           value={formData.awards}
//           onChange={handleChange}
//           className="textarea textarea-bordered w-full"
//         />

//         <button
//           type="submit"
//           className="btn btn-primary w-full mt-4"
//           disabled={loading}
//         >
//           {loading ? "Analyzing..." : "Analyze My Profile"}
//         </button>
//       </form>

//       {analysisResult && (
//         <div className="mt-6 bg-secondary p-6 rounded shadow">
//           <h2 className="text-2xl font-semibold mb-4">Suggestions:</h2>
//           <ul className="list-disc pl-6">
//             {analysisResult.suggestions.map((suggestion, idx) => (
//               <li key={idx} className="mb-2">{suggestion}</li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FacultyAnalysis;
import { useState } from "react";
import { axiosInstance } from "../lib/axios";

const FacultyAnalysis = () => {
  const [formData, setFormData] = useState({
    name: "",
    department: "",
    skills: "",
    researchPapers: "",
    eventsParticipated: "",
    lecturesDelivered: "",
    awards: "",
  });

  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAnalysisResult(null);

    try {
      const response = await axiosInstance.post(
        "/analysis/analyze-appraisal", // ✅ Full correct path
        formData
      );
      setAnalysisResult(response.data);
    } catch (error) {
      console.error("Error analyzing profile:", error);
      setAnalysisResult({
        suggestions: ["Error analyzing data. Please try again."],
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Faculty Self Analysis</h1>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />

        <input
          type="text"
          name="department"
          placeholder="Department"
          value={formData.department}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />

        <textarea
          name="skills"
          placeholder="Skills (comma separated)"
          value={formData.skills}
          onChange={handleChange}
          className="textarea textarea-bordered w-full"
          required
        />

        <textarea
          name="researchPapers"
          placeholder="Research Papers (titles, separated by commas)"
          value={formData.researchPapers}
          onChange={handleChange}
          className="textarea textarea-bordered w-full"
          required
        />

        <textarea
          name="eventsParticipated"
          placeholder="Events Participated (names, separated by commas)"
          value={formData.eventsParticipated}
          onChange={handleChange}
          className="textarea textarea-bordered w-full"
        />

        <textarea
          name="lecturesDelivered"
          placeholder="Lectures Delivered (topics, separated by commas)"
          value={formData.lecturesDelivered}
          onChange={handleChange}
          className="textarea textarea-bordered w-full"
        />

        <textarea
          name="awards"
          placeholder="Awards / Achievements"
          value={formData.awards}
          onChange={handleChange}
          className="textarea textarea-bordered w-full"
        />

        <button
          type="submit"
          className="btn btn-primary w-full mt-4"
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Analyze My Profile"}
        </button>
      </form>

      {analysisResult && (
        <div className="mt-6 bg-secondary p-6 rounded shadow">
          <h2 className="text-2xl font-semibold mb-4">Suggestions:</h2>
          <ul className="list-disc pl-6">
            {analysisResult.suggestions.map((suggestion, idx) => (
              <li key={idx} className="mb-2">{suggestion}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FacultyAnalysis;
