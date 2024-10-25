import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        profilePicture: {
            type: String,
            default: "",
        },
        bannerImg: {
            type: String,
            default: "",
        },
        headline: {
            type: String,
            default: "Faculty of SLRTCE",
        },
        location: {
            type: String,
            default: "Earth",
        },
        about: {
            type: String,
            default: "",
        },
        skills: [String],
        experience: [
            {
                title: String,
                company: String,
                startDate: Date,
                endDate: Date,
                description: String,
            },
        ],
        education: [
            {
                school: String,
                fieldOfStudy: String,
                startYear: Number,
                endYear: Number,
            },
        ],
        connections: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        // Adding new fields
        researchPublications: [
            {
                title: String,
                journal: String,
                date: Date,
                description: String,
                link: String,
            },
        ],
        eventParticipation: [
            {
                eventName: String,
                role: String,  // e.g., Speaker, Attendee, Organizer
                date: Date,
                description: String,
            },
        ],
        seminars: [
            {
                topic: String,
                date: Date,
                description: String,
                link: String,  // link to recording/materials
            },
        ],
        projects: [
            {
                projectTitle: String,
                description: String,
                startDate: Date,
                endDate: Date,
                link: String,  // link to project (if available)
            },
        ],
        lectures: [
            {
                courseName: String,
                institution: String,
                startDate: Date,
                endDate: Date,
                description: String,
            },
        ],
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
